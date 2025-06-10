# Portfolio Website

A modern, responsive portfolio website built with React, Vite, and Styled Components. This portfolio features a terminal-like interface with interactive elements and smooth animations.

![Portfolio Preview](./public/portfolio-preview.png)

## Features

- 🖥️ Terminal-style interface with typing effect
- 🌓 Dark theme with green accent colors
- 📱 Fully responsive design
- 🚀 Smooth page transitions
- ✨ Interactive elements with glitch effects
- 📄 Easy-to-update project and skill sections

## Technologies Used

- ⚛️ React 18
- 🎨 Styled Components
- 🎭 Framer Motion for animations
- 🛣️ React Router for navigation
- 📦 Vite for fast development and builds
- 🔍 ESLint & Prettier for code quality

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components
├── styles/          # Global styles and theme
├── App.jsx          # Main App component with routing
└── main.jsx         # Application entry point
```

## Customization

1. **Update Personal Information**:
   - Edit the content in the respective page components (`Home.jsx`, `Skills.jsx`, etc.)
   - Update the `projectsData` in `Projects.jsx`
   - Modify the `skillsData` in `Skills.jsx`

2. **Styling**:
   - Update colors in `GlobalStyles.js`
   - Modify component styles in their respective styled components

3. **Resume**:
   - Replace `public/resume.pdf` with your own resume

## Deployment

This project can be deployed to any static hosting service:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Fira Code](https://github.com/tonsky/FiraCode) - Beautiful monospace font with programming ligatures
- [Styled Components](https://styled-components.com/) - For component-scoped styling
- [Framer Motion](https://www.framer.com/motion/) - For smooth animations
- [React Icons](https://react-icons.github.io/react-icons/) - For icons
