import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const RealTsuggestion = () => {
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    socket.on('new_suggestion', (data) => {
      const formattedResponse = data.response
        .split('\n')
        .map((line) => `- ${line}`)
        .join('\n');
      setSuggestions((prev) => {
        const newSuggestions = [formattedResponse, ...prev];
        return newSuggestions.length > 2 ? [formattedResponse] : newSuggestions;
      });
    });

    return () => {
      socket.off('new_suggestion');
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [suggestions]);

  return (
    <div
      className="flex flex-col justify-center items-center h-screen z-1"
      style={{ fontFamily: 'DM Sans', fontSize: '18px' }}
    >
      <div className="h-[60%] w-[70%] mx-auto bg-[rgba(0,0,0,0.7)] rounded-2xl">
        <div ref={containerRef} className="p-4 overflow-auto h-full">
          {suggestions.length > 0
            ? suggestions.map((s, index) => (
                <div key={index}>
                  {s.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              ))
            : 'Waiting for suggestions...'}
        </div>
      </div>
    </div>
  );
};

export default RealTsuggestion;
