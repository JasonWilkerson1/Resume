import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const TypingContainer = styled.span`
  color: #00FFFF;
  font-weight: 500;
  min-height: 1.5em;
  display: inline-block;
  text-align: left;
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1.2em;
  background: #00FF00;
  margin-left: 4px;
  vertical-align: middle;
  animation: ${blink} 1s step-end infinite;
`;

const TypingEffect = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const phrases = [
      "I'm a Full-Stack Developer with a passion for cybersecurity.",
      "A Computer Science graduate from University of Mississippi.",
      "Pursuing my Master's in CS at Georgia Tech.",
      "CompTIA Security+ and Google Cybersecurity certified.",
      "Building secure, scalable software solutions."
    ];

    const timer = setTimeout(() => {
      const currentPhrase = phrases[loopNum % phrases.length];
      
      if (isDeleting) {
        // Deleting
        setText(prev => {
          const newText = prev.substring(0, prev.length - 1);
          if (newText === '') {
            setIsDeleting(false);
            setLoopNum(prevLoop => prevLoop + 1);
            setTypingSpeed(500);
          }
          return newText;
        });
        setTypingSpeed(50);
      } else {
        // Typing
        setText(prev => {
          const newText = currentPhrase.substring(0, prev.length + 1);
          if (newText === currentPhrase) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
          return newText;
        });
        setTypingSpeed(100 + Math.random() * 50);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <TypingContainer>
      user@portfolio:~$ {text}
      <Cursor>|</Cursor>
    </TypingContainer>
  );
};

export default TypingEffect;
