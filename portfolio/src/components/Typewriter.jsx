import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const TypingContainer = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #00FF00;
  font-family: 'Courier New', monospace;
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background: #00FF00;
  animation: ${blink} 1s step-end infinite;
`;

const Typewriter = ({ 
  text = '', 
  speed = 50, 
  delay = 100,
  deleteSpeed = 30,
  pauseTime = 2000,
  loop = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState('waiting');

  useEffect(() => {
    let timeoutId;

    const handleTyping = () => {
      if (displayText.length < text.length) {
        setDisplayText(text.substring(0, displayText.length + 1));
        timeoutId = setTimeout(handleTyping, speed);
      } else {
        timeoutId = setTimeout(() => setPhase('deleting'), pauseTime);
      }
    };

    const handleDeleting = () => {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
        timeoutId = setTimeout(handleDeleting, deleteSpeed);
      } else {
        if (loop) {
          timeoutId = setTimeout(() => setPhase('typing'), delay);
        } else {
          setPhase('waiting');
        }
      }
    };

    if (phase === 'typing') {
      handleTyping();
    } else if (phase === 'deleting') {
      handleDeleting();
    }

    return () => clearTimeout(timeoutId);
  }, [phase, displayText, text, speed, deleteSpeed, pauseTime, delay, loop]);

  useEffect(() => {
    setDisplayText('');
    setPhase('typing');
  }, [text]);

  return (
    <TypingContainer>
      <span>{displayText}</span>
      <Cursor />
    </TypingContainer>
  );
};

export default Typewriter;