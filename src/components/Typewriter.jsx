import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, speed = 50, animate = true, onUpdate }) => {
  const [displayedText, setDisplayedText] = useState(animate ? '' : text);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Reset state when the text or animation flag changes.
  useEffect(() => {
    setDisplayedText(animate ? '' : text);
    setHasAnimated(false);
  }, [text, animate]);

  useEffect(() => {
    if (!animate || hasAnimated) return;
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));
      if (onUpdate) onUpdate();
      if (index >= text.length) {
        setHasAnimated(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, animate, onUpdate, hasAnimated]);

  // Helper to parse markdown: any text wrapped in ** ** becomes bold.
  const parseMarkdown = (input) => {
    // Split the input based on bold markers.
    const parts = input.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (/^\*\*.*\*\*$/.test(part)) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return <span>{parseMarkdown(displayedText)}</span>;
};

export default Typewriter;
