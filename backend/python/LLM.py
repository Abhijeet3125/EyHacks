from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO
import os
from typing import List, Dict
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
from transformers import pipeline
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from dotenv import load_dotenv

model = SentenceTransformer('all-mpnet-base-v2')

index_dir = os.path.join("data", "Faiss_indexes")
data_dir = os.path.join("data", "Faiss_db")
os.makedirs(index_dir, exist_ok=True)

load_dotenv()
api_key = os.getenv("API_KEY")
chat = ChatGroq(temperature=0, model_name="gemma2-9b-it",
                groq_api_key=api_key)

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

conversation_history = []

def load_data_from_txt(data_dir):
    documents = {}
    for category in os.listdir(data_dir):
        category_path = os.path.join(data_dir, category)
        if os.path.isdir(category_path):
            documents[category] = {}
            for file_name in os.listdir(category_path):
                if file_name.endswith(".txt"):
                    heading = file_name.replace(".txt", "")
                    with open(os.path.join(category_path, file_name), "r", encoding="utf-8") as file:
                        content = file.readlines()
                    documents[category][heading] = [line.strip() for line in content]
    return documents

def build_or_load_index(category, text):
    index_file = os.path.join(index_dir, f"{category.lower().replace(' ', '_')}_index.index")
    metadata_file = os.path.join(index_dir, f"{category.lower().replace(' ', '_')}_metadata.txt")

    if os.path.exists(index_file):
        index = faiss.read_index(index_file)
        with open(metadata_file, "r", encoding="utf-8") as file:
            text = [line.strip() for line in file.readlines()]
    else:
        embeddings = model.encode(text)
        dimensions = embeddings.shape[1]
        index = faiss.IndexFlatL2(dimensions)
        index.add(np.array(embeddings))
        faiss.write_index(index, index_file)

        with open(metadata_file, "w", encoding="utf-8") as file:
            file.write("\n".join(text))

    return index, text

indexes = {}
category_text = {}
category_list = []

if not os.listdir(index_dir):
    documents = load_data_from_txt(data_dir)
    for category, subpart in documents.items():
        text = []
        for heading, data in subpart.items():
            text.extend([f"{heading}: {item}" for item in data])

        index, text = build_or_load_index(category, text)
        indexes[category] = index
        category_text[category] = text
        category_list.append(category)
else:
    for index_file in os.listdir(index_dir):
        if index_file.endswith(".index"):
            category = index_file.replace("_index.index", "").replace("_", " ")
            index = faiss.read_index(os.path.join(index_dir, index_file))
            metadata_file = os.path.join(index_dir, f"{category.lower().replace(' ', '_')}_metadata.txt")
            with open(metadata_file, "r", encoding="utf-8") as file:
                text = [line.strip() for line in file.readlines()]
            indexes[category] = index
            category_text[category] = text
            category_list.append(category)

def predict_category(query):
    result = classifier(query, candidate_labels=category_list)
    return result["labels"][0]

def summarize_conversation(conversation_history: List[Dict[str, str]]) -> str:
    formatted_conversation = "\n".join([f"{msg['role']}: {msg['content']}" for msg in conversation_history])

    prompt = ChatPromptTemplate.from_messages([
        ("human", f"""
        Summarize the following conversation into a concise summary. Focus on the key points and context.
        Conversation:
        {formatted_conversation}
        Summary:
        """)
    ])
    chain = prompt | chat
    summary = ""
    for chunk in chain.stream({"conversation": formatted_conversation}):
        summary += chunk.content
    return summary.strip()

def generate_query_from_conversation(conversation_summary: str):
    prompt = ChatPromptTemplate.from_messages([
        ("human", f"""
        Use this conversation summary to form a query that I will pipe into my vector database,
        so that it can be directly extracted from my vector database trained on the Claims database,
        which is trained only on problems and solutions or FAQs. Generate only one question framed like an FAQ.
        Also generate the query such that it asks the latest doubt of the customer but has the context of the previous summary.
        Conversation Summary:
        {conversation_summary}
        """)
    ])
    chain = prompt | chat
    response = ""
    for chunk in chain.stream({"conversation_summary": conversation_summary}):
        response += chunk.content
    return response.strip()

def retrieve_information(query):
    category = predict_category(query)
    index = indexes[category]
    query_embeddings = model.encode([query])
    distance, indices = index.search(np.array(query_embeddings), k=5)
    results = [category_text[category][i] for i in indices[0]]
    return results

def format_output_for_agent(results: List[str], query: str) -> str:
    formatted_results = "\n".join([f"- {result}" for result in results])
    prompt = ChatPromptTemplate.from_messages([
        ("human", f"""
        The following information was retrieved from the vector database in response to the query: "{query}".
        Format this information into a clear and concise response for the agent. Format the tips as a numbered list and do not add any symbols or asterisks"
        Retrieved Information:
        {formatted_results}
        Formatted Response:
        """)
    ])
    chain = prompt | chat
    response = ""
    for chunk in chain.stream({"query": query, "formatted_results": formatted_results}):
        response += chunk.content
    return response.strip()

def process_conversation(conversation_text):
    global conversation_history
    conversation_history.append({"role": "User", "content": conversation_text})

    conversation_summary = summarize_conversation(conversation_history)
    query = generate_query_from_conversation(conversation_summary)
    results = retrieve_information(query)
    formatted_response = format_output_for_agent(results, query)

    socketio.emit('new_suggestion', {'response': formatted_response})

    return formatted_response

@app.route('/process_conversation', methods=['POST'])
def receive_transcription():
    data = request.json
    if not data or 'conversation_text' not in data:
        return jsonify({"error": "Invalid request"}), 400

    conversation_text = data['conversation_text']
    response = process_conversation(conversation_text)
    return jsonify({"response": response})

@app.route('/refresh_history', methods=['POST'])
def refresh_history():
    global conversation_history
    conversation_history = []

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
