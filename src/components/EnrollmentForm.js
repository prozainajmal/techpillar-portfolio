import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Mail, MapPin, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { sendEnrollmentEmail } from '../services/emailService';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const Modal = styled(motion.div)`
  background: white;
  border-radius: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ModalHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 32px 32px 24px;
  border-radius: 24px 24px 0 0;
  text-align: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const HeaderTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeaderSubtitle = styled.p`
  font-size: 16px;
  margin: 0;
  opacity: 0.9;
  font-weight: 300;
`;

const CourseBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  margin-top: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const FormContainer = styled.div`
  padding: 32px;
  
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
  font-size: 14px;
  
  .required {
    color: #ef4444;
    margin-left: 4px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8fafc;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #ef4444;
    background: #fef2f2;
  }
  
  &.success {
    border-color: #10b981;
    background: #f0fdf4;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8fafc;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #ef4444;
    background: #fef2f2;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8fafc;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &.error {
    border-color: #ef4444;
    background: #fef2f2;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SuccessMessage = styled.div`
  color: #10b981;
  font-size: 14px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 18px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  position: relative;
  overflow: hidden;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  .loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top: 2px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const FormFooter = styled.div`
  text-align: center;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 14px;
  
  a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const EnrollmentForm = ({ isOpen, onClose, courseTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: courseTitle || '',
    address: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.course.trim()) {
      newErrors.course = 'Please select a course';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us about your goals';
    } else if (formData.message.length < 20) {
      newErrors.message = 'Message should be at least 20 characters';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('loading');
    
    try {
      await sendEnrollmentEmail(formData);
      setSubmitStatus('success');
      setSubmitMessage('Enrollment form submitted successfully! We\'ll contact you soon.');
      
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: courseTitle || '',
          address: '',
          message: ''
        });
        setSubmitStatus(null);
        setSubmitMessage('');
        onClose();
      }, 3000);
      
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Failed to submit enrollment form. Please try again.');
      console.error('Enrollment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <Modal
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <CloseButton onClick={handleClose}>
                <X />
              </CloseButton>
              <HeaderTitle>Course Enrollment</HeaderTitle>
              <HeaderSubtitle>Join TechPillar Academy and start your journey</HeaderSubtitle>
              {courseTitle && (
                <CourseBadge>
                  📚 {courseTitle}
                </CourseBadge>
              )}
            </ModalHeader>
            
            <FormContainer>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>
                    Full Name <span className="required">*</span>
                  </Label>
                  <Input
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
                  <Label>
                    Phone Number <span className="required">*</span>
                  </Label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <ErrorMessage>
                      <AlertCircle size={16} />
                      {errors.phone}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>
                    Email Address <span className="required">*</span>
                  </Label>
                  <Input
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
                  <Label>
                    Course <span className="required">*</span>
                  </Label>
                  <Select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={errors.course ? 'error' : ''}
                  >
                    <option value="">-- Select a Course --</option>
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="MERN Stack Development">MERN Stack Development</option>
                    <option value="Graphic Design & Branding">Graphic Design & Branding</option>
                    <option value="Digital Marketing Mastery">Digital Marketing Mastery</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Python Programming">Python Programming</option>
                    <option value="Java Development">Java Development</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                  </Select>
                  {errors.course && (
                    <ErrorMessage>
                      <AlertCircle size={16} />
                      {errors.course}
                    </ErrorMessage>
                  )}
                </FormGroup>

                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your address (optional)"
                  />
                </FormGroup>

                <FormGroup>
                  <Label>
                    Your Goals & Expectations <span className="required">*</span>
                  </Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your career goals, why you want to join this course, and what you hope to achieve..."
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && (
                    <ErrorMessage>
                      <AlertCircle size={16} />
                      {errors.message}
                    </ErrorMessage>
                  )}
                </FormGroup>

                {submitStatus === 'success' && (
                  <SuccessMessage>
                    <CheckCircle size={16} />
                    {submitMessage}
                  </SuccessMessage>
                )}

                {submitStatus === 'error' && (
                  <ErrorMessage>
                    <AlertCircle size={16} />
                    {submitMessage}
                  </ErrorMessage>
                )}

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <span className="loading">
                      <span className="spinner"></span>
                      Submitting...
                    </span>
                  ) : (
                    'Submit Enrollment'
                  )}
                </SubmitButton>
              </form>
              
              <FormFooter>
                <p>
                  By submitting this form, you agree to our{' '}
                  <a href="#terms">Terms of Service</a> and{' '}
                  <a href="#privacy">Privacy Policy</a>
                </p>
              </FormFooter>
            </FormContainer>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default EnrollmentForm;
