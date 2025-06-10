import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const TerminalContainer = styled.div`
  background: transparent;
  overflow: hidden;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: none;
  box-shadow: none;
  
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(0, 20, 0, 0.95);
  border-bottom: none;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const TerminalButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  background: ${props => props.color};
  flex-shrink: 0;
`;

const TerminalTitle = styled.span`
  display: none;
`;

const TerminalContent = styled.div`
  color: #00FF00;
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
  padding: 0;
  overflow: visible;
  flex: 1;
`;

const NavBar = styled.nav`
  display: flex;
  background: rgba(0, 20, 0, 0.95);
  padding: 0.5rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  align-items: center;
  justify-content: space-between;
  
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    flex-wrap: nowrap;
  }
`;

const NavItem = styled(Link).withConfig({
  shouldForwardProp: (prop) => prop !== 'isActive',
})`
  color: ${props => props.isActive ? '#00FF00' : '#00AA00'};
  margin-right: 1.5rem;
  padding: 0.5rem 0;
  position: relative;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${props => props.$active ? '#00FF00' : 'transparent'};
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #00FF00;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 0.25rem 0;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(0, 255, 0, 0.1);
    
    &:last-child {
      border-bottom: none;
    }
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: 1px solid #00FF00;
  border-radius: 4px;
  color: #00FF00;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem 0.75rem;
  margin-left: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(0, 255, 0, 0.1);
    color: #00FF88;
  }
  
  @media (max-width: 768px) {
    display: block;
    order: 1;
  }
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  
  @media (max-width: 768px) {
    flex: 1;
    justify-content: space-between;
    align-items: center;
  }
`;

const NavItems = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  
  @media (max-width: 768px) {
    display: ${props => props.$isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(0, 20, 0, 0.95);
    padding: 1rem;
    border-bottom: 1px solid #008800;
    z-index: 1000;
  }
`;

const navItems = [
  { path: '#home', label: 'home' },
  { path: '#skills', label: 'skills' },
  { path: '#projects', label: 'projects' },
  { path: '#achievements', label: 'achievements' },
  { path: '#contact', label: 'contact' },
];

const TerminalWindow = ({ title = 'visitor@terminal', children, showDots = false }) => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('~');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);
  
  useEffect(() => {
    // Update current path based on route
    const path = location.pathname.substring(1) || 'home';
    setCurrentPath(`~/${path}`);
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Toggle navigation"]')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavBar 
        ref={navRef}
        aria-hidden={!isMenuOpen}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <TerminalButton color="#FF5F56" />
          <TerminalButton color="#FFBD2E" />
          <TerminalButton color="#27C93F" />
        </div>
        
        <HamburgerButton 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          style={{ marginLeft: 'auto' }}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </HamburgerButton>
        
        <NavItems $isOpen={isMenuOpen}>
          {navItems.map((item) => (
            <NavItem
              key={item.path}
              to={item.path}
              isActive={location.hash === item.path || (location.pathname === '/' && item.path === '#home')}
              onClick={() => {
                setIsMenuOpen(false);
                const element = document.querySelector(item.path);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              ~/{item.label}
            </NavItem>
          ))}
        </NavItems>
      </NavBar>
      <TerminalContainer id="home">
        <TerminalHeader>
          <TerminalTitle style={{ color: '#00AA00' }}>visitor@portfolio:{currentPath}$</TerminalTitle>
        </TerminalHeader>
        <TerminalContent>
          {children}
        </TerminalContent>
      </TerminalContainer>
    </>
  );
};

export default TerminalWindow;
