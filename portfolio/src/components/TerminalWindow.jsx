import React from 'react';
import styled from 'styled-components';

const TerminalContainer = styled.div`
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid #00FF00;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
`;

const TerminalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  color: #00FF00;
  font-size: 0.9rem;
`;

const TerminalButton = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  background: ${props => props.color};
`;

const TerminalTitle = styled.span`
  margin-left: 1rem;
  font-family: 'Fira Code', monospace;
`;

const TerminalContent = styled.div`
  color: #00FF00;
  font-family: 'Fira Code', monospace;
  line-height: 1.6;
`;

const TerminalWindow = ({ title = 'visitor@terminal', children }) => {
  return (
    <TerminalContainer>
      <TerminalHeader>
        <TerminalButton color="#FF5F56" />
        <TerminalButton color="#FFBD2E" />
        <TerminalButton color="#27C93F" />
        <TerminalTitle>{title}</TerminalTitle>
      </TerminalHeader>
      <TerminalContent>
        {children}
      </TerminalContent>
    </TerminalContainer>
  );
};

export default TerminalWindow;
