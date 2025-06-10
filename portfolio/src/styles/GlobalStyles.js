import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Courier New', monospace;
    background-color: #0a0a0a;
    color: #00ff00;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::selection {
    background: rgba(0, 255, 0, 0.2);
    color: #00ff00;
  }

  a {
    color: #00ffff;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #00ff00;
    }
  }


  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  button, input, textarea {
    font-family: inherit;
    font-size: 1rem;
  }
`;
