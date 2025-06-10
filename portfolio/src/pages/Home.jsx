import React from 'react';
import styled from 'styled-components';
import TypingEffect from '../components/TypingEffect';
import { Link } from 'react-router-dom';
import GlitchButton from '../components/GlitchButton';

const HomeContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Prompt = styled.div`
  color: #00FF00;
  margin-bottom: 1rem;
`;

const Command = styled.span`
  color: #00FFFF;
`;

const NavList = styled.div`
  margin: 2rem 0;
  
  a {
    display: inline-block;
    margin-right: 1.5rem;
    margin-bottom: 0.5rem;
    color: #00FF00;
    
    &:hover {
      color: #00FFFF;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const Home = () => (
  <HomeContainer>
    <TypingEffect />
    <Prompt>
      <span>user@portfolio:~$ <Command>whoami</Command></span>
      <p>Hello! I'm Jason Wilkerson, a Computer Science graduate from the University of Mississippi (B.S. CS, Magna Cum Laude) and current Master's student at Georgia Tech (M.S. CS, 4.0 GPA). I'm a Full-Stack Developer with a strong foundation in cybersecurity, holding CompTIA Security+ and Google Cybersecurity certifications.</p>
    </Prompt>
    
    <Prompt>
      <span>user@portfolio:~$ <Command>ls</Command></span>
      <NavList>
        <Link to="/skills">skills/</Link>
        <Link to="/projects">projects/</Link>
        <Link to="/achievements">achievements/</Link>
        <Link to="/contact">contact/</Link>
      </NavList>
    </Prompt>
    
    <Prompt>
      <span>user@portfolio:~$ <Command>cat expertise.txt</Command></span>
      <p>
        • Full-Stack Development (React, Node.js, Python, Java)
        • Cybersecurity & Network Security
        • Cloud Infrastructure (AWS, Docker)
        • API Design & Development
        • Database Management (SQL, MongoDB)
      </p>
    </Prompt>
    
    <ButtonGroup>
      <GlitchButton as="a" href="/contact">Contact Me</GlitchButton>
      <GlitchButton as="a" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
        View Resume
      </GlitchButton>
    </ButtonGroup>
  </HomeContainer>
);

export default Home;
