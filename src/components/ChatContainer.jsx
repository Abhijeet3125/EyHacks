import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import Typewriter from './Typewriter';

// Helper function to parse markdown in static messages.
const parseMarkdown = (input) => {
  const lines = input.split('\n');
  return lines.map((line, idx) => {
    if (line.startsWith('####')) {
      const content = line.replace(/^####\s*/, '');
      return (
        <React.Fragment key={idx}>
          <h4>
            <strong>{content}</strong>
          </h4>
          <br />
        </React.Fragment>
      );
    } else {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedParts = parts.map((part, i) => {
        if (/^\*\*.*\*\*$/.test(part)) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      });
      return (
        <React.Fragment key={idx}>
          {parsedParts}
          <br />
        </React.Fragment>
      );
    }
  });
};

const ChatContainer = () => {
  // Lazy initialization: load messages from localStorage and disable animation on reload.

  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      let parsed = JSON.parse(storedMessages);
      parsed = parsed.map((msg) =>
        msg.isBot ? { ...msg, animate: false } : msg
      );
      return parsed;
    }
    return [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  // Scroll the container to the bottom.
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    try {
      setIsLoading(true);
      setMessages((prev) => [
        ...prev,
        {
          text: text.trim(),
          isBot: false,
          timestamp: new Date().toISOString(),
        },
      ]);
      const response = await fetch('http://localhost:5000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          text: data.response || "Sorry, I couldn't process that request.",
          isBot: true,
          timestamp: new Date().toISOString(),
          animate: true,
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

  const handleNewChat = () => {
    setMessages([]);
    localStorage.removeItem('chatMessages');
  };

  return (
    <div className="flex flex-col h-166 max-w-3xl mx-auto shadow-lg">
      <div ref={containerRef} className="flex-1 overflow-y-auto space-y-4">
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
                    <Typewriter
                      text={message.text}
                      speed={50}
                      animate={true}
                      onUpdate={scrollToBottom}
                    />
                  ) : (
                    parseMarkdown(message.text)
                  )
                ) : (
                  parseMarkdown(message.text)
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
        <div />
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#81F2F0] p-3 rounded-lg border border-gray-200 flex items-center space-x-1">
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
      <div className="flex items-center">
        <div className="flex justify-end p-2">
          <button
            onClick={handleNewChat}
            className="bg-transparent p-2 rounded-full transition-colors duration-200 group"
          >
            <img
              src="/add.png"
              alt="New Chat"
              className="w-9 h-9 transition-transform duration-300 ease-in-out transform group-hover:rotate-90 group-hover:scale-125"
              title="Start a New Chat"
            />
          </button>
        </div>
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
