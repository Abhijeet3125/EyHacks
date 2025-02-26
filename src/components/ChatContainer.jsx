import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import Typewriter from './Typewriter';

const ChatContainer = () => {
  // Lazy initialization: load messages from localStorage and disable animation on reload.
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      let parsed = JSON.parse(storedMessages);
      // Disable typewriter animation for reloaded bot messages.
      parsed = parsed.map((msg) =>
        msg.isBot ? { ...msg, animate: false } : msg
      );
      return parsed;
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Save messages to localStorage whenever they change.
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom when new messages are added.
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    try {
      setIsLoading(true);

      // Add user message immediately.
      setMessages((prev) => [
        ...prev,
        {
          text: text.trim(),
          isBot: false,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Send to Flask backend.
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });

      const data = await response.json();

      // Add bot response with animate set to true (for new messages).
      setMessages((prev) => [
        ...prev,
        {
          text: data.response || "Sorry, I couldn't process that request.",
          isBot: true,
          timestamp: new Date().toISOString(),
          animate: true, // New bot messages animate.
        },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Error processing your request. Please try again.',
          isBot: true,
          timestamp: new Date().toISOString(),
          animate: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // New Chat: clear messages and remove them from localStorage.
  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="flex flex-col h-166 max-w-3xl mx-auto shadow-lg">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isBot ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[80%] font-[Roboto] p-3 rounded-t-3xl ${
                message.isBot
                  ? 'bg-[#81F2F0] text-gray-800 border border-black rounded-br-3xl'
                  : 'bg-[#336A72] text-white border border-black rounded-bl-3xl'
              }`}
            >
              <div className="whitespace-pre-wrap font-[Roboto] text-lg">
                {message.isBot ? (
                  message.animate ? (
                    <Typewriter text={message.text} speed={50} animate={true} />
                  ) : (
                    message.text
                  )
                ) : (
                  message.text
                )}
              </div>
              <div
                className={`text-xs mt-1 ${
                  message.isBot ? 'text-gray-500' : 'text-blue-100'
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg border border-gray-200 flex items-center space-x-1">
              <div
                style={{ animationDelay: '0s' }}
                className="w-2 h-2 bg-gray-400 rounded-full animate-thinking"
              ></div>
              <div
                style={{ animationDelay: '0.2s' }}
                className="w-2 h-2 bg-gray-400 rounded-full animate-thinking"
              ></div>
              <div
                style={{ animationDelay: '0.4s' }}
                className="w-2 h-2 bg-gray-400 rounded-full animate-thinking"
              ></div>
            </div>
          </div>
        )}
      </div>
      <div>
        {/* New Chat Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={handleNewChat}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            New Chat
          </button>
        </div>
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
