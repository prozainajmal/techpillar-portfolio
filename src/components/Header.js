import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--background-header);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-primary);
  transition: all 0.3s ease;
  height: 100px;
  
  @media (max-width: 768px) {
    height: 80px;
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  
  img {
    height: 60px;
    width: auto;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
    
    @media (max-width: 768px) {
      height: 50px;
    }
  }
  
  .logo-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .company-name {
    font-size: 28px;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
    line-height: 1;
    
    @media (max-width: 768px) {
      font-size: 24px;
    }
  }
  
  .company-tagline {
    font-size: 12px;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    @media (max-width: 768px) {
      font-size: 10px;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 40px;
  
  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 16px;
  transition: color 0.3s ease;
  position: relative;
  padding: 8px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    color: var(--primary-light);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gradient-primary);
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  
  @media (max-width: 768px) {
    gap: 16px;
  }
`;

const ThemeToggle = styled.button`
  background: var(--background-secondary);
  border: 2px solid var(--border-primary);
  color: var(--text-primary);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-light);
    color: var(--text-inverse);
    border-color: var(--primary-light);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px var(--shadow-colored);
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const CTAButton = styled.button`
  background: var(--gradient-primary);
  color: var(--text-inverse);
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px var(--shadow-colored);
  }
  
  @media (max-width: 768px) {
    padding: 12px 20px;
    font-size: 14px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-primary);
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 2px solid var(--border-primary);
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--background-secondary);
    border-color: var(--primary-light);
  }
  
  @media (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  background: var(--background-header);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-primary);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  
  @media (min-width: 1025px) {
    display: none;
  }
  
  @media (max-width: 768px) {
    top: 80px;
    padding: 24px;
  }
`;

const MobileNav = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MobileNavItem = styled.li``;

const MobileNavLink = styled.a`
  display: block;
  padding: 16px 0;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid var(--border-primary);
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-light);
  }
`;

const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-primary);
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer style={{ 
      background: isScrolled ? 'var(--background-header)' : 'var(--background-header)',
      boxShadow: isScrolled ? '0 4px 20px var(--shadow-medium)' : 'none'
    }}>
      <HeaderContent>
        <LogoSection>
          <Logo>
            <img src="/assets/LOGO.png" alt="TechPillar" />
            <div className="logo-text">
              <div className="company-name">TechPillar</div>
              <div className="company-tagline">Technology Solutions</div>
            </div>
          </Logo>
        </LogoSection>
        
        <Navigation>
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#academy">Academy</NavLink>
          <NavLink href="#portfolio">Portfolio</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </Navigation>
        
        <HeaderActions>
          <ThemeToggle onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </ThemeToggle>
          
          <CTAButton onClick={() => scrollToSection('contact')}>
            Get Quote
          </CTAButton>
          
          <MobileMenuButton onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </HeaderActions>
      </HeaderContent>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNav>
              <MobileNavItem>
                <MobileNavLink href="#services" onClick={() => scrollToSection('services')}>
                  Services
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink href="#about" onClick={() => scrollToSection('about')}>
                  About
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink href="#portfolio" onClick={() => scrollToSection('portfolio')}>
                  Portfolio
                </MobileNavLink>
              </MobileNavItem>
              <MobileNavItem>
                <MobileNavLink href="#contact" onClick={() => scrollToSection('contact')}>
                  Contact
                </MobileNavLink>
              </MobileNavItem>
            </MobileNav>
            
            <MobileActions>
              <CTAButton onClick={() => scrollToSection('contact')}>
                Get Quote
              </CTAButton>
            </MobileActions>
          </MobileMenu>
        )}
      </AnimatePresence>
    </HeaderContainer>
  );
};

export default Header;
