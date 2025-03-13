import React, { useState, useRef } from 'react';

const ChatInput = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    try {
      await onSend(text.trim());
      setText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  // Only blur the input if it's empty when the mouse leaves the area.
  const handleMouseLeave = () => {
    if (inputRef.current && !text.trim()) {
      inputRef.current.blur();
      setIsFocused(false);
    }
  };

  return (
    <div className="py-4 w-[95%]">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1" onMouseLeave={handleMouseLeave}>
          {/* Wrapper for gradient border */}
          <div
            className={`w-full rounded-full p-[2px] transition-colors ${
              isFocused
                ? 'bg-gradient-to-r from-[#56ACC3] to-[#7FE3A6]'
                : 'bg-[#57ACC1] opacity-50'
            }`}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your question..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full px-4 py-2 rounded-full bg-black border-0 focus:outline-none"
            />
          </div>
        </div>
        <button
          type="submit"
          className="p-2 rounded-full text-white disabled:opacity-50"
          disabled={!text.trim() || isLoading}
        >
          <img src="/send.png" alt="send" className="w-7 h-7 hover:scale-125" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
