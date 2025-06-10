import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    background: #1E1E1E;
    color: #00FF00;
    font-family: 'Fira Code', monospace;
    font-size: 16px;
    line-height: 1.6;
    padding-top: 60px;
  }
  
  a {
    color: #00FFFF;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      text-decoration: underline;
      color: #00FF00;
    }
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    color: #00FF00;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  button {
    outline: none;
    cursor: pointer;
  }
`;

export default GlobalStyles;
