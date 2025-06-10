import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaTrophy, FaStar, FaAward, FaCertificate } from 'react-icons/fa';

const AchievementsContainer = styled.div`
  padding: 1rem 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  font-family: 'Fira Code', monospace;
  color: #00FF00;
  
  h1 {
    color: #00FF00;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    
    span {
      color: #00FFFF;
    }
  }
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AchievementCard = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid #00FF00;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 255, 0, 0.1);
  }
  
  .achievement-header {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    
    .icon {
      font-size: 2rem;
      margin-right: 1rem;
      color: #00FFFF;
    }
    
    .rank {
      font-size: 1.8rem;
      font-weight: bold;
      color: #FFD700;
      margin-right: 0.5rem;
    }
    
    .title {
      font-size: 1.1rem;
      color: #00FFFF;
      margin: 0;
    }
  }
  
  .platform {
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    color: #00FF00;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 255, 0, 0.2);
    
    &::before {
      content: 'Platform:';
      margin-right: 0.5rem;
      color: #00FFFF;
    }
  }
  
  .badge {
    display: inline-block;
    background: rgba(0, 255, 0, 0.1);
    color: #00FF00;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.75rem;
    border: 1px solid #00FF00;
    margin-top: 0.75rem;
    align-self: flex-start;
  }
`;

const achievementsData = [
  {
    id: 1,
    title: 'Master of Science in CS',
    rank: 'GPA: 4.0',
    platform: 'Georgia Institute of Technology',
    icon: <FaTrophy />,
    badge: '2025-2028',
  },
  {
    id: 2,
    title: 'Bachelor of Science in CS',
    rank: 'Magna Cum Laude',
    platform: 'University of Mississippi',
    icon: <FaCertificate />,
    badge: '2021-2025',
  },
  {
    id: 3,
    title: 'CompTIA Security+ Certified',
    rank: '2024-2027',
    platform: 'CompTIA',
    icon: <FaAward />,
    badge: 'Cybersecurity',
  },
  {
    id: 4,
    title: 'Google Cybersecurity Certificate',
    rank: '2024',
    platform: 'Google',
    icon: <FaStar />,
    badge: 'Professional',
  },
  {
    id: 5,
    title: 'Java HackerRank Certification',
    rank: '2025',
    platform: 'HackerRank',
    icon: <FaStar />,
    badge: 'Advanced',
  },
  {
    id: 6,
    title: 'JavaScript HackerRank Certification',
    rank: '2025',
    platform: 'HackerRank',
    icon: <FaStar />,
    badge: 'Advanced',
  },
];

const Achievements = () => {
  return (
    <AchievementsContainer>
      <h1>visitor@security-portfolio:~$ <span>ls ./achievements</span></h1>
      
      <AchievementsGrid>
        {achievementsData.map((achievement, index) => (
          <AchievementCard
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="achievement-header">
              <div className="icon">
                {achievement.icon}
              </div>
              <div>
                <div className="rank">{achievement.rank}</div>
                <h3 className="title">{achievement.title}</h3>
              </div>
            </div>
            
            <div className="platform">
              {achievement.platform}
            </div>
            
            <span className="badge">
              {achievement.badge}
            </span>
          </AchievementCard>
        ))}
      </AchievementsGrid>
      
      <motion.p
        style={{ color: '#00FF00', marginTop: '2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        visitor@security-portfolio:~$ <span>cd ..</span>
      </motion.p>
    </AchievementsContainer>
  );
};

export default Achievements;
