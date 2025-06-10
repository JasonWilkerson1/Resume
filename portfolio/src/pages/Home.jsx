import React from 'react';
import styled from 'styled-components';
import TypingEffect from '../components/TypingEffect';
import { Link } from 'react-router-dom';
import GlitchButton from '../components/GlitchButton';
import TerminalWindow from '../components/TerminalWindow';

const HomeContainer = styled.div`
  padding: 1rem;
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
    <TerminalWindow title="visitor@portfolio:~$">
      <TypingEffect />
      <Prompt>
        <Command>$</Command> whoami
      </Prompt>
      <p>Hello! I'm Jason Wilkerson, a Cybersecurity Professional.</p>
      
      <Prompt>
        <Command>$</Command> ls
      </Prompt>
      <NavList>
        <Link to="/skills">skills/</Link>
        <Link to="/projects">projects/</Link>
        <Link to="/achievements">achievements/</Link>
        <Link to="/contact">contact/</Link>
      </NavList>

      <ButtonGroup>
        <GlitchButton 
          as="a" 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Resume
        </GlitchButton>
        <GlitchButton 
          as="a" 
          href="/contact"
          secondary
        >
          Contact Me
        </GlitchButton>
      </ButtonGroup>
    </TerminalWindow>
  </HomeContainer>
);

export default Home;
