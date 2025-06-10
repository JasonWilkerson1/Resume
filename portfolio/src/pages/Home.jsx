import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Typewriter from '../components/Typewriter';
import StaticEffect from '../components/staticEffect';
import GlitchButton from '../components/GlitchButton';
import TerminalWindow from '../components/TerminalWindow';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const glitch = keyframes`
  0% { 
    text-shadow: 0.05em 0 0 #00fffc, -0.05em -0.025em 0 #fc00ff, -0.025em 0.05em 0 #fffc00;
    transform: translate(0);
  }
  14% { 
    text-shadow: 0.05em 0 0 #00fffc, -0.05em -0.025em 0 #fc00ff, -0.025em 0.05em 0 #fffc00;
    transform: translate(0);
  }
  15% { 
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #fc00ff, -0.05em -0.05em 0 #fffc00;
    transform: translate(-5px, 5px);
  }
  49% { 
    text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.025em 0 #fc00ff, -0.05em -0.05em 0 #fffc00;
    transform: translate(-5px, 5px);
  }
  50% { 
    text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #fc00ff, 0 -0.05em 0 #fffc00;
    transform: translate(5px, -5px);
  }
  99% { 
    text-shadow: 0.025em 0.05em 0 #00fffc, 0.05em 0 0 #fc00ff, 0 -0.05em 0 #fffc00;
    transform: translate(5px, -5px);
  }
  100% { 
    text-shadow: -0.025em 0 0 #00fffc, -0.025em -0.025em 0 #fc00ff, -0.025em -0.05em 0 #fffc00;
    transform: translate(0);
  }
`;

const float = keyframes`
  0% { transform: translate(0, 0) rotate(0deg) scale(1); }
  25% { transform: translate(10px, -10px) rotate(5deg) scale(1.1); }
  50% { transform: translate(0, -20px) rotate(0deg) scale(1); }
  75% { transform: translate(-10px, -10px) rotate(-5deg) scale(1.1); }
  100% { transform: translate(0, 0) rotate(0deg) scale(1); }
`;

const glitchEffect = css`
  position: relative;
  color: #00ff00;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    animation: ${glitch} 0.5s infinite;
    color: #00ff00 !important;
    text-decoration: none !important;
    
    &::after {
      content: 'click me';
      position: absolute;
      top: -25px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 32, 0, 0.9);
      border: 1px solid #00ff00;
      border-radius: 4px;
      padding: 2px 8px;
      font-size: 0.8rem;
      white-space: nowrap;
      animation: ${float} 3s ease-in-out infinite, ${glitch} 1s infinite;
      z-index: 1000;
      pointer-events: none;
    }
  }
`;

const ClickMe = styled.span`
  position: absolute;
  color: #00ff00;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  opacity: 0.8;
  pointer-events: none;
  animation: ${float} 3s ease-in-out infinite, ${glitch} 1s infinite;
  z-index: 1000;
  background: rgba(0, 32, 0, 0.9);
  border: 1px solid #00ff00;
  border-radius: 4px;
  padding: 2px 8px;
  white-space: nowrap;
  transition: all 0.3s ease;
  
  &:hover {
    animation: ${float} 3s ease-in-out infinite, ${glitch} 0.5s infinite !important;
    transform: scale(1.1);
  }
`;

const HomeContainer = styled.div`
  padding: 0;
  max-width: 100%;
  min-height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Content = styled.div`
  margin-top: 1rem;
  padding: 1rem;
`;

const IntroText = styled.p`
  color: #00FF00;
  line-height: 1.6;
  margin: 1.5rem 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 2.5rem 0 1rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    
    & > * {
      width: 100%;
      max-width: 250px;
    }
  }
`;
const NavLink = styled.a`
  color: #00ff00;
  text-decoration: none;
  margin: 0 15px;
  position: relative;
  font-family: 'Courier New', monospace;
  padding: 5px 10px;
  border: 1px solid transparent;
  transition: all 0.3s ease;
  z-index: 1;

  &:hover {
    animation: ${glitch} 0.5s infinite;
    border: 1px solid #00ff00;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);

    .click-me {
      opacity: 1;
      visibility: visible;
    }
  }
`;
const phrases = [
  "I'm a Full-Stack Developer",
  "I'm a Problem Solver",
  "I'm a Tech Enthusiast",
  "I'm a Lifelong Learner"
];

const Home = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase(prev => (prev + 1) % phrases.length);
    }, 6000); // Cycle every 6s to allow typing/deleting
    return () => clearInterval(interval);
  }, []);
  const handleMouseEnter = (e, link) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHoveredLink = {
      link,
      top: rect.top - 30,
      left: rect.left + rect.width / 2
    };
    console.log('hoveredLink:', newHoveredLink);
    setHoveredLink(newHoveredLink);
  };
 


  
  return (
    <HomeContainer>
      <TerminalWindow title="visitor@portfolio:~/home" showDots={false}>
        <Content className="terminal-content">
          <div style={{ minHeight: '2.5em' }}>
            <Typewriter
              text={phrases[currentPhrase]}
              speed={50}
              deleteSpeed={30}
              pauseTime={1000}
              loop={true}
            />
          </div>

          <IntroText>
            Hello! I'm Jason Wilkerson, a Cybersecurity Professional with expertise in full-stack development and security.
          </IntroText>

          <IntroText>
            I'm a passionate developer with a strong foundation in computer science and cybersecurity.
            Currently pursuing my Master's in CS at Georgia Tech, I specialize in building secure
            and scalable applications. My expertise spans across various technologies including
            JavaScript, Python, Java, and modern web frameworks.
          </IntroText>

          <div style={{ position: 'relative', marginTop: '2rem' }}>
            <nav style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '1.5rem'
            }}>
              {['about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <NavLink
                key={section}
                href={`#${section}`}
                onMouseEnter={(e) => handleMouseEnter(e, section)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {section}
                {hoveredLink?.link === section && <ClickMe className="click-me">click me</ClickMe>}
              </NavLink>
            ))}
            </nav>

            {hoveredLink && (
              <StaticEffect
                show={true}
                top={hoveredLink.top}
                left={hoveredLink.left}
              />
            )}

            <ButtonGroup>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <GlitchButton
                  as="a"
                  href="/resume2.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    textAlign: 'center',
                    padding: '0.8rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  View Resume
                </GlitchButton>
              </div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <GlitchButton
                  as="a"
                  href="#contact"
                  secondary
                  style={{
                    display: 'inline-block',
                    textDecoration: 'none',
                    textAlign: 'center',
                    padding: '0.8rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '500',
                    borderRadius: '4px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Contact Me
                </GlitchButton>
              </div>
            </ButtonGroup>
          </div>
        </Content>
      </TerminalWindow>
    </HomeContainer>
  );
};
export default Home;
