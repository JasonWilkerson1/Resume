import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00;
  }
  15% {
    text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00;
  }
  16% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00;
  }
  49% {
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00;
  }
  50% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00;
  }
  99% {
    text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00;
  }
  100% {
    text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff, -0.04em -0.025em 0 #fffc00;
  }
`;

const staticAnimation = keyframes`
  0% { background-position: 0% 0%; }
  10% { background-position: 5% 5%; }
  20% { background-position: -5% 10%; }
  30% { background-position: 15% 5%; }
  40% { background-position: 5% 15%; }
  50% { background-position: -5% 0%; }
  60% { background-position: 15% 5%; }
  70% { background-position: 0% 15%; }
  80% { background-position: -5% 5%; }
  90% { background-position: 10% 10%; }
  100% { background-position: 0% 0%; }
`;

const Button = styled.button`
  position: relative;
  background: transparent;
  color: #00FF00;
  border: 1px solid #00FF00;
  padding: 0.8rem 2rem;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 255, 0, 0.1);
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    animation: ${glitch} 0.8s infinite;
    color: #00FF00;
    
    &::before {
      transform: scaleX(1);
      transform-origin: left;
    }
    
    .click-me {
      opacity: 1;
      visibility: visible;
    }
  }
  
  ${props => props.secondary && `
    background: rgba(0, 255, 0, 0.1);
    border-color: #00FFFF;
    color: #00FFFF;
    
    &::before {
      background: rgba(0, 255, 255, 0.1);
    }
  `}
`;

const ClickMe = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  background: linear-gradient(45deg, #00FF00, #00FFFF);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  font-weight: bold;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 2;
  
  ${({ $showStatic }) => $showStatic && css`
    animation: ${staticAnimation} 0.5s steps(10) infinite;
    text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
    background: 
      linear-gradient(45deg, #00FF00, #00FFFF),
      repeating-linear-gradient(
        45deg,
        #0f0 0%,
        #0f0 10%,
        #0a0 10%,
        #0a0 20%
      );
    background-size: 200% 200%, 30px 30px;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `}
`;

const GlitchButton = ({ children, ...props }) => {
  const [showStatic, setShowStatic] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate position but don't store in variables since we're using random positions
    // This fixes the unused variable warnings
    
    // Randomly move the "click me" text around the button
    const newX = Math.random() * (rect.width - 60);
    const newY = Math.random() * (rect.height - 20);
    
    setPosition({ x: newX, y: newY });
    
    // Occasionally show static effect (33% chance when moving)
    if (Math.random() > 0.67) {
      setShowStatic(true);
      setTimeout(() => setShowStatic(false), 100);
    }
  };

  return (
    <Button 
      {...props} 
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowStatic(false)}
    >
      {children}
      <ClickMe 
        className="click-me"
        $showStatic={showStatic}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) ${showStatic ? 'scale(1.1)' : 'scale(0.8)'}`
        }}
      >
        click me
      </ClickMe>
    </Button>
  );
};

export default GlitchButton;
