import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import GlitchButton from '../components/GlitchButton';

const ContactContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  min-height: calc(100vh - 100px);
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContactForm = styled(motion.form)`
  width: 100%;
  max-width: 600px;
  background: rgba(30, 30, 30, 0.8);
  border: 1px solid #00FF00;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    color: #00FF00;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid #00FF00;
    border-radius: 4px;
    color: #00FF00;
    font-family: 'Fira Code', monospace;
    font-size: 1rem;
    transition: all 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: #00FFFF;
      box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
    }
  }
  
  textarea {
    min-height: 150px;
    resize: vertical;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  
  a {
    color: #00FF00;
    font-size: 1.5rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #00FFFF;
      transform: translateY(-3px);
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid #00FF00;
  color: #00FF00;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <ContactContainer>
      <h1>user@portfolio:~$ <span style={{ color: '#00FFFF' }}>cd contact</span></h1>
      
      <ContactForm
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={{ color: '#00FFFF', textAlign: 'center', marginBottom: '2rem' }}>
          Get In Touch
        </h2>
        
        {isSuccess && (
          <SuccessMessage
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Thank you for your message! I'll get back to you soon.
          </SuccessMessage>
        )}
        
        <FormGroup>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />
        </FormGroup>
        
        <FormGroup>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Type your message here..."
          />
        </FormGroup>
        
        <div style={{ textAlign: 'center' }}>
          <GlitchButton
            type="submit"
            disabled={isSubmitting}
            style={{ minWidth: '200px' }}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </GlitchButton>
        </div>
      </ContactForm>
      
      <SocialLinks>
        <motion.a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="GitHub"
        >
          <i className="fab fa-github"></i>
        </motion.a>
        <motion.a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="LinkedIn"
        >
          <i className="fab fa-linkedin"></i>
        </motion.a>
        <motion.a
          href="https://twitter.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Twitter"
        >
          <i className="fab fa-twitter"></i>
        </motion.a>
        <motion.a
          href="mailto:your.email@example.com"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Email"
        >
          <i className="fas fa-envelope"></i>
        </motion.a>
      </SocialLinks>
      
      <motion.p 
        style={{ color: '#00FF00', marginTop: '2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        user@portfolio:~/contact$ <span style={{ color: '#00FFFF' }}>cd ..</span>
      </motion.p>
    </ContactContainer>
  );
};

export default Contact;
