import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import TerminalWindow from '../components/TerminalWindow';

const ProjectsContainer = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  padding-top: 2rem;
`;

const Command = styled.span`
  color: #00FFFF;
  margin-right: 0.5rem;
`;

const Prompt = styled.div`
  color: #00FF00;
  margin: 1.5rem 0 0.5rem;
  font-family: 'Fira Code', monospace;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00FF00;
  border-radius: 8px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.2);
  }
  
  h3 {
    color: #00FFFF;
    margin: 0 0 0.75rem 0;
    font-size: 1.2rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  
  p {
    color: #00FF00;
    margin: 0 0 1rem 0;
    line-height: 1.5;
    font-size: 0.9rem;
    flex-grow: 1;
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin: 0.75rem 0 1.25rem;
    
    span {
      background: rgba(0, 255, 0, 0.1);
      color: #00FF00;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.7rem;
      border: 1px solid #00FF00;
      white-space: nowrap;
    }
  }
  
  .project-link {
    display: inline-flex;
    align-items: center;
    color: #00FFFF;
    text-decoration: none;
    font-size: 0.9rem;
    margin-top: auto;
    
    &:hover {
      text-decoration: underline;
    }
    
    svg {
      margin-right: 0.5rem;
    }
  }
  
  .project-icon {
    width: 40px;
    height: 40px;
    background: rgba(0, 255, 0, 0.1);
    border: 1px solid #00FF00;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  }
`;

const projectsData = [
  {
    id: 1,
    title: 'AI-Powered Phishing Detection Tool',
    description: 'Developed a real-time email analysis system using natural language processing to identify and flag potential phishing attempts with 95% accuracy.',
    technologies: ['Python', 'NLP', 'Machine Learning', 'Cybersecurity'],
    github: '#',
    demo: '#',
    icon: '🤖',
  },
  {
    id: 2,
    title: 'Nonprofit Organization Website',
    description: 'Built a full-stack website for a nonprofit organization to enhance their online presence and facilitate donations, resulting in a 40% increase in engagement.',
    technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
    github: '#',
    demo: '#',
    icon: '🌐',
  },
  {
    id: 3,
    title: 'YooperChook Website',
    description: 'Contributed to the development of YooperChook\'s website, implementing frontend components and backend functionality to improve user experience.',
    technologies: ['React', 'Python', 'AWS', 'CI/CD'],
    github: '#',
    demo: '#',
    icon: '🐓',
  },
  {
    id: 4,
    title: 'Google Maps Integration API',
    description: 'Designed and developed scalable Python-based backend APIs integrating Google Maps and Geolocation services, improving system accessibility by 20%.',
    technologies: ['Python', 'Google Maps API', 'RESTful APIs', 'AWS'],
    github: '#',
    demo: '#',
    icon: '🗺️',
  },
  {
    id: 5,
    title: 'AWS Infrastructure Optimization',
    description: 'Engineered AWS-based infrastructure solutions and CI/CD pipelines to support rapid A/B testing and improve page load times.',
    technologies: ['AWS', 'CI/CD', 'Elastic Beanstalk', 'S3', 'EC2'],
    github: '#',
    demo: '#',
    icon: '☁️',
  },
  {
    id: 6,
    title: 'Code Review Automation',
    description: 'Developed automation tools for code reviews and quality assurance, reducing post-deployment bugs by 30%.',
    technologies: ['Git', 'CI/CD', 'Automation', 'JavaScript'],
    github: '#',
    demo: '#',
    icon: '🤖',
  }
];

const Projects = () => {
  return (
    <ProjectsContainer>
      <TerminalWindow title="visitor@portfolio:~/projects$">
        <Prompt>
          <Command>$</Command> ls -la
        </Prompt>
        
        <ProjectsGrid>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="tech-tags">
                {project.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              
              <h3>
                {project.title}
                <span className="project-icon">{project.icon}</span>
              </h3>
              
              <p>{project.description}</p>
              
              <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <FaGithub /> View Code
                </a>
                
                <a 
                  href={project.demo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="project-link"
                  style={{ marginLeft: '1rem' }}
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              </div>
            </ProjectCard>
          ))}
        </ProjectsGrid>
        
        <Prompt style={{ marginTop: '2rem' }}>
          <Command>$</Command> <span style={{ color: '#00FF00' }}>_</span>
        </Prompt>
      </TerminalWindow>
    </ProjectsContainer>
  );
};

export default Projects;
