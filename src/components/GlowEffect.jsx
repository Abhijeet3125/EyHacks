import React, { useState } from "react";

const GlowEffect = ({ children, className }) => {
  const [glowStyle, setGlowStyle] = useState({});

  // Handle mouse movement
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position within the container
    const y = e.clientY - rect.top; // Y position within the container

    // Calculate distances from the cursor to each side
    const left = x;
    const right = rect.width - x;
    const top = y;
    const bottom = rect.height - y;

    // Determine the glow intensity based on the closest side
    const glowIntensity = {
      left: Math.max(0, 1 - left / (rect.width / 2)),
      right: Math.max(0, 1 - right / (rect.width / 2)),
      top: Math.max(0, 1 - top / (rect.height / 2)),
      bottom: Math.max(0, 1 - bottom / (rect.height / 2)),
    };

    // Update the glow style
    setGlowStyle({
      boxShadow: `
        ${-glowIntensity.left * 10}px 0 10px rgba(0, 255, 255, 0.7),
        ${glowIntensity.right * 10}px 0 10px rgba(0, 255, 255, 0.7),
        0 ${-glowIntensity.top * 10}px 10px rgba(0, 255, 255, 0.7),
        0 ${glowIntensity.bottom * 10}px 10px rgba(0, 255, 255, 0.7)
      `,
    });
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setGlowStyle({});
  };

  return (
    <div
      className={`relative ${className}`} // Add custom classes passed as props
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={glowStyle} // Apply dynamic glow style
    >
      {/* Children (content inside the container) */}
      {children}
    </div>
  );
};

export default GlowEffect;