import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(5px, -5px); }
  50% { transform: translate(-5px, 5px); }
  75% { transform: translate(3px, -3px); }
`;

const glitch = keyframes`
  0% { transform: translate(0); opacity: 1; }
  20% { transform: translate(2px, -2px); opacity: 0.8; }
  40% { transform: translate(-2px, 2px); opacity: 0.9; }
  60% { transform: translate(3px, 1px); opacity: 0.7; }
  80% { transform: translate(-1px, -3px); opacity: 0.9; }
  100% { transform: translate(0); opacity: 1; }
`;

const StaticText = styled.div`
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  background: rgba(0, 20, 0, 0.95);
  border: 1px solid #00ff00;
  border-radius: 4px;
  padding: 2px 8px;
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  animation: ${bounce} 1.5s infinite ease-in-out, ${glitch} 0.5s infinite;
  white-space: nowrap;
  position: fixed;
  z-index: 1000;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  pointer-events: none;
`;

const StaticEffect = ({ show }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const getRandomPosition = () => {
    const maxHeight = window.innerHeight - 30; // Account for text height
    const maxWidth = window.innerWidth - 100; // Account for text width
    return {
      top: Math.random() * maxHeight,
      left: Math.random() * maxWidth,
    };
  };

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setPosition(getRandomPosition());
      const interval = setInterval(() => {
        setPosition(getRandomPosition());
      }, 1000); // Update position every 1 second
      return () => clearInterval(interval);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <StaticText show={show} style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      click me
    </StaticText>
  );
};

export default StaticEffect;