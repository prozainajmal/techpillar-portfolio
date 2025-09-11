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
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { sendContactFormEmail } from '../services/emailService';

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
  
  &.error {
    border-color: var(--error);
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
  
  &.error {
    border-color: var(--error);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 16px;
  border: 2px solid var(--border-primary);
  border-radius: 8px;
  font-size: 16px;
  background: var(--background-secondary);
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
  }
  
  option {
    background: var(--background-secondary);
    color: var(--text-primary);
    padding: 8px;
  }
  
  &.error {
    border-color: var(--error);
  }
`;

const PhoneInputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: stretch;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0;
  }
`;

const CountrySelect = styled.select`
  min-width: 120px;
  padding: 16px;
  border: 2px solid var(--border-primary);
  border-right: 1px solid var(--border-primary);
  border-radius: 8px 0 0 8px;
  font-size: 16px;
  background: var(--background-secondary);
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
    border-right-color: var(--border-primary);
  }
  
  option {
    background: var(--background-secondary);
    color: var(--text-primary);
    padding: 8px;
  }
  
  &.error {
    border-color: var(--error);
    border-right-color: var(--error);
  }
  
  @media (max-width: 480px) {
    border-radius: 8px 8px 0 0;
    border-right: 2px solid var(--border-primary);
    border-bottom: 1px solid var(--border-primary);
    min-width: 100%;
    
    &.error {
      border-bottom-color: var(--error);
    }
  }
`;

const PhoneNumberInput = styled.input`
  flex: 1;
  padding: 16px;
  border: 2px solid var(--border-primary);
  border-left: 1px solid var(--border-primary);
  border-radius: 0 8px 8px 0;
  font-size: 16px;
  background: var(--background-secondary);
  color: var(--text-primary);
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-light);
    border-left-color: var(--border-primary);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &.error {
    border-color: var(--error);
    border-left-color: var(--error);
  }
  
  @media (max-width: 480px) {
    border-left: 2px solid var(--border-primary);
    border-top: 1px solid var(--border-primary);
    border-radius: 0 0 8px 8px;
    
    &.error {
      border-top-color: var(--error);
    }
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

const ErrorMessage = styled.div`
  color: var(--error);
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ErrorAlert = styled(motion.div)`
  background: var(--error);
  color: var(--text-inverse);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
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

// Service options for dropdown
const serviceOptions = [
  { value: '', label: 'Select a service...' },
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'ai-ml-solutions', label: 'AI/ML Solutions' },
  { value: 'cloud-devops', label: 'Cloud & DevOps' },
  { value: 'database-solutions', label: 'Database Solutions' },
  { value: 'security-testing', label: 'Security & Testing' },
  { value: 'seo-sem', label: 'SEO & SEM' },
  { value: 'social-media-marketing', label: 'Social Media Marketing' },
  { value: 'email-marketing', label: 'Email Marketing' },
  { value: 'content-marketing', label: 'Content Marketing' },
  { value: 'ppc-display', label: 'PPC & Display Advertising' },
  { value: 'analytics-reporting', label: 'Analytics & Reporting' },
  { value: 'custom-solution', label: 'Custom Solution' }
];

// Country codes for phone number picker
const countryCodes = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+358', country: 'Finland', flag: '🇫🇮' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+974', country: 'Qatar', flag: '🇶🇦' },
  { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '+968', country: 'Oman', flag: '🇴🇲' }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    company: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const sendEmail = async (formData) => {
    try {
      // Use the professional email service
      const result = await sendContactFormEmail(formData, serviceOptions);
      
      if (result.success) {
        console.log('✅ Email sent successfully:', result.message);
        return true;
      } else {
        throw new Error('Email service returned an error');
      }
    } catch (error) {
      console.error('❌ Error sending email:', error);
      throw new Error('Failed to send email. Please try again or contact us directly.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await sendEmail(formData);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        countryCode: '+91',
        company: '',
        service: '',
        message: ''
      });
      setErrors({});
      
      // Reset success message after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 8000);
      
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
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
                Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
              </SuccessMessage>
            )}
            
            {submitError && (
              <ErrorAlert
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={20} />
                {submitError}
              </ErrorAlert>
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
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <ErrorMessage>
                    <AlertCircle size={16} />
                    {errors.name}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Email Address *</FormLabel>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <ErrorMessage>
                    <AlertCircle size={16} />
                    {errors.email}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Phone Number *</FormLabel>
                <PhoneInputContainer>
                  <CountrySelect
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.flag} {country.code}
                      </option>
                    ))}
                  </CountrySelect>
                  <PhoneNumberInput
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={errors.phone ? 'error' : ''}
                  />
                </PhoneInputContainer>
                {errors.phone && (
                  <ErrorMessage>
                    <AlertCircle size={16} />
                    {errors.phone}
                  </ErrorMessage>
                )}
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
                <FormLabel>Service Interest *</FormLabel>
                <FormSelect
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className={errors.service ? 'error' : ''}
                >
                  {serviceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </FormSelect>
                {errors.service && (
                  <ErrorMessage>
                    <AlertCircle size={16} />
                    {errors.service}
                  </ErrorMessage>
                )}
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Message *</FormLabel>
                <FormTextarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or requirements"
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && (
                  <ErrorMessage>
                    <AlertCircle size={16} />
                    {errors.message}
                  </ErrorMessage>
                )}
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
                <p>techpillaracademy@gmail.com</p>
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
                <p>9119109980</p>
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
                <p>TechPillar IT Solutions</p>
                <p>Jawahar Market, General Sagat Singh Marg</p>
                <p>Near NBC Hasanpura, Jaipur</p>
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
                <p>Monday - Sunday: 9:00 AM - 8:00 PM</p>
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
