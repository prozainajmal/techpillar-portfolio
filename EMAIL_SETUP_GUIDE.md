# 📧 Email Setup Guide for TechPillar Contact Form

## 🎯 Overview

Your contact form is now fully functional with professional email templates and validation. Currently, it simulates email sending, but this guide will help you integrate with real email services to actually send emails to `pro.zainajmal@gmail.com`.

## 🚀 Quick Setup Options

### Option 1: EmailJS (Recommended for Frontend-Only)
**Best for**: Simple setup, no backend required
**Cost**: Free tier available, then $15/month

#### Setup Steps:
1. **Create EmailJS Account**
   - Go to [emailjs.com](https://emailjs.com)
   - Sign up for a free account

2. **Add EmailJS to Your Project**
   ```bash
   npm install @emailjs/browser
   ```

3. **Update `src/services/emailService.js`**
   ```javascript
   import emailjs from '@emailjs/browser';
   
   // Replace the sendContactFormEmail function with:
   export const sendContactFormEmail = async (formData, serviceOptions) => {
     try {
       const emailData = generateEmailTemplate(formData, serviceOptions);
       
       const result = await emailjs.send(
         'YOUR_SERVICE_ID', // From EmailJS dashboard
         'YOUR_TEMPLATE_ID', // From EmailJS dashboard
         {
           to_email: emailData.to,
           from_name: formData.name,
           from_email: formData.email,
           company: formData.company || 'Individual',
           service: serviceOptions.find(opt => opt.value === formData.service)?.label,
           message: formData.message,
           reply_to: formData.email
         },
         'YOUR_USER_ID' // From EmailJS dashboard
       );
       
       return {
         success: true,
         message: 'Email sent successfully',
         result
       };
     } catch (error) {
       throw new Error('Failed to send email. Please try again.');
     }
   };
   ```

4. **Create EmailJS Template**
   - In EmailJS dashboard, create a new email template
   - Use this HTML template:
   ```html
   <h2>🚀 New Service Inquiry - TechPillar</h2>
   
   <p><strong>Contact Person:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Company:</strong> {{company}}</p>
   <p><strong>Service Interest:</strong> {{service}}</p>
   
   <h3>Message:</h3>
   <p>{{message}}</p>
   
   <hr>
   <p><em>This inquiry was sent from the TechPillar contact form.</em></p>
   ```

### Option 2: SendGrid (Professional Email Service)
**Best for**: High volume, professional setup
**Cost**: Free tier (100 emails/day), then $14.95/month

#### Setup Steps:
1. **Create SendGrid Account**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Sign up and verify your domain

2. **Install SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```

3. **Create Backend API Endpoint**
   ```javascript
   // In your backend (Node.js/Express example)
   const sgMail = require('@sendgrid/mail');
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
   
   app.post('/api/send-email', async (req, res) => {
     try {
       const { formData } = req.body;
       
       const msg = {
         to: 'pro.zainajmal@gmail.com',
         from: 'noreply@yourdomain.com', // Verified sender
         replyTo: formData.email,
         subject: `New Service Inquiry: ${formData.service}`,
         html: generateEmailTemplate(formData), // Use your existing template
         text: generateSimpleEmailTemplate(formData)
       };
       
       await sgMail.send(msg);
       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });
   ```

4. **Update Frontend to Call Your API**
   ```javascript
   // In emailService.js
   export const sendContactFormEmail = async (formData, serviceOptions) => {
     try {
       const response = await fetch('/api/send-email', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ formData })
       });
       
       if (!response.ok) throw new Error('Failed to send email');
       
       return { success: true, message: 'Email sent successfully' };
     } catch (error) {
       throw new Error('Failed to send email. Please try again.');
     }
   };
   ```

### Option 3: AWS SES (Enterprise Solution)
**Best for**: High volume, cost-effective, AWS integration
**Cost**: $0.10 per 1000 emails

#### Setup Steps:
1. **AWS SES Setup**
   - Create AWS account
   - Set up SES in your preferred region
   - Verify your domain or email address

2. **Install AWS SDK**
   ```bash
   npm install @aws-sdk/client-ses
   ```

3. **Backend Implementation**
   ```javascript
   const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
   
   const ses = new SESClient({
     region: 'us-east-1', // Your SES region
     credentials: {
       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
     }
   });
   
   app.post('/api/send-email', async (req, res) => {
     try {
       const { formData } = req.body;
       
       const command = new SendEmailCommand({
         Source: 'noreply@yourdomain.com',
         Destination: { ToAddresses: ['pro.zainajmal@gmail.com'] },
         ReplyToAddresses: [formData.email],
         Message: {
           Subject: { Data: `New Service Inquiry: ${formData.service}` },
           Body: {
             Html: { Data: generateEmailTemplate(formData) },
             Text: { Data: generateSimpleEmailTemplate(formData) }
           }
         }
       });
       
       await ses.send(command);
       res.json({ success: true });
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });
   ```

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
# For EmailJS
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_USER_ID=your_user_id

# For SendGrid
REACT_APP_SENDGRID_API_KEY=your_api_key

# For AWS SES
REACT_APP_AWS_ACCESS_KEY_ID=your_access_key
REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_key
REACT_APP_AWS_REGION=us-east-1
```

## 📱 Testing Your Email Setup

1. **Fill out the contact form** with test data
2. **Check the browser console** for email service logs
3. **Verify email received** at `pro.zainajmal@gmail.com`
4. **Test reply functionality** by clicking the reply button

## 🎨 Customizing Email Templates

Your email templates are in `src/services/emailService.js`. You can customize:

- **Colors and branding** to match your company
- **Layout and styling** for different email clients
- **Content and messaging** tone
- **Call-to-action buttons** and links

## 🚨 Troubleshooting

### Common Issues:

1. **"Invalid API key"**
   - Check your environment variables
   - Restart your development server
   - Verify API key permissions

2. **"Email not received"**
   - Check spam/junk folders
   - Verify sender email is verified
   - Check email service logs

3. **"Template not found"**
   - Verify template ID in EmailJS
   - Check template variables match

4. **"Rate limit exceeded"**
   - Upgrade your email service plan
   - Implement email queuing for high volume

## 🔒 Security Considerations

1. **Rate Limiting**: Implement form submission limits
2. **Input Validation**: Sanitize all form inputs
3. **CAPTCHA**: Consider adding reCAPTCHA for spam prevention
4. **Email Verification**: Verify sender email addresses

## 📊 Monitoring & Analytics

Track your email performance:

- **Delivery rates** and bounce rates
- **Open rates** and click-through rates
- **Response times** and conversion rates
- **Error logs** and failure reasons

## 🎯 Next Steps

1. **Choose your email service** (EmailJS recommended for quick start)
2. **Set up the service** following the steps above
3. **Test thoroughly** with various email clients
4. **Monitor performance** and adjust as needed
5. **Scale up** as your business grows

---

**Need Help?** Check the email service documentation or contact their support teams for specific setup assistance.
