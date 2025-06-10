import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import TerminalWindow from '../components/TerminalWindow';

// Styled Components
const ContactContainer = styled.div`
  padding: 1rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  font-family: 'Fira Code', monospace;
`;

const CommandLine = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #00FF00;
  font-size: 1rem;
`;

const Prompt = styled.span`
  color: #00FF00;
  margin-right: 0.5rem;
`;

const Command = styled.span`
  color: #00FF00;
`;

const Output = styled.div`
  color: #00FF00;
  margin-left: 2rem;
  margin-bottom: 1.5rem;
`;

const ContactItem = styled(motion.a)`
  display: flex;
  align-items: center;
  color: #00FF00;
  text-decoration: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  width: fit-content;
  
  &:hover {
    background: rgba(0, 255, 0, 0.1);
    color: #00FFFF;
    transform: translateX(5px);
  }
  
  svg {
    margin-right: 0.75rem;
    font-size: 1.2rem;
  }
`;

const Contact = () => {
  const contacts = [
    {
      name: 'GitHub',
      url: 'https://github.com/JasonWilkerson1',
      icon: <FaGithub />,
    },
    {
      name: 'Email',
      url: 'mailto:jasonwilkerson40@yahoo.com',
      icon: <FaEnvelope />,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/jason-wilkerson-337a32282',
      icon: <FaLinkedin />,
    }
  ];

  return (
    <ContactContainer>
      <TerminalWindow title="visitor@portfolio:~$">
        <CommandLine>
          <Prompt>$</Prompt>
          <Command>contact --list</Command>
        </CommandLine>
        
        <Output>
          {contacts.map((contact, index) => (
            <ContactItem
              key={index}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              {contact.icon}
              {contact.name}
            </ContactItem>
          ))}
        </Output>
        
        <CommandLine>
          <Prompt>$</Prompt>
          <span style={{ color: '#00FF00' }}>_</span>
        </CommandLine>
      </TerminalWindow>
      
      <motion.p 
        style={{ 
          color: '#00FF00', 
          marginTop: '2rem',
          fontFamily: 'Fira Code, monospace',
          textAlign: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        visitor@portfolio:~$ <span style={{ color: '#00FFFF' }}>cd ..</span>
      </motion.p>
    </ContactContainer>
  );
};

export default Contact;
