# Portfolio Website

A modern, interactive portfolio website with a retro terminal aesthetic. Built with React, Vite, and Styled Components, this portfolio showcases my skills, projects, and professional experience in a unique, command-line inspired interface.

![Portfolio Preview](https://portfolio-jasonwilkerson.netlify.app/)

## Features

- **Terminal UI**: Immersive command-line interface experience
- **Responsive Design**: Fully responsive layout that works on all devices
- **Interactive Elements**: Hover effects, glitch animations, and typing animations
- **Dark Theme**: Easy-on-the-eyes dark theme with green accents
- **Project Showcase**: Detailed project cards with technologies used
- **Skills Matrix**: Visual representation of technical skills and expertise
- **Contact Information**: Easy way to get in touch

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
