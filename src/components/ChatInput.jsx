import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

const ChatInput = ({ onSend, isLoading }) => {
  const [text, setText] = useState('');

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

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1">
          <input
            type="text"
            className="w-full px-4 py-2 border border-green-800 rounded-full focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            placeholder="Type your question..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="p-2 rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:bg-green-600"
          disabled={!text.trim() || isLoading}
        >
          <SendHorizontal size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
