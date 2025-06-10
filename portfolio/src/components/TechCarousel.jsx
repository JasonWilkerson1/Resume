import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaReact, FaNodeJs, FaPython, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiTypescript, SiJavascript, SiPostgresql, SiMongodb, SiGraphql, SiRedux } from 'react-icons/si';

const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 7));
  }
`;

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  margin: 2rem 0;
  padding: 1rem 0;
  background: rgba(0, 20, 0, 0.1);
  border-top: 1px solid rgba(0, 255, 0, 0.2);
  border-bottom: 1px solid rgba(0, 255, 0, 0.2);
`;

const Track = styled.div`
  display: flex;
  width: calc(250px * 14);
  animation: ${scroll} 30s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const TechItem = styled.div`
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: #00FF00;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 1rem;
    font-size: 2rem;
    color: #00FF00;
  }
  
  span {
    font-family: 'Fira Code', monospace;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  &:hover {
    transform: scale(1.1);
    text-shadow: 0 0 10px #00FF00;
    
    svg {
      filter: drop-shadow(0 0 5px #00FF00);
    }
  }
`;

const techItems = [
  { icon: <FaReact />, name: 'React' },
  { icon: <FaNodeJs />, name: 'Node.js' },
  { icon: <SiTypescript />, name: 'TypeScript' },
  { icon: <SiJavascript />, name: 'JavaScript' },
  { icon: <FaPython />, name: 'Python' },
  { icon: <FaAws />, name: 'AWS' },
  { icon: <FaDocker />, name: 'Docker' },
  { icon: <FaGitAlt />, name: 'Git' },
  { icon: <SiPostgresql />, name: 'PostgreSQL' },
  { icon: <SiMongodb />, name: 'MongoDB' },
  { icon: <SiGraphql />, name: 'GraphQL' },
  { icon: <SiRedux />, name: 'Redux' },
];

// Duplicate items for infinite scroll effect
const duplicatedItems = [...techItems, ...techItems];

const TechCarousel = () => {
  return (
    <CarouselContainer>
      <Track>
        {duplicatedItems.map((item, index) => (
          <TechItem key={index}>
            {item.icon}
            <span>{item.name}</span>
          </TechItem>
        ))}
      </Track>
    </CarouselContainer>
  );
};

export default TechCarousel;
