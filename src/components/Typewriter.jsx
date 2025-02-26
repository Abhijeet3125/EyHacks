// Typewriter.js
import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 50, animate = true }) => {
  const [displayedText, setDisplayedText] = useState(animate ? '' : text);

  useEffect(() => {
    if (!animate) return; // Skip animation if animate is false

    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, animate]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
