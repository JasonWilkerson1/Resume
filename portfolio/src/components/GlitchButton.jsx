import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import StaticEffect from './staticEffect';

const glitch = keyframes`
  0% { text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00; }
  15% { text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00; }
  16% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00; }
  49% { text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00; }
  50% { text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00; }
  99% { text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff, 0 -0.04em 0 #fffc00; }
  100% { text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff, -0.04em -0.025em 0 #fffc00; }
`;

const Button = styled.button`
  position: relative;
  background: rgba(0, 20, 0, 0.2);
  color: #00ff00;
  border: 1px solid #00ff00;
  padding: 0.8rem 2rem;
  font-family: 'Courier New', monospace;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1;
  min-width: 150px;
  text-align: center;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
  text-shadow: 0 0 5px rgba(0, 255, 0, 0.5);
  overflow: hidden;

  &:hover {
    background: rgba(0, 40, 0, 0.4);
    box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
    animation: ${glitch} 0.5s infinite;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 255, 0, 0.5);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, rgba(0, 255, 0, 0.2), rgba(0, 200, 100, 0.1));
    z-index: -1;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
    border-radius: 2px;
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }

  ${props => props.secondary && `
    background: rgba(255, 100, 200, 0.15);
    border-color: #FF69B4;
    color: #FF69B4;
    box-shadow: 0 0 10px rgba(255, 100, 200, 0.3);
    text-shadow: 0 0 5px rgba(255, 100, 200, 0.5);

    &:hover {
      background: rgba(255, 100, 200, 0.25);
      box-shadow: 0 0 20px rgba(255, 100, 200, 0.6);
    }

    &::before {
      background: linear-gradient(45deg, rgba(255, 100, 200, 0.2), rgba(100, 200, 255, 0.1));
    }

    &:hover::before {
      background: linear-gradient(45deg, rgba(255, 100, 200, 0.4), rgba(255, 150, 200, 0.2));
    }
  `}
`;

const GlitchButton = ({ children, to, href, target, rel, secondary, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);

  let Component = Button;
  let componentProps = { ...props };

  if (to) {
    Component = Button.withComponent(Link);
    componentProps = { ...componentProps, to };
  } else if (href) {
    Component = Button.withComponent('a');
    componentProps = { ...componentProps, href, target, rel };
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Component secondary={secondary} {...componentProps} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {children}
      </Component>
      <StaticEffect show={isHovered} />
    </div>
  );
};

export default GlitchButton;