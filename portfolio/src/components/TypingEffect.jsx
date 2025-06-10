import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const TypingContainer = styled.div`
  color: #00FFFF;
  font-weight: 500;
  min-height: 1.5em;
  display: block;
  text-align: left;
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  margin: 0.5rem 0;
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
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: ${blink} 1s step-end infinite;
`;

const TypingEffect = ({ 
  phrases = [
    "I'm a Full-Stack Developer",
    "I'm a Problem Solver",
    "I'm a Tech Enthusiast",
    "I'm a Lifelong Learner"
  ],
  speed = 100,
  deleteSpeed = 50, // Increased delete speed for better visibility
  pauseTime = 2000,
  loop = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phase, setPhase] = useState('waiting');
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let timeoutId;
    const currentPhrase = phrases[currentPhraseIndex] || '';

    const handleTyping = () => {
      if (displayText.length < currentPhrase.length) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        timeoutId = setTimeout(handleTyping, speed);
      } else {
        setTypingComplete(true);
        timeoutId = setTimeout(() => {
          setPhase('deleting');
          setTypingComplete(false);
        }, pauseTime);
      }
    };

    const handleDeleting = () => {
      if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1));
        timeoutId = setTimeout(handleDeleting, deleteSpeed);
      } else {
        const nextIndex = (currentPhraseIndex + 1) % phrases.length;
        setCurrentPhraseIndex(nextIndex);
        setPhase('waiting');
        timeoutId = setTimeout(() => {
          setPhase('typing');
          handleTyping();
        }, speed);
      }
    };

    if (phase === 'typing' && !typingComplete) {
      handleTyping();
    } else if (phase === 'deleting') {
      handleDeleting();
    }

    return () => clearTimeout(timeoutId);
  }, [phase, displayText, currentPhraseIndex, phrases, speed, deleteSpeed, pauseTime, typingComplete]);

  // Reset when phrases change
  useEffect(() => {
    setDisplayText('');
    setCurrentPhraseIndex(0);
    setPhase('waiting');
    setTypingComplete(false);
  }, [phrases]);

  return (
    <TypingContainer>
      <div style={{ display: 'inline-flex', alignItems: 'center', minHeight: '1.5em' }}>
        <span>{displayText}</span>
        <Cursor />
      </div>
    </TypingContainer>
  );
};

export default TypingEffect;
