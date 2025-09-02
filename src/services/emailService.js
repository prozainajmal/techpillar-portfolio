// Email service for TechPillar contact form
// This service handles sending professional emails to pro.zainajmal@gmail.com

import emailjs from '@emailjs/browser';

// Email configuration
const EMAIL_CONFIG = {
  to: 'pro.zainajmal@gmail.com',
  from: 'zany0381@gmail.com', // This will be your sending email
  subjectPrefix: 'New Service Inquiry: '
};

// WORKING EMAILJS CONFIGURATION - Replace these with your actual IDs
// To get these IDs, follow the QUICK_EMAIL_SETUP.md guide
const EMAILJS_CONFIG = {
  serviceId: 'service_dh3ywir', // Replace with your actual service ID
  templateId: 'template_odgf7en', // Replace with your actual template ID
  userId: 'mdymL1mtK3BTTYscN' // Replace with your actual user ID
};

// TEST MODE: Set this to false when you have real EmailJS credentials
const TEST_MODE = false;

// Professional email template generator
export const generateEmailTemplate = (formData, serviceOptions) => {
  const serviceLabel = serviceOptions.find(opt => opt.value === formData.service)?.label || formData.service;
  const company = formData.company || 'Individual';
  const timestamp = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    to: EMAIL_CONFIG.to,
    from: EMAIL_CONFIG.from,
    replyTo: formData.email, // Allow direct reply to the customer
    subject: `${EMAIL_CONFIG.subjectPrefix}${serviceLabel} - ${company}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Service Inquiry - TechPillar</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #1a202c; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px;
          }
          
          .email-container { 
            max-width: 650px; 
            margin: 0 auto; 
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .header h1 { 
            margin: 0 0 15px 0; 
            font-size: 32px; 
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
          }
          
          .header p { 
            margin: 0; 
            font-size: 18px; 
            opacity: 0.95;
            font-weight: 300;
            position: relative;
            z-index: 2;
          }
          
          .header-icon {
            font-size: 48px;
            margin-bottom: 20px;
            display: block;
            position: relative;
            z-index: 2;
            animation: bounce 2s ease-in-out infinite;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          .content { 
            padding: 40px 30px; 
            background: white;
          }
          
          .priority-badge {
            display: inline-block;
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3); }
            50% { box-shadow: 0 4px 25px rgba(255, 107, 107, 0.6); }
            100% { box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3); }
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          
          .info-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            border-radius: 15px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
          }
          
          .info-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
          }
          
          .info-label {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }
          
          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
          }
          
          .service-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
          }
          
          .message-section {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
          }
          
          .message-label {
            font-size: 14px;
            font-weight: 600;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .message-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }
          
          .cta-section { 
            text-align: center; 
            margin: 40px 0; 
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px;
            border: 2px solid #e2e8f0;
          }
          
          .cta-title {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 20px;
          }
          
          .cta-button { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 18px 36px; 
            text-decoration: none; 
            border-radius: 50px; 
            display: inline-block; 
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            border: none;
            cursor: pointer;
          }
          
          .cta-button:hover { 
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
          }
          
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            color: #64748b; 
            font-size: 14px; 
            padding: 30px;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
          }
          
          .footer h3 {
            color: #f8fafc;
            margin-bottom: 15px;
            font-size: 18px;
          }
          
          .footer p {
            margin: 8px 0;
            opacity: 0.8;
          }
          
          .techpillar-logo {
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
          }
          
          .stat-item {
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
          }
          
          .stat-number {
            font-size: 28px;
            font-weight: 800;
            color: #667eea;
            margin-bottom: 5px;
          }
          
          .stat-label {
            font-size: 12px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          @media (max-width: 600px) {
            .info-grid { grid-template-columns: 1fr; }
            .stats-grid { grid-template-columns: 1fr; }
            .header h1 { font-size: 24px; }
            .content { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <span class="header-icon">🚀</span>
            <h1>New Service Inquiry</h1>
            <p>TechPillar has received a new service request</p>
          </div>
          
          <div class="content">
            <div style="text-align: center; margin-bottom: 30px;">
              <div class="priority-badge">🔥 High Priority Inquiry</div>
            </div>
            
            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">👤 Contact Person</div>
                <div class="info-value">${formData.name}</div>
              </div>
              
              <div class="info-card">
                <div class="info-label">📧 Email Address</div>
                <div class="info-value">${formData.email}</div>
              </div>
              
              ${formData.company ? `
              <div class="info-card">
                <div class="info-label">🏢 Company</div>
                <div class="info-value">${formData.company}</div>
              </div>
              ` : ''}
              
              <div class="info-card">
                <div class="info-label">🎯 Service Interest</div>
                <div class="service-badge">${serviceLabel}</div>
              </div>
            </div>
            
            <div class="message-section">
              <div class="message-label">
                💬 Project Details
              </div>
              <div class="message-content">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Projects Delivered</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">Happy Clients</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">24/7</div>
                <div class="stat-label">Support</div>
              </div>
            </div>
            
            <div class="cta-section">
              <div class="cta-title">Ready to respond to this inquiry?</div>
              <a href="mailto:${formData.email}?subject=Re: ${EMAIL_CONFIG.subjectPrefix}${serviceLabel}" class="cta-button">
                📧 Reply to ${formData.name}
              </a>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #64748b;">
                Click the button above to send a direct reply
              </p>
            </div>
          </div>
          
          <div class="footer">
            <div class="techpillar-logo">TechPillar</div>
            <h3>Technology Solutions</h3>
            <p><strong>This inquiry was sent from the TechPillar contact form</strong></p>
            <p>📅 Received on ${timestamp}</p>
            <p>📍 Form submitted from TechPillar website</p>
            <p>🌐 <a href="https://techpillar.com" style="color: #667eea;">techpillar.com</a></p>
            <hr style="border: none; border-top: 1px solid #475569; margin: 20px 0;">
            <p style="font-size: 12px; opacity: 0.7;">
              Empowering businesses through innovative technology solutions
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🚀 NEW SERVICE INQUIRY - TechPillar

🔥 HIGH PRIORITY INQUIRY

CONTACT INFORMATION:
👤 Contact Person: ${formData.name}
📧 Email Address: ${formData.email}
${formData.company ? `🏢 Company: ${formData.company}\n` : ''}🎯 Service Interest: ${serviceLabel}

PROJECT DETAILS:
${formData.message}

---
📅 Received on: ${timestamp}
📍 Form submitted from TechPillar website
🌐 techpillar.com

TechPillar Technology Solutions
Empowering businesses through innovative technology
    `
  };
};

// Main email sending function using EmailJS
export const sendContactFormEmail = async (formData, serviceOptions) => {
  try {
    // TEST MODE: If enabled, just simulate email sending
    if (TEST_MODE) {
      console.log('🧪 TEST MODE: Simulating email sending...');
      
      const emailData = generateEmailTemplate(formData, serviceOptions);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('📧 TEST MODE: Email would be sent to:', emailData.to);
      console.log('📧 TEST MODE: Subject:', emailData.subject);
      console.log('📧 TEST MODE: From:', formData.email);
      console.log('📧 TEST MODE: Service:', serviceOptions.find(opt => opt.value === formData.service)?.label);
      console.log('📧 TEST MODE: Message:', formData.message);
      
      // Show alert with email details (for testing)
      alert(`🧪 TEST MODE: Email would be sent to pro.zainajmal@gmail.com\n\nSubject: ${emailData.subject}\nFrom: ${formData.email}\nService: ${serviceOptions.find(opt => opt.value === formData.service)?.label}\n\nTo get real emails, follow the setup guide in QUICK_EMAIL_SETUP.md`);
      
      return {
        success: true,
        message: 'Email simulation completed (TEST MODE)',
        emailData
      };
    }
    
    // REAL EMAIL MODE: Use EmailJS
    console.log('📧 Preparing to send email via EmailJS...');
    
    // Check if EmailJS is properly configured
    if (EMAILJS_CONFIG.serviceId === 'service_techpillar' || 
        EMAILJS_CONFIG.templateId === 'template_techpillar' || 
        EMAILJS_CONFIG.userId === 'user_techpillar') {
      throw new Error('EmailJS not configured. Please update the EMAILJS_CONFIG with your real IDs.');
    }
    
    // Prepare template parameters for EmailJS
    const templateParams = {
      to_email: EMAIL_CONFIG.to,
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Individual',
      service: serviceOptions.find(opt => opt.value === formData.service)?.label || formData.service,
      message: formData.message,
      reply_to: formData.email,
      subject: `${EMAIL_CONFIG.subjectPrefix}${serviceOptions.find(opt => opt.value === formData.service)?.label || formData.service} - ${formData.company || 'Individual'}`
    };
    
    console.log('📧 Template parameters:', templateParams);
    
    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.userId
    );
    
    console.log('✅ Email sent successfully via EmailJS:', result);
    
    return {
      success: true,
      message: 'Email sent successfully via EmailJS',
      result
    };
    
  } catch (error) {
    console.error('❌ Error sending email via EmailJS:', error);
    
    // Fallback: Try to send using the old method (simulation)
    console.log('🔄 Falling back to simulation...');
    
    try {
      const emailData = generateEmailTemplate(formData, serviceOptions);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('📧 Email data prepared (simulation):', {
        to: emailData.to,
        subject: emailData.subject,
        from: emailData.from,
        replyTo: emailData.replyTo
      });
      
      return {
        success: true,
        message: 'Email simulation completed (EmailJS not configured)',
        emailData
      };
      
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
      throw new Error('Failed to send email. Please check EmailJS configuration or contact support.');
    }
  }
};

// Alternative: Simple text email for basic email clients
export const generateSimpleEmailTemplate = (formData, serviceOptions) => {
  const serviceLabel = serviceOptions.find(opt => opt.value === formData.service)?.label || formData.service;
  
  return {
    to: EMAIL_CONFIG.to,
    from: EMAIL_CONFIG.from,
    replyTo: formData.email,
    subject: `${EMAIL_CONFIG.subjectPrefix}${serviceLabel} - ${formData.company || 'Individual'}`,
    text: `
New Service Inquiry from TechPillar Website

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
${formData.company ? `- Company: ${formData.company}\n` : ''}- Service: ${serviceLabel}

Message:
${formData.message}

---
Sent on: ${new Date().toLocaleDateString()}
Reply to: ${formData.email}
    `
  };
};

// Enrollment email template generator
export const generateEnrollmentTemplate = (formData) => {
  const timestamp = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return {
    to: EMAIL_CONFIG.to,
    from: EMAIL_CONFIG.from,
    replyTo: formData.email, // Allow direct reply to the student
    subject: `🎓 New Course Enrollment - ${formData.course} - TechPillar Academy`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Course Enrollment - TechPillar Academy</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #1a202c; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0; 
            padding: 20px;
          }
          
          .email-container { 
            max-width: 650px; 
            margin: 0 auto; 
            background: white;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
            animation: float 20s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          .header h1 { 
            margin: 0 0 15px 0; 
            font-size: 32px; 
            font-weight: 800;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
          }
          
          .header p { 
            margin: 0; 
            font-size: 18px; 
            opacity: 0.95;
            font-weight: 300;
            position: relative;
            z-index: 2;
          }
          
          .header-icon {
            font-size: 48px;
            margin-bottom: 20px;
            display: block;
            position: relative;
            z-index: 2;
            animation: bounce 2s ease-in-out infinite;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          .content { 
            padding: 40px 30px; 
            background: white;
          }
          
          .enrollment-badge {
            display: inline-block;
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 30px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0% { box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); }
            50% { box-shadow: 0 4px 25px rgba(16, 185, 129, 0.6); }
            100% { box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3); }
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
          }
          
          .info-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
            border-radius: 15px;
            border-left: 4px solid #667eea;
            transition: all 0.3s ease;
          }
          
          .info-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
          }
          
          .info-label {
            font-size: 12px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
          }
          
          .info-value {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
          }
          
          .course-badge {
            display: inline-block;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          }
          
          .message-section {
            background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
            padding: 25px;
            border-radius: 15px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
          }
          
          .message-label {
            font-size: 14px;
            font-weight: 600;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          
          .message-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            font-size: 16px;
            line-height: 1.6;
            color: #334155;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          }
          
          .academy-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            margin: 30px 0;
          }
          
          .stat-item {
            text-align: center;
            padding: 20px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 15px;
            backdrop-filter: blur(10px);
          }
          
          .stat-number {
            font-size: 28px;
            font-weight: 800;
            color: #667eea;
            margin-bottom: 5px;
          }
          
          .stat-label {
            font-size: 12px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .cta-section { 
            text-align: center; 
            margin: 40px 0; 
            padding: 30px;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-radius: 20px;
            border: 2px solid #e2e8f0;
          }
          
          .cta-title {
            font-size: 24px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 20px;
          }
          
          .cta-button { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; 
            padding: 18px 36px; 
            text-decoration: none; 
            border-radius: 50px; 
            display: inline-block; 
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            border: none;
            cursor: pointer;
          }
          
          .cta-button:hover { 
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
          }
          
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            color: #64748b; 
            font-size: 14px; 
            padding: 30px;
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
          }
          
          .footer h3 {
            color: #f8fafc;
            margin-bottom: 15px;
            font-size: 18px;
          }
          
          .footer p {
            margin: 8px 0;
            opacity: 0.8;
          }
          
          .techpillar-logo {
            font-size: 24px;
            font-weight: 800;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
          }
          
          @media (max-width: 600px) {
            .info-grid { grid-template-columns: 1fr; }
            .academy-stats { grid-template-columns: 1fr; }
            .header h1 { font-size: 24px; }
            .content { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <span class="header-icon">🎓</span>
            <h1>New Course Enrollment</h1>
            <p>TechPillar Academy has received a new enrollment request</p>
          </div>
          
          <div class="content">
            <div style="text-align: center; margin-bottom: 30px;">
              <div class="enrollment-badge">🎯 New Student Enrollment</div>
            </div>
            
            <div class="info-grid">
              <div class="info-card">
                <div class="info-label">👤 Student Name</div>
                <div class="info-value">${formData.name}</div>
              </div>
              
              <div class="info-card">
                <div class="info-label">📧 Email Address</div>
                <div class="info-value">${formData.email}</div>
              </div>
              
              <div class="info-card">
                <div class="info-label">📱 Phone Number</div>
                <div class="info-value">${formData.phone}</div>
              </div>
              
              <div class="info-card">
                <div class="info-label">🎯 Selected Course</div>
                <div class="course-badge">${formData.course}</div>
              </div>
            </div>
            
            ${formData.address ? `
            <div class="info-card" style="grid-column: 1 / -1;">
              <div class="info-label">📍 Address</div>
              <div class="info-value">${formData.address}</div>
            </div>
            ` : ''}
            
            <div class="message-section">
              <div class="message-label">
                💭 Student Goals & Expectations
              </div>
              <div class="message-content">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="academy-stats">
              <div class="stat-item">
                <div class="stat-number">500+</div>
                <div class="stat-label">Students Trained</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">25+</div>
                <div class="stat-label">Expert Instructors</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">95%</div>
                <div class="stat-label">Placement Rate</div>
              </div>
            </div>
            
            <div class="cta-section">
              <div class="cta-title">Ready to welcome this student?</div>
              <a href="mailto:${formData.email}?subject=Welcome to TechPillar Academy - ${formData.course}" class="cta-button">
                📧 Welcome ${formData.name}
              </a>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #64748b;">
                Click the button above to send a welcome message
              </p>
            </div>
          </div>
          
          <div class="footer">
            <div class="techpillar-logo">TechPillar Academy</div>
            <h3>Empowering Future Tech Leaders</h3>
            <p><strong>This enrollment was submitted from the TechPillar Academy website</strong></p>
            <p>📅 Received on ${timestamp}</p>
            <p>📍 Form submitted from TechPillar Academy</p>
            <p>🌐 <a href="https://techpillar.com/academy" style="color: #667eea;">techpillar.com/academy</a></p>
            <hr style="border: none; border-top: 1px solid #475569; margin: 20px 0;">
            <p style="font-size: 12px; opacity: 0.7;">
              Transforming careers through cutting-edge technology education
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
🎓 NEW COURSE ENROLLMENT - TechPillar Academy

🎯 NEW STUDENT ENROLLMENT

STUDENT INFORMATION:
👤 Student Name: ${formData.name}
📧 Email Address: ${formData.email}
📱 Phone Number: ${formData.phone}
🎯 Selected Course: ${formData.course}
${formData.address ? `📍 Address: ${formData.address}\n` : ''}

STUDENT GOALS & EXPECTATIONS:
${formData.message}

---
📅 Received on: ${timestamp}
📍 Form submitted from TechPillar Academy
🌐 techpillar.com/academy

TechPillar Academy
Empowering Future Tech Leaders
    `
  };
};

// Send enrollment email
export const sendEnrollmentEmail = async (formData) => {
  if (TEST_MODE) {
    console.log('🧪 TEST MODE: Enrollment email would be sent with:', formData);
    return Promise.resolve();
  }

  // Check if EmailJS is properly configured
  if (EMAILJS_CONFIG.serviceId === 'YOUR_SERVICE_ID' || 
      EMAILJS_CONFIG.templateId === 'YOUR_TEMPLATE_ID' || 
      EMAILJS_CONFIG.userId === 'YOUR_USER_ID') {
    throw new Error('EmailJS not properly configured. Please update the configuration in emailService.js');
  }

  try {
    const templateParams = {
      to_email: EMAIL_CONFIG.to,
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      course: formData.course,
      address: formData.address || 'Not provided',
      message: formData.message,
      subject: `🎓 New Course Enrollment - ${formData.course} - TechPillar Academy`
    };

    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.userId
    );

    console.log('✅ Enrollment email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('❌ Failed to send enrollment email:', error);
    throw error;
  }
};
