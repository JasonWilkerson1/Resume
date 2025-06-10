import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaExternalLinkAlt, 
  FaFileAlt, 
  FaHackerrank, 
  FaCertificate, 
  FaShieldAlt, 
  FaGraduationCap, 
  FaChalkboardTeacher 
} from 'react-icons/fa';
import { SiLeetcode, SiHackerrank as SiHackerrankIcon, SiCodechef } from 'react-icons/si';
import TechCarousel from './components/TechCarousel';
import TerminalWindow from './components/TerminalWindow';

// ============ Animations ============
const flicker = keyframes`
  0% { opacity: 0.1; }
  2% { opacity: 0.8; }
  8% { opacity: 0.1; }
  9% { opacity: 0.8; }
  12% { opacity: 0.1; }
  20% { opacity: 0.8; }
  25% { opacity: 0.3; }
  30% { opacity: 0.8; }
  70% { opacity: 0.8; }
  72% { opacity: 0.2; }
  77% { opacity: 0.8; }
  100% { opacity: 0.8; }
`;

const scanline = keyframes`
  from { top: -100%; }
  to { top: 100%; }
`;

// ============ Styled Components ============
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #0a0a0a;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  overflow-x: hidden;
  position: relative;
`;

const Scanline = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 255, 0, 0) 50%,
    rgba(0, 255, 0, 0.05) 50%
  );
  background-size: 100% 4px;
  pointer-events: none;
  z-index: 1000;
  animation: ${scanline} 8s linear infinite;
`;

const Noise = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AkEEjQd9YFm7wAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAADY0lEQVRo3u2aTUhUURTHf+85M+OoOeYHqZQfRFlBEBQkRFFB0EaCoI0bCQr6gKBNQdAqWrVpUdAqoi0tWgQVRB8QfUBQH0S0sEV9gJrjmDPv3Xta3Jk3b8aZcUZ9b0Z6P3jmvXvPOfd3z7nn3nNnwIULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwoULFy5cuHDhwsX/iv8A5TQN3jVXrQ4AAAAASUVORK5CYII=');
  opacity: 0.04;
  pointer-events: none;
  z-index: 1001;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
  border-bottom: 1px solid #00ff00;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  text-shadow: 0 0 10px #00ff00;
  font-family: 'Courier New', monospace;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '|';
    animation: blink 1s step-end infinite;
    margin-left: 0.2em;
  }
  
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 1rem 0 0;
  color: #00ff00;
  text-shadow: 0 0 5px #00ff00;
`;

const TerminalContainer = styled.div`
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid #00ff00;
  border-radius: 5px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-family: 'Courier New', monospace;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0, 255, 0, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 255, 0, 0.1) 0%,
      transparent 2%,
      transparent 98%,
      rgba(0, 255, 0, 0.1) 100%
    );
    pointer-events: none;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #00ff00;
`;

const TerminalButton = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  background: ${props => props.color};
`;

const TerminalTitle = styled.span`
  margin-left: 1rem;
  color: #00ff00;
  font-size: 0.9rem;
`;

const TerminalContent = styled.div`
  min-height: 100px;
  line-height: 1.5;
`;

const CommandLine = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const Prompt = styled.span`
  color: #00ff00;
  margin-right: 0.5rem;
  white-space: nowrap;
`;

const Command = styled.span`
  color: #00ff00;
  flex-grow: 1;
  word-break: break-all;
`;

const Output = styled.div`
  color: #00ff00;
  margin: 0.5rem 0 1rem 0;
  white-space: pre-wrap;
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 3rem;
  
  h2 {
    color: #00ff00;
    border-bottom: 1px solid #00ff00;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    display: inline-block;
    font-size: 1.5rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(0, 20, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
    border-color: rgba(0, 255, 0, 0.6);
  }
  
  h3 {
    color: #00ffaa;
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
    border-bottom: 1px solid rgba(0, 255, 0, 0.3);
    padding-bottom: 0.5rem;
  }
  
  .project-description {
    color: #b3ffb3;
    flex-grow: 1;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
  
  .project-features {
    margin: 1rem 0;
    padding-left: 1.2rem;
    
    li {
      color: #7fdf7f;
      margin-bottom: 0.5rem;
      position: relative;
      line-height: 1.5;
      
      &::before {
        content: '▹';
        position: absolute;
        left: -1.2rem;
        color: #00ff00;
      }
    }
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 1rem 0;
    
    span {
      background: rgba(0, 255, 0, 0.1);
      color: #00ff00;
      padding: 0.3rem 0.8rem;
      border-radius: 4px;
      font-size: 0.75rem;
      font-family: 'Fira Code', monospace;
      border: 1px solid rgba(0, 255, 0, 0.3);
      transition: all 0.3s ease;
      
      &:hover {
        background: rgba(0, 255, 0, 0.2);
        transform: translateY(-2px);
      }
    }
  }
  
  .links {
    display: flex;
    gap: 1rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 255, 0, 0.1);
    
    a {
      color: #00ffff;
      text-decoration: none;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      padding: 0.5rem 1rem;
      background: rgba(0, 255, 0, 0.1);
      border-radius: 4px;
      border: 1px solid rgba(0, 255, 0, 0.2);
      
      &:hover {
        background: rgba(0, 255, 0, 0.2);
        color: #00ffaa;
        transform: translateY(-2px);
        box-shadow: 0 2px 5px rgba(0, 255, 0, 0.1);
      }
      
      svg {
        font-size: 1rem;
      }
    }
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled(motion.div)`
  background: rgba(0, 20, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.1);
    border-color: rgba(0, 255, 0, 0.4);
  }
  
  .achievement-icon {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .achievement-content {
    flex-grow: 1;
    
    h3 {
      color: #00ff00;
      margin: 0 0 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .achievement-meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      font-size: 0.85rem;
      color: #7f9f7f;
      
      .issuer {
        font-weight: bold;
      }
      
      .date {
        font-family: 'Fira Code', monospace;
        color: #00cc00;
      }
    }
    
    .description {
      color: #b3b3b3;
      font-size: 0.9rem;
      line-height: 1.5;
      margin: 0;
    }
  }
`;

const SkillCategory = styled.div`
  h3 {
    color: #00ffff;
    margin-top: 0;
    border-bottom: 1px solid #00ff00;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    
    li {
      color: #00ff00;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      
      &::before {
        content: '>';
        margin-right: 0.5rem;
        color: #00ff00;
      }
    }
  }
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  
  .contact-link {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    padding: 1.25rem 1.75rem;
    background: rgba(10, 25, 10, 0.6);
    border-radius: 12px;
    text-decoration: none;
    color: #fff;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(0, 255, 0, 0.1);
    position: relative;
    overflow: hidden;
    z-index: 1;
    backdrop-filter: blur(5px);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(0, 255, 0, 0.1), rgba(0, 200, 0, 0.05));
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover::before {
      opacity: 1;
    }
    
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      
      svg {
        font-size: 1.5rem;
        color: var(--color, #00ff00);
        transition: all 0.3s ease;
      }
    }
    
    .link-text {
      font-family: 'Fira Code', monospace;
      font-size: 0.95rem;
      color: #e0e0e0;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 1px;
        background: var(--color, #00ff00);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.3s ease;
      }
    }
    
    &:hover {
      border-color: var(--color, #00ff00);
      box-shadow: 0 5px 20px rgba(0, 255, 0, 0.15);
      transform: translateY(-3px);
      
      .icon-wrapper {
        background: rgba(0, 0, 0, 0.5);
        transform: rotate(5deg) scale(1.1);
        
        svg {
          color: var(--hover-color, #00cc00);
          filter: drop-shadow(0 0 5px var(--color, #00ff00));
        }
      }
      
      .link-text {
        color: #fff;
        
        &::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      }
    }
    
    @media (max-width: 768px) {
      padding: 1rem 1.25rem;
      
      .icon-wrapper {
        width: 42px;
        height: 42px;
        
        svg {
          font-size: 1.25rem;
        }
      }
      
      .link-text {
        font-size: 0.9rem;
      }
    }
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 10px;
  height: 20px;
  background: #00ff00;
  margin-left: 5px;
  animation: blink 1s step-end infinite;
  
  @keyframes blink {
    from, to { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const Typewriter = ({ 
  text = '', // Default to empty string if undefined
  speed = 30, 
  delay = 0, 
  onComplete, 
  onTypingStart, 
  isDeleting = false, 
  isLast = false,
  loop = false,
  deleteSpeed = 15,
  pauseTime = 2000
}) => {
  // Ensure text is always a string
  const safeText = String(text || '');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [phase, setPhase] = useState('typing'); // 'typing', 'pausing', 'deleting'
  const timeoutRef = useRef(null);
  const cursorIntervalRef = useRef(null);
  const loopCountRef = useRef(0);
  const maxLoops = 1; // Number of times to loop before stopping

  // Handle cursor blink effect
  useEffect(() => {
    if (!isTyping && !isComplete) {
      cursorIntervalRef.current = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);
    }
    
    return () => {
      if (cursorIntervalRef.current) {
        clearInterval(cursorIntervalRef.current);
      }
    };
  }, [isTyping, isComplete]);

  // Handle typing animation phases
  useEffect(() => {
    if (isComplete || !safeText) return;
    
    let timeout;
    
    const startTyping = () => {
      setIsTyping(true);
      if (onTypingStart) onTypingStart();
      
      if (currentIndex < safeText.length) {
        // Typing forward
        timeout = setTimeout(() => {
          setDisplayText(prev => prev + safeText[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
      } else {
        // Finished typing, pause before deleting
        setPhase('pausing');
        timeout = setTimeout(() => {
          if (loop && loopCountRef.current < maxLoops) {
            setPhase('deleting');
          } else {
            setIsTyping(false);
            setIsComplete(true);
            if (onComplete) onComplete();
          }
        }, pauseTime);
      }
    };
    
    const startDeleting = () => {
      if (currentIndex > 0) {
        // Deleting text
        timeout = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        }, deleteSpeed);
      } else {
        // Finished deleting, reset for next loop
        loopCountRef.current += 1;
        setPhase('typing');
      }
    };
    
    switch (phase) {
      case 'typing':
        startTyping();
        break;
      case 'deleting':
        startDeleting();
        break;
      case 'pausing':
        // Just wait, timeout already set
        break;
      default:
        break;
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentIndex, text, phase, isComplete, speed, deleteSpeed, pauseTime, loop, onComplete, onTypingStart]);
  
  // Handle initial delay
  useEffect(() => {
    if (delay > 0) {
      setIsTyping(false);
      const timer = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayText('');
        setIsComplete(false);
        setPhase('typing');
      }, delay);
      return () => clearTimeout(timer);
    } else if (!safeText) {
      // If there's no text, immediately complete
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [safeText, delay, onComplete]);

  // Handle initial delay
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        setCurrentIndex(0);
        setDisplayText('');
        setIsComplete(false);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [text, delay]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (cursorIntervalRef.current) clearInterval(cursorIntervalRef.current);
    };
  }, []);

  // Don't render anything if there's no text
  if (!safeText) return null;
  
  return (
    <span>
      {displayText}
      {showCursor && isTyping && <Cursor>|</Cursor>}
      {showCursor && !isTyping && <Cursor>_</Cursor>}
    </span>
  );
};

const TerminalTyping = ({ 
  commands: rawCommands = [], 
  onComplete, 
  showHeader = true, 
  initialPath = '~',
  typingSpeed = 30,
  deleteSpeed = 15,
  commandDelay = 800,
  outputDelay = 500,
  pauseTime = 1500
}) => {
  // Ensure commands is always an array with valid command objects
  const commands = React.useMemo(() => {
    if (!Array.isArray(rawCommands)) return [];
    return rawCommands
      .filter(cmd => cmd && (cmd.command || cmd.output))
      .map(cmd => ({
        command: String(cmd.command || ''),
        output: cmd.output ? String(cmd.output) : '',
        commandDelay: Number(cmd.commandDelay) || commandDelay,
        outputDelay: Number(cmd.outputDelay) || outputDelay
      }));
  }, [rawCommands, commandDelay, outputDelay]);
  
  const hasCommands = commands.length > 0;
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [completedCommands, setCompletedCommands] = useState([]);
  const [currentOutput, setCurrentOutput] = useState('');
  const [showFinalPrompt, setShowFinalPrompt] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('typing-command'); // 'typing-command', 'showing-output', 'finished'
  const allCommandsComplete = useRef(false);
  const commandTimers = useRef([]);
  
  // Clear all timeouts on unmount
  useEffect(() => {
    const timers = commandTimers.current;
    return () => {
      timers.forEach(timer => timer && clearTimeout(timer));
    };
  }, []);

  // Handle command execution flow
  useEffect(() => {
    if (allCommandsComplete.current || currentCommandIndex >= commands.length || !hasCommands) {
      // If no commands or all done, mark as complete
      if (!allCommandsComplete.current && hasCommands) {
        allCommandsComplete.current = true;
        setShowFinalPrompt(true);
        setCurrentPhase('finished');
        if (onComplete) onComplete();
      }
      return;
    }
    
    const currentCommand = commands[currentCommandIndex];
    
    const processCommand = () => {
      // Start typing the command
      setCurrentPhase('typing-command');
      
      // Calculate time to type the command
      const typingTime = currentCommand.command.length * typingSpeed;
      
      // Schedule showing the output
      const outputTimer = setTimeout(() => {
        if (currentCommand.output) {
          setCurrentPhase('showing-output');
          setCurrentOutput(currentCommand.output);
          
          // Schedule moving to next command or finishing
          const nextCommandTimer = setTimeout(() => {
            // Add current command to completed commands
            setCompletedCommands(prev => [...prev, currentCommand]);
            
            // Clear current output
            setCurrentOutput('');
            
            // Move to next command or finish
            if (currentCommandIndex < commands.length - 1) {
              setCurrentCommandIndex(prev => prev + 1);
            } else {
              // All commands complete
              allCommandsComplete.current = true;
              setShowFinalPrompt(true);
              setCurrentPhase('finished');
              if (onComplete) onComplete();
            }
          }, (currentCommand.outputDelay || outputDelay) + pauseTime);
          
          commandTimers.current.push(nextCommandTimer);
        } else {
          // No output, just move to next command
          setCompletedCommands(prev => [...prev, currentCommand]);
          
          if (currentCommandIndex < commands.length - 1) {
            setCurrentCommandIndex(prev => prev + 1);
          } else {
            // All commands complete
            allCommandsComplete.current = true;
            setShowFinalPrompt(true);
            setCurrentPhase('finished');
            if (onComplete) onComplete();
          }
        }
      }, typingTime + (currentCommand.commandDelay || commandDelay));
      
      commandTimers.current.push(outputTimer);
    };
    
    processCommand();
    
    return () => {
      // Cleanup will be handled by the main effect cleanup
    };
  }, [currentCommandIndex, commands, onComplete, typingSpeed, deleteSpeed, commandDelay, outputDelay, pauseTime]);
  
  const currentCommand = commands[currentCommandIndex] || {};
  
  // Don't render if there are no commands
  if (!hasCommands) {
    return null;
  }

  return (
    <div style={{ width: '100%' }}>
      {showHeader && (
        <TerminalHeader>
          <TerminalButton color="#ff5f56" />
          <TerminalButton color="#ffbd2e" />
          <TerminalButton color="#27c93f" />
          <TerminalTitle>visitor@portfolio:{initialPath || '~'}$</TerminalTitle>
        </TerminalHeader>
      )}
      <TerminalContent>
        {/* Show completed commands with their outputs */}
        {completedCommands.map((cmd, idx) => (
          <div key={idx}>
            <CommandLine>
              <Prompt>$</Prompt>
              <Command>{cmd.command}</Command>
            </CommandLine>
            {cmd.output && (
              <Output>
                {cmd.output.split('\n').map((line, i) => (
                  <div key={i} style={{ margin: '0.25rem 0' }}>{line}</div>
                ))}
              </Output>
            )}
          </div>
        ))}
        
        {/* Current command being typed */}
        {currentCommand && currentPhase !== 'finished' && (
          <CommandLine>
            <Prompt>$</Prompt>
            <Command>
              <Typewriter 
                text={currentCommand.command} 
                speed={typingSpeed}
                deleteSpeed={deleteSpeed}
                loop={false}
                onComplete={() => {
                  // Command typing complete, output will be shown by the effect
                }}
              />
            </Command>
          </CommandLine>
        )}
        
        {/* Current command's output */}
        {currentOutput && (
          <Output>
            {currentPhase === 'showing-output' ? (
              <Typewriter 
                text={currentOutput}
                speed={5}
                deleteSpeed={2}
                loop={false}
                onComplete={() => {
                  // Output typing complete, next command will be processed by the effect
                }}
              />
            ) : (
              // Show static output if not in showing-output phase
              currentOutput.split('\n').map((line, i) => (
                <div key={i} style={{ margin: '0.25rem 0' }}>{line}</div>
              ))
            )}
          </Output>
        )}
        
        {/* Final prompt when all commands are complete */}
        {showFinalPrompt && (
          <CommandLine>
            <Prompt>$</Prompt>
            <Command><Cursor>_</Cursor></Command>
          </CommandLine>
        )}
      </TerminalContent>
    </div>
  );
};

// ============ Data ============

const achievements = [
  {
    id: 1,
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    date: 'April 2024',
    description: 'Completed comprehensive training in cybersecurity fundamentals, including network security, Linux, Python, and security operations.',
    icon: <FaCertificate />
  },
  {
    id: 2,
    title: 'CompTIA Security+ Certified',
    issuer: 'CompTIA',
    date: 'June 2024 - June 2027',
    description: 'Earned certification demonstrating baseline cybersecurity skills for IT security roles.',
    icon: <FaShieldAlt />
  },
  {
    id: 3,
    title: 'HackerRank Certifications',
    issuer: 'HackerRank',
    date: 'May 2025',
    description: 'Certified in Java, JavaScript, and React development with top performance in coding challenges.',
    icon: <FaHackerrank />
  },
  {
    id: 4,
    title: 'University Honors',
    issuer: 'University of Mississippi',
    date: '2021 - 2025',
    description: 'Graduated with honors in Computer Science with a minor in Mathematics.',
    icon: <FaGraduationCap />
  },
  {
    id: 5,
    title: 'Teaching Assistant Excellence',
    issuer: 'University of Mississippi',
    date: '2023 - 2025',
    description: 'Recognized for outstanding contribution as a Teaching Assistant for Computer Science courses.',
    icon: <FaChalkboardTeacher />
  }
];
const projects = [
  {
    id: 1,
    title: 'Phishing Detection & Awareness Platform',
    description: 'A full-stack application that combines machine learning with an interactive game to detect and educate users about phishing attempts. Features email analysis, user authentication, and a phishing identification game.',
    technologies: ['Python', 'Flask', 'React', 'SQLite', 'NLP', 'Scikit-learn'],
    github: 'https://github.com/JasonWilkerson1/Senior-Project',
    demo: 'https://gotphished.herokuapp.com',
    features: [
      'Email analysis with 90.65% accuracy in detecting phishing attempts',
      'Interactive phishing game with AI-generated scenarios',
      'User authentication and score tracking',
      'Built with React frontend and Flask backend'
    ]
  },
  {
    id: 2,
    title: 'CameronsAirHVAC Website',
    description: 'A responsive business website for an HVAC company featuring service information, appointment scheduling, and contact forms. Includes SEO optimization for local search results.',
    technologies: ['HTML5', 'CSS3', 'Bootstrap 5', 'JavaScript', 'Netlify'],
    github: 'https://github.com/JasonWilkerson1/CameronsAirHVac',
    demo: 'https://cameronsairhvac.netlify.app',
    features: [
      'Fully responsive design for all devices',
      'Google Calendar integration for appointments',
      'SEO optimized for local search',
      'Contact form with email functionality'
    ]
  },
  {
    id: 3,
    title: 'AI Chatbot with OpenAI Integration',
    description: 'A Node.js application that integrates with OpenAI\'s API to provide conversational AI capabilities. Features include message history and customizable prompts.',
    technologies: ['Node.js', 'Express', 'OpenAI API', 'JavaScript'],
    github: 'https://github.com/JasonWilkerson1/AiChatbot',
    features: [
      'Integration with OpenAI\'s GPT models',
      'Environment-based configuration',
      'Simple command-line interface',
      'Modular code structure for easy extension'
    ]
  },
  {
    id: 4,
    title: 'Box Project (Non-Profit Website)',
    description: 'A website developed for a non-profit organization, featuring information about their mission, services, and ways to get involved.',
    technologies: ['Python', 'JavaScript', 'CSS', 'HTML5'],
    github: 'https://github.com/JasonWilkerson1/Box-Project',
    features: [
      'Clean, modern UI/UX design',
      'Responsive layout for all devices',
      'Donation and volunteer signup functionality',
      'Content management system integration'
    ]
  }
];

const skills = {
  'Languages': ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'C++', 'SQL'],
  'Frontend': ['React', 'Next.js', 'Redux', 'HTML5', 'CSS3', 'SASS/SCSS', 'Styled Components'],
  'Backend': ['Node.js', 'Express', 'Django', 'RESTful APIs', 'GraphQL', 'MongoDB', 'PostgreSQL'],
  'DevOps & Tools': ['Git', 'Docker', 'AWS', 'Firebase', 'CI/CD', 'Jest', 'Cypress']
};

const contactLinks = [
  { 
    icon: <FaEnvelope />, 
    text: 'jasonwilkerson40@yahoo.com', 
    url: 'mailto:jasonwilkerson40@yahoo.com',
    color: '#00ff00',
    hoverColor: '#00cc00'
  },
  { 
    icon: <FaGithub />, 
    text: 'github.com/JasonWilkerson1', 
    url: 'https://github.com/JasonWilkerson1',
    color: '#6e5494',
    hoverColor: '#8a63d2'
  },
  { 
    icon: <FaLinkedin />, 
    text: 'https://www.linkedin.com/in/jason-wilkerson-337a32282/', 
    url: 'https://www.linkedin.com/in/jason-wilkerson-337a32282/',
    color: '#0077b5',
    hoverColor: '#00a0dc'
  },
  { 
    icon: <SiLeetcode />, 
    text: 'https://leetcode.com/u/jtwilke1/', 
    url: 'https://leetcode.com/u/jtwilke1/',
    color: '#ffa116',
    hoverColor: '#ffc107'
  },
  { 
    icon: <FaHackerrank />, 
    text: 'https://www.hackerrank.com/profile/JasonWilkerson1', 
    url: 'https://www.hackerrank.com/profile/JasonWilkerson1',
    color: '#2ec866',
    hoverColor: '#1f8a4a'
  }

];

// ============ Main Component ============
function App() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [showResumeButton, setShowResumeButton] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const typingTimeoutRef = useRef(null);
  
  const phrases = [
    "I'm a Full-Stack Developer",
    "I'm a Problem Solver",
    "I'm a Tech Enthusiast",
    "I'm a Lifelong Learner"
  ];
  
  const aboutMeText = `I am a Master of Science in Computer Science student at Georgia Tech, passionate about building scalable, impactful solutions to real-world problems. I hold a bachelor's degree in Computer Science with a minor in Mathematics from the University of Mississippi, where I graduated with honors and gained hands-on experience as a teaching assistant and project leader.

My background includes professional certifications in cybersecurity, including the Google Cybersecurity Professional Certificate and CompTIA Security+. I combine this knowledge with over three years of full-stack development experience to create secure, user-friendly applications.

My technical toolkit includes React, Python, SQL, and AWS services such as Elastic Beanstalk, S3, and EC2. I've also developed e-commerce solutions using Shopify and am proficient in productivity and design tools like the Microsoft Office Suite, Google Sheets, Google Slides, and Adobe Photoshop.`;
  
  const terminalCommands = [
    { command: 'whoami', output: 'visitor' },
    { command: 'uname -a', output: 'Linux portfolio 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux' },
    { command: 'cat about.txt', output: 'Passionate developer with expertise in building web applications and solving complex problems.\n\nSkills: JavaScript, React, Node.js, Python, and more...' },
    { command: 'ls -la projects/', output: 'total 16\ndrwxr-xr-x 4 visitor visitor 4096 May 1 10:00 .\ndrwxr-xr-x 9 visitor visitor 4096 May 1 10:00 ..\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 portfolio\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 ecommerce' },
    { command: 'echo $PATH', output: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin' },
    { command: 'date', output: new Date().toLocaleString() }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [phrases.length]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowResumeButton(true);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContainer>
      <Scanline />
      <Noise />
      
      <MainContent>
        <Header>
          <Title>Jason Wilkerson</Title>
          <Subtitle>
            <Typewriter 
              text={phrases[currentPhrase]} 
              speed={100} 
              delay={500} 
            />
          </Subtitle>
          
          {showResumeButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: '2rem' }}
            >
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 2rem',
                  background: 'transparent',
                  color: '#00ff00',
                  border: '1px solid #00ff00',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontFamily: '"Courier New", monospace',
                  position: 'relative',
                  overflow: 'hidden',
                  zIndex: 1,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(0, 255, 0, 0.1)',
                    boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                    transform: 'translateY(-2px)'
                  },
                  '&::before': {
                    content: '"\u00A0\u003E\u00A0"',
                    marginRight: '0.5rem'
                  },
                  '&::after': {
                    content: '"\u00A0\u003C\u00A0"',
                    marginLeft: '0.5rem'
                  }
                }}
              >
                View Resume
              </a>
            </motion.div>
          )}
        </Header>
        
        <Section id="about">
          <h2>About Me</h2>
          <TerminalTyping commands={[
            { command: 'whoami', output: 'visitor' },
            { command: 'uname -a', output: 'Linux portfolio 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux' },
            { command: 'cat about.txt', output: 'Passionate developer with expertise in building web applications and solving complex problems.\n\nSkills: JavaScript, React, Node.js, Python, and more...' },
          ]} />
        </Section>
        
        <TerminalWindow title="visitor@portfolio:~/projects$">
          <Section id="projects">
            <h2>Projects</h2>
            <TerminalTyping 
              commands={[
                { command: 'ls -la', output: 'total 20\ndrwxr-xr-x 5 visitor visitor 4096 May 1 10:00 .\ndrwxr-xr-x 9 visitor visitor 4096 May 1 10:00 ..\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 phishing-detection\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 camerons-airhvac\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 ai-chatbot\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 box-project' },
                { command: 'cat projects.txt', output: '1. Phishing Detection & Awareness Platform\n2. CameronsAirHVAC Website\n3. AI Chatbot with OpenAI Integration\n4. Box Project (Non-Profit Website)' }
              ]}
              showHeader={false}
            />
            <ProjectsGrid>
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  
                  {project.features && project.features.length > 0 && (
                    <ul className="project-features">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="tech-tags">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx}>{tech}</span>
                    ))}
                  </div>
                  
                  <div className="links">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} on GitHub`}>
                      <FaGithub /> Code
                    </a>
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} live demo`}>
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          </Section>
        </TerminalWindow>
        
        <TerminalWindow title="visitor@portfolio:~/skills$">
          <Section id="skills">
            <h2>Skills</h2>
            <TerminalTyping 
              commands={[
                { command: 'ls -la', output: 'total 16\ndrwxr-xr-x 4 visitor visitor 4096 May 1 10:00 .\ndrwxr-xr-x 9 visitor visitor 4096 May 1 10:00 ..\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 frontend\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 backend\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 devops\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 tools' },
                { command: 'cat frontend/skills.txt', output: 'React, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Styled Components, Redux, Next.js' },
                { command: 'cat backend/skills.txt', output: 'Node.js, Python, Django, Flask, Express, RESTful APIs, GraphQL, PostgreSQL, MongoDB' },
                { command: 'cat devops/skills.txt', output: 'Docker, Kubernetes, AWS, CI/CD, GitHub Actions, Jenkins, Terraform' },
                { command: 'cat tools/skills.txt', output: 'Git, VS Code, Postman, Jira, Confluence, Figma, Adobe Photoshop' }
              ]} 
              showHeader={false}
            />
            <SkillsGrid>
              {Object.entries(skills).map(([category, items]) => (
                <SkillCategory key={category}>
                  <h3>{category}</h3>
                  <ul>
                    {items.map((item, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </SkillCategory>
              ))}
            </SkillsGrid>
          </Section>
        </TerminalWindow>

        <TerminalWindow title="visitor@portfolio:~/achievements$">
          <Section id="achievements">
            <h2>Achievements</h2>
            <TerminalTyping 
              commands={[
                { command: 'ls -la', output: 'total 20\ndrwxr-xr-x 5 visitor visitor 4096 May 1 10:00 .\ndrwxr-xr-x 9 visitor visitor 4096 May 1 10:00 ..\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 certifications\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 education\ndrwxr-xr-x 8 visitor visitor 4096 May 1 10:00 experience' },
                { command: 'cat certifications/list.txt', output: 'Google Cybersecurity Professional Certificate (2024)\nCompTIA Security+ (2024-2027)\nHackerRank Certifications (Java, JavaScript, React) (2025)' },
                { command: 'cat education/honors.txt', output: 'University of Mississippi - BS in Computer Science with Honors (2021-2025)\nGeorgia Institute of Technology - MS in Computer Science (2025-2028)' },
                { command: 'cat experience/leadership.txt', output: 'Teaching Assistant - University of Mississippi (2023-2025)\nJunior Software Developer - Yooper Chook (2024-Present)' }
              ]}
              showHeader={false}
            />
            <AchievementsGrid>
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="achievement-icon">
                    {React.cloneElement(achievement.icon, { 
                      style: { 
                        color: '#00ff00',
                        fontSize: '2rem',
                        marginRight: '1rem'
                      } 
                    })}
                  </div>
                  <div className="achievement-content">
                    <h3>{achievement.title}</h3>
                    <div className="achievement-meta">
                      <span className="issuer">{achievement.issuer}</span>
                      <span className="date">{achievement.date}</span>
                    </div>
                    <p className="description">{achievement.description}</p>
                  </div>
                </AchievementCard>
              ))}
            </AchievementsGrid>
          </Section>
        </TerminalWindow>
        
        <Section id="technologies">
          <h2>Technologies I Work With</h2>
          <TechCarousel />
        </Section>
        
        <Section id="contact">
          <h2>Get In Touch</h2>
          <ContactInfo>
            {contactLinks.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                style={{
                  '--color': link.color,
                  '--hover-color': link.hoverColor
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 5px 15px rgba(0, 255, 0, 0.2)'
                }}
              >
                <span className="icon-wrapper">
                  {React.cloneElement(link.icon, { 
                    style: { 
                      color: link.color,
                      transition: 'all 0.3s ease'
                    } 
                  })}
                </span>
                <span className="link-text">{link.text}</span>
              </motion.a>
            ))}
          </ContactInfo>
        </Section>
        
        <footer style={{ textAlign: 'center', margin: '3rem 0', color: '#00ff00', opacity: 0.7 }}>
          <p>Designed & Built with ❤️ by Jason Wilkerson</p>
          <p>© {new Date().getFullYear()} - All rights reserved</p>
        </footer>
      </MainContent>
    </AppContainer>
  );
}

export default App;
