import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Target, 
  Users, 
  Award, 
  Zap,
  CheckCircle,
  ArrowRight,
  Code,
  Cloud,
  TrendingUp,
  GraduationCap
} from 'lucide-react';

const AboutSection = styled.section`
  padding: 128px 24px;
  background: var(--gradient-background);
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(36px, 5vw, 48px);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const AboutContent = styled.div``;

const AboutText = styled.div``;

const AboutTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
  line-height: 1.2;
`;

const AboutDescription = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 32px;
`;

const AboutFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AboutFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  .icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: var(--gradient-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-inverse);
    flex-shrink: 0;
  }
  
  .content h4 {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 4px;
  }
  
  .content p {
    color: var(--text-secondary);
    font-size: 14px;
    line-height: 1.5;
  }
`;

const AboutVisual = styled.div`
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 20px 40px var(--shadow-medium);
  }
`;

const ValuesSection = styled.div`
  margin-bottom: 80px;
`;

const ValuesTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 48px;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
`;

const ValueCard = styled(motion.div)`
  background: var(--background-card);
  padding: 32px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px var(--shadow-medium);
    border-color: var(--primary-light);
  }
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: var(--text-inverse);
  
  svg {
    width: 40px;
    height: 40px;
  }
`;

const ValueTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
`;

const ValueDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const StatsSection = styled.div`
  background: var(--background-card);
  border-radius: 16px;
  padding: 64px;
  text-align: center;
  box-shadow: 0 10px 30px var(--shadow-light);
`;

const StatsTitle = styled.h3`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 48px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 48px;
`;

const StatItem = styled.div`
  .number {
    font-size: 48px;
    font-weight: 800;
    color: var(--primary-main);
    margin-bottom: 8px;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .label {
    font-size: 16px;
    color: var(--text-secondary);
    font-weight: 500;
  }
`;

const CTAButton = styled.button`
  background: var(--gradient-primary);
  color: var(--text-inverse);
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 32px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px var(--shadow-colored);
  }
`;

const values = [
  {
    icon: <Target />,
    title: "Innovation First",
    description: "We stay ahead of technology trends and embrace cutting-edge solutions to deliver exceptional results."
  },
  {
    icon: <Users />,
    title: "Client Partnership",
    description: "We build long-term relationships with our clients, understanding their business needs and goals."
  },
  {
    icon: <Award />,
    title: "Quality Excellence",
    description: "Every project is delivered with the highest standards of quality, performance, and reliability."
  },
  {
    icon: <Zap />,
    title: "Agile Delivery",
    description: "We use agile methodologies to ensure fast, efficient delivery while maintaining quality standards."
  }
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AboutSection id="about">
      <Container>
        <SectionHeader>
          <SectionTitle>About TechPillar</SectionTitle>
          <SectionSubtitle>
            We are a team of passionate technologists dedicated to transforming businesses through innovative digital solutions
          </SectionSubtitle>
        </SectionHeader>

        <AboutGrid>
          <AboutContent>
            <AboutText>
              <AboutTitle>Empowering Businesses Through Technology Innovation</AboutTitle>
              <AboutDescription>
                TechPillar is a leading technology solutions company that combines cutting-edge 
                development expertise with comprehensive digital marketing strategies. We specialize 
                in creating scalable software solutions, deploying cloud infrastructure, and 
                driving business growth through strategic digital marketing campaigns.
              </AboutDescription>
              
              <AboutFeatures>
                <AboutFeature>
                  <div className="icon">
                    <Code size={24} />
                  </div>
                  <div className="content">
                    <h4>Full-Stack Development</h4>
                    <p>End-to-end web and mobile application development using modern technologies and best practices.</p>
                  </div>
                </AboutFeature>
                
                <AboutFeature>
                  <div className="icon">
                    <Cloud size={24} />
                  </div>
                  <div className="content">
                    <h4>Cloud & DevOps</h4>
                    <p>Scalable cloud infrastructure, CI/CD pipelines, and automated deployment solutions.</p>
                  </div>
                </AboutFeature>
                
                <AboutFeature>
                  <div className="icon">
                    <TrendingUp size={24} />
                  </div>
                  <div className="content">
                    <h4>Digital Marketing</h4>
                    <p>Comprehensive digital marketing strategies including SEO, PPC, social media, and content marketing.</p>
                  </div>
                </AboutFeature>
                
                <AboutFeature>
                  <div className="icon">
                    <GraduationCap size={24} />
                  </div>
                  <div className="content">
                    <h4>Skill Development</h4>
                    <p>Professional training programs in software development, design, and digital marketing through our academy.</p>
                  </div>
                </AboutFeature>
              </AboutFeatures>
            </AboutText>
          </AboutContent>
          
          <AboutVisual>
            <motion.img
              src="/assets/LOGO.png"
              alt="TechPillar Team"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </AboutVisual>
        </AboutGrid>

        <ValuesSection>
          <ValuesTitle>Our Core Values</ValuesTitle>
          <ValuesGrid
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <ValueCard
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <ValueIcon>
                  {value.icon}
                </ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </ValuesSection>

        <StatsSection>
          <StatsTitle>Why Choose TechPillar?</StatsTitle>
          <StatsGrid>
            <StatItem>
              <div className="number">10+</div>
              <div className="label">Years Experience</div>
            </StatItem>
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
              <div className="label">Support Available</div>
            </StatItem>
          </StatsGrid>
          
          <CTAButton>
            Learn More About Us
            <ArrowRight size={20} />
          </CTAButton>
        </StatsSection>
      </Container>
    </AboutSection>
  );
};

export default About;
