import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from 'lucide-react';

const ContactSection = styled.section`
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

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const ContactForm = styled.div`
  background: var(--background-card);
  padding: 48px;
  border-radius: 16px;
  box-shadow: 0 10px 30px var(--shadow-light);
`;

const FormTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 32px;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const FormLabel = styled.label`
  display: block;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 14px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 2px solid var(--border-primary);
  border-radius: 8px;
  font-size: 16px;
  background: var(--background-secondary);
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 2px solid var(--border-primary);
  border-radius: 8px;
  font-size: 16px;
  min-height: 120px;
  resize: vertical;
  background: var(--background-secondary);
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;

const SubmitButton = styled.button`
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
  width: 100%;
  justify-content: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px var(--shadow-colored);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InfoCard = styled.div`
  background: var(--background-card);
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0 10px 30px var(--shadow-light);
  border: 1px solid var(--border-primary);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px var(--shadow-medium);
    border-color: var(--primary-light);
  }
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const InfoIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const InfoTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
`;

const InfoContent = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
`;

const SuccessMessage = styled(motion.div)`
  background: var(--success);
  color: var(--text-inverse);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
`;

const ContactCTA = styled.div`
  background: var(--background-card);
  border-radius: 16px;
  padding: 64px;
  text-align: center;
  box-shadow: 0 10px 30px var(--shadow-light);
`;

const CTATitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
`;

const CTADescription = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
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
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px var(--shadow-colored);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    }, 5000);
  };

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
    <ContactSection id="contact">
      <Container>
        <SectionHeader>
          <SectionTitle>Get In Touch</SectionTitle>
          <SectionSubtitle>
            Ready to start your digital transformation journey? Let's discuss how we can help your business grow
          </SectionSubtitle>
        </SectionHeader>

        <ContactGrid
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <ContactForm variants={itemVariants}>
            <FormTitle>Send us a message</FormTitle>
            
            {isSubmitted && (
              <SuccessMessage
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CheckCircle size={20} />
                Thank you! Your message has been sent successfully.
              </SuccessMessage>
            )}
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Full Name *</FormLabel>
                <FormInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email Address *</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Company</FormLabel>
                <FormInput
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Service Interest</FormLabel>
                <FormInput
                  type="text"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  placeholder="What service are you interested in?"
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Message *</FormLabel>
                <FormTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or requirements"
                  required
                />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </SubmitButton>
            </form>
          </ContactForm>
          
          <ContactInfo variants={itemVariants}>
            <InfoCard>
              <InfoHeader>
                <InfoIcon>
                  <Mail />
                </InfoIcon>
                <InfoTitle>Email Us</InfoTitle>
              </InfoHeader>
              <InfoContent>
                <p>hello@techpillar.com</p>
                <p>support@techpillar.com</p>
              </InfoContent>
            </InfoCard>
            
            <InfoCard>
              <InfoHeader>
                <InfoIcon>
                  <Phone />
                </InfoIcon>
                <InfoTitle>Call Us</InfoTitle>
              </InfoHeader>
              <InfoContent>
                <p>+1 (555) 123-4567</p>
                <p>+1 (555) 987-6543</p>
              </InfoContent>
            </InfoCard>
            
            <InfoCard>
              <InfoHeader>
                <InfoIcon>
                  <MapPin />
                </InfoIcon>
                <InfoTitle>Visit Us</InfoTitle>
              </InfoHeader>
              <InfoContent>
                <p>123 Tech Street</p>
                <p>Silicon Valley, CA 94025</p>
                <p>United States</p>
              </InfoContent>
            </InfoCard>
            
            <InfoCard>
              <InfoHeader>
                <InfoIcon>
                  <Clock />
                </InfoIcon>
                <InfoTitle>Business Hours</InfoTitle>
              </InfoHeader>
              <InfoContent>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </InfoContent>
            </InfoCard>
          </ContactInfo>
        </ContactGrid>

        <ContactCTA
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <CTATitle>Ready to Start Your Project?</CTATitle>
          <CTADescription>
            Let's discuss your ideas and turn them into reality. Our team is ready to help you build something amazing.
          </CTADescription>
          <CTAButton>Schedule a Free Consultation</CTAButton>
        </ContactCTA>
      </Container>
    </ContactSection>
  );
};

export default Contact;
