import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import GlitchButton from '../components/GlitchButton';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
  padding: 2rem;
  background: #1E1E1E;
  color: #00FF00;
`;

const ErrorCode = styled(motion.h1)`
  font-size: 8rem;
  margin: 0;
  color: #FF0000;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  font-family: 'Fira Code', monospace;
  
  @media (max-width: 600px) {
    font-size: 5rem;
  }
`;

const ErrorMessage = styled(motion.p)`
  font-size: 1.5rem;
  margin: 1rem 0 2rem;
  color: #00FF00;
  max-width: 600px;
  line-height: 1.6;
  
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const TerminalText = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00FF00;
  padding: 1.5rem;
  border-radius: 4px;
  margin: 2rem 0;
  text-align: left;
  max-width: 800px;
  width: 100%;
  
  p {
    margin: 0.5rem 0;
    color: #00FF00;
    font-family: 'Fira Code', monospace;
    
    &.command {
      color: #00FFFF;
      margin-bottom: 1rem;
      
      &::before {
        content: 'user@portfolio:~$ ';
        color: #00FF00;
      }
    }
    
    &.error {
      color: #FF0000;
      
      &::before {
        content: 'Error: ';
        font-weight: bold;
      }
    }
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <ErrorCode
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </ErrorCode>
      
      <ErrorMessage
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Oops! The page you're looking for doesn't exist.
      </ErrorMessage>
      
      <TerminalText>
        <p className="command">cd /home</p>
        <p className="error">bash: cd: /home: No such file or directory</p>
        
        <p className="command">ls -la</p>
        <p>drwxr-xr-x  2 user user 4096 Jan  1 00:00 .</p>
        <p>drwxr-xr-x 18 root root 4096 Jan  1 00:00 ..</p>
        <p>lrwxrwxrwx  1 user user   11 Jan  1 00:00 home -&gt; /usr/home</p>
        <p>lrwxrwxrwx  1 user user   11 Jan  1 00:00 skills -&gt; /usr/skills</p>
        <p>lrwxrwxrwx  1 user user   14 Jan  1 00:00 projects -&gt; /usr/projects</p>
        <p>lrwxrwxrwx  1 user user   18 Jan  1 00:00 achievements -&gt; /usr/achievements</p>
        <p>lrwxrwxrwx  1 user user   12 Jan  1 00:00 contact -&gt; /usr/contact</p>
        
        <p className="command" style={{ marginTop: '1rem' }}>cd /</p>
        <p className="command">ls -l</p>
        <p>drwxr-xr-x  2 user user 4096 Jan  1 00:00 home/</p>
        <p>drwxr-xr-x  2 user user 4096 Jan  1 00:00 skills/</p>
        <p>drwxr-xr-x  2 user user 4096 Jan  1 00:00 projects/</p>
        <p>drwxr-xr-x  2 user user 4096 Jan  1 00:00 achievements/</p>
        <p>drwxr-xr-x  2 user user 4096 Jan  1 00:00 contact/</p>
      </TerminalText>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <GlitchButton as={Link} to="/">
          Return to Home
        </GlitchButton>
      </motion.div>
    </NotFoundContainer>
  );
};

export default NotFound;
