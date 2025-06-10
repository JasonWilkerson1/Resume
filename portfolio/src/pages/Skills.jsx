import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SkillsContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  padding-top: 2rem;
`;

const Section = styled(motion.section)`
  margin-bottom: 3rem;
  
  h2 {
    color: #00FF00;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #00FF00;
    padding-bottom: 0.5rem;
    display: inline-block;
  }
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const SkillItem = styled(motion.div)`
  background: rgba(0, 255, 0, 0.05);
  border: 1px solid #00FF00;
  padding: 1rem;
  border-radius: 4px;
  
  h3 {
    color: #00FFFF;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #00FF00;
    font-size: 0.9rem;
    margin: 0;
  }
`;

const skillsData = {
  languages: [
    { name: 'Python', level: 'Advanced', certified: true },
    { name: 'JavaScript/TypeScript', level: 'Advanced', certified: true },
    { name: 'Java', level: 'Advanced', certified: true },
    { name: 'C++', level: 'Intermediate' },
    { name: 'SQL', level: 'Advanced', certified: true },
    { name: 'HTML/CSS', level: 'Advanced' },
  ],
  frameworks: [
    { name: 'React', level: 'Advanced', certified: true },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Express', level: 'Advanced' },
    { name: 'AWS Services', level: 'Advanced', certified: true },
    { name: 'Docker', level: 'Intermediate' },
  ],
  cybersecurity: [
    { name: 'Network Security', certified: true },
    { name: 'Penetration Testing', certified: true },
    { name: 'Incident Response', certified: true },
    { name: 'Vulnerability Assessment', certified: true },
    { name: 'Security+ Certified', certified: true },
  ],
  tools: [
    { name: 'Git & GitHub', level: 'Advanced' },
    { name: 'AWS (S3, EC2, Lambda)', level: 'Advanced' },
    { name: 'Wireshark', level: 'Intermediate' },
    { name: 'MongoDB', level: 'Advanced' },
    { name: 'PostgreSQL', level: 'Intermediate' },
  ],
  certifications: [
    { name: 'CompTIA Security+ ce', year: '2024' },
    { name: 'Google Cybersecurity Certificate', year: '2024' },
    { name: 'Java HackerRank Certification', year: '2025' },
    { name: 'JavaScript HackerRank Certification', year: '2025' },
    { name: 'React Frontend Developer Certification', year: '2025' },
  ],
  softSkills: [
    'Problem Solving',
    'Team Leadership',
    'Technical Communication',
    'Agile Development',
    'Code Review',
    'Mentoring',
    'Project Coordination',
    'Technical Documentation',
  ],
};

const Skills = () => (
  <SkillsContainer>
    <h1>user@portfolio:~$ <span style={{ color: '#00FFFF' }}>cd skills</span></h1>
    
    <Section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Languages</h2>
      <SkillGrid>
        {skillsData.languages.map((skill, index) => (
          <SkillItem
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <h3>{skill.name}</h3>
            <p>Level: {skill.level}</p>
          </SkillItem>
        ))}
      </SkillGrid>
    </Section>
    
    <Section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2>Frameworks & Libraries</h2>
      <SkillGrid>
        {skillsData.frameworks.map((skill, index) => (
          <SkillItem
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <h3>{skill.name}</h3>
            <p>Level: {skill.level}</p>
          </SkillItem>
        ))}
      </SkillGrid>
    </Section>
    
    <Section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2>Tools & Technologies</h2>
      <SkillGrid>
        {skillsData.tools.map((skill, index) => (
          <SkillItem
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <h3>{skill.name}</h3>
            <p>Level: {skill.level}</p>
          </SkillItem>
        ))}
      </SkillGrid>
    </Section>
    
    <Section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2>Cybersecurity Skills</h2>
      <SkillGrid>
        {skillsData.cybersecurity.map((skill, index) => (
          <SkillItem
            key={skill.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <h3>{skill.name} {skill.certified && '✓'}</h3>
          </SkillItem>
        ))}
      </SkillGrid>
    </Section>

    <Section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2>Certifications</h2>
      <SkillGrid>
        {skillsData.certifications.map((cert, index) => (
          <SkillItem
            key={cert.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <h3>{cert.name}</h3>
            <p>Earned: {cert.year}</p>
          </SkillItem>
        ))}
      </SkillGrid>
    </Section>

    <Section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2>Soft Skills</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {skillsData.softSkills.map((skill, index) => (
          <motion.span
            key={skill}
            style={{
              background: 'rgba(0, 255, 0, 0.1)',
              color: '#00FF00',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              border: '1px solid #00FF00',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * index }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </Section>
  </SkillsContainer>
);

export default Skills;
