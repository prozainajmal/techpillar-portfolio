import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Smartphone, Cloud, Brain } from 'lucide-react';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--gradient-background);
  padding: 128px 24px 64px;
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 900;
  line-height: 0.9;
  margin-bottom: 24px;
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 20px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
  max-width: 500px;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background: var(--gradient-primary);
  color: var(--text-inverse);
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px var(--shadow-colored);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: var(--primary-main);
  border: 2px solid var(--primary-main);
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-main);
    color: var(--text-inverse);
    transform: translateY(-2px);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  z-index: 2;
`;

const LogoContainer = styled(motion.div)`
  text-align: center;
  
  img {
    width: 100%;
    max-width: 400px;
    height: auto;
  }
`;

const FloatingIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const FloatingIcon = styled(motion.div)`
  position: absolute;
  color: var(--primary-light);
  opacity: 0.1;
  
  &:nth-child(1) {
    top: 20%;
    left: 10%;
  }
  
  &:nth-child(2) {
    top: 60%;
    right: 15%;
  }
  
  &:nth-child(3) {
    bottom: 30%;
    left: 20%;
  }
  
  &:nth-child(4) {
    top: 40%;
    right: 30%;
  }
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 64px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const StatItem = styled.div`
  text-align: center;
  
  .number {
    font-size: 36px;
    font-weight: 700;
    color: var(--primary-main);
    margin-bottom: 8px;
  }
  
  .label {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const Hero = () => {
  return (
    <HeroSection>
      <HeroContainer>
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Building
            <br />
            Digital
            <br />
            Excellence
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We transform businesses through cutting-edge technology solutions. 
            From web development to AI/ML, we're your partner in digital innovation.
          </HeroSubtitle>
          
          <HeroButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <PrimaryButton href="#services">Explore Services</PrimaryButton>
            <SecondaryButton href="#academy">Join Academy</SecondaryButton>
          </HeroButtons>
          
          <StatsContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <StatItem>
              <div className="number">500+</div>
              <div className="label">Projects Delivered</div>
            </StatItem>
            <StatItem>
              <div className="number">50+</div>
              <div className="label">Happy Clients</div>
            </StatItem>
            <StatItem>
              <div className="number">24/7</div>
              <div className="label">Support</div>
            </StatItem>
          </StatsContainer>
        </HeroContent>
        
        <HeroVisual>
          <LogoContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <img src="/assets/LOGO.png" alt="TechPillar Logo" />
          </LogoContainer>
          
          <FloatingIcons>
            <FloatingIcon
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Code size={40} />
            </FloatingIcon>
            <FloatingIcon
              animate={{ 
                y: [0, 20, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <Smartphone size={40} />
            </FloatingIcon>
            <FloatingIcon
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ 
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <Cloud size={40} />
            </FloatingIcon>
            <FloatingIcon
              animate={{ 
                y: [0, 25, 0],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            >
              <Brain size={40} />
            </FloatingIcon>
          </FloatingIcons>
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
