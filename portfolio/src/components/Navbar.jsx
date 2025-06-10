import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(30, 30, 30, 0.9);
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #00FF00;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 2rem;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    color: #00FF00;
    text-decoration: none;
    font-family: 'Fira Code', monospace;
    &:hover {
      color: #00FFFF;
      text-decoration: underline;
    }
  }
`;

const Navbar = () => (
  <Nav>
    <NavList>
      <NavItem><Link to="/">~/home</Link></NavItem>
      <NavItem><Link to="/skills">~/skills</Link></NavItem>
      <NavItem><Link to="/projects">~/projects</Link></NavItem>
      <NavItem><Link to="/achievements">~/achievements</Link></NavItem>
      <NavItem><Link to="/contact">~/contact</Link></NavItem>
    </NavList>
  </Nav>
);

export default Navbar;
