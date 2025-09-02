import React from 'react';
import styled from 'styled-components';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github,
  ArrowUp
} from 'lucide-react';

const FooterContainer = styled.footer`
  background: var(--background-footer);
  color: var(--text-inverse);
  padding: 80px 24px 40px;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 64px;
  margin-bottom: 64px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const CompanyInfo = styled.div`
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    
    img {
      height: 40px;
      width: auto;
    }
    
    span {
      font-size: 24px;
      font-weight: 700;
      background: var(--gradient-secondary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  .description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 24px;
    max-width: 400px;
  }
  
  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: var(--text-secondary);
    font-size: 14px;
    
    svg {
      color: var(--primary-light);
      width: 16px;
      height: 16px;
    }
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-inverse);
    margin-bottom: 24px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 30px;
      height: 2px;
      background: var(--gradient-secondary);
    }
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 12px;
  }
  
  a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 14px;
    
    &:hover {
      color: var(--primary-light);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(96, 165, 250, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-light);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-light);
    color: var(--text-inverse);
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid var(--border-primary);
  padding-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
`;

const Copyright = styled.p`
  color: var(--text-secondary);
  font-size: 14px;
`;

const BackToTop = styled.button`
  background: var(--gradient-secondary);
  color: var(--text-inverse);
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px var(--shadow-colored);
  }
`;

const NewsletterSection = styled.div`
  background: rgba(96, 165, 250, 0.1);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 64px;
  text-align: center;
`;

const NewsletterTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-inverse);
  margin-bottom: 16px;
`;

const NewsletterDescription = styled.p`
  color: var(--text-secondary);
  margin-bottom: 24px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 16px;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 2px solid var(--border-primary);
  border-radius: 8px;
  background: var(--background-secondary);
  color: var(--text-primary);
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const NewsletterButton = styled.button`
  background: var(--gradient-secondary);
  color: var(--text-inverse);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px var(--shadow-colored);
  }
`;

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <FooterContainer>
      <Container>
        <NewsletterSection>
          <NewsletterTitle>Stay Updated with TechPillar</NewsletterTitle>
          <NewsletterDescription>
            Get the latest insights on technology trends, industry updates, and exclusive offers delivered to your inbox.
          </NewsletterDescription>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email address"
              required
            />
            <NewsletterButton type="submit">Subscribe</NewsletterButton>
          </NewsletterForm>
        </NewsletterSection>

        <FooterTop>
          <CompanyInfo>
            <div className="logo">
              <img src="/assets/LOGO.png" alt="TechPillar" />
              <span>TechPillar</span>
            </div>
            <p className="description">
              Empowering businesses through innovative technology solutions. 
              We transform ideas into digital reality with cutting-edge development and strategic consulting.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <Mail />
                hello@techpillar.com
              </div>
              <div className="contact-item">
                <Phone />
                +1 (555) 123-4567
              </div>
              <div className="contact-item">
                <MapPin />
                Silicon Valley, CA
              </div>
            </div>
          </CompanyInfo>

          <FooterSection>
            <h3>Services</h3>
            <a href="#services">Web Development</a>
            <a href="#services">Mobile Development</a>
            <a href="#services">AI/ML Solutions</a>
            <a href="#services">Cloud & DevOps</a>
            <a href="#services">Digital Marketing</a>
            <a href="#services">Database Solutions</a>
          </FooterSection>

          <FooterSection>
            <h3>Academy</h3>
            <a href="#academy">Software Development</a>
            <a href="#academy">Design & Marketing</a>
            <a href="#academy">Programming Courses</a>
            <a href="#academy">Certification</a>
            <a href="#academy">Corporate Training</a>
            <a href="#academy">Student Resources</a>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <a href="#academy">Academy</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </FooterSection>

          <FooterSection>
            <h3>Connect</h3>
            <ul>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#github">GitHub</a></li>
              <li><a href="#youtube">YouTube</a></li>
            </ul>
            
            <SocialLinks>
              <SocialLink href="#linkedin" aria-label="LinkedIn">
                <Linkedin size={20} />
              </SocialLink>
              <SocialLink href="#twitter" aria-label="Twitter">
                <Twitter size={20} />
              </SocialLink>
              <SocialLink href="#facebook" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
              <SocialLink href="#instagram" aria-label="Instagram">
                <Instagram size={20} />
              </SocialLink>
              <SocialLink href="#github" aria-label="GitHub">
                <Github size={20} />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © 2024 TechPillar. All rights reserved. | Privacy Policy | Terms of Service
          </Copyright>
          
          <BackToTop onClick={scrollToTop} aria-label="Back to top">
            <ArrowUp size={20} />
          </BackToTop>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
