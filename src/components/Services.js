import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, 
  Smartphone, 
  Brain, 
  Cloud, 
  TrendingUp, 
  Users,
  Globe,
  Database,
  Shield,
  Zap,
  Rocket,
  Target,
  Palette,
  Monitor,
  Server,
  BarChart3,
  Mail,
  Share2,
  Search,
  Camera,
  Video,
  FileText
} from 'lucide-react';

const ServicesSection = styled.section`
  padding: 128px 24px;
  background: var(--background-primary);
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

const ServiceCategory = styled.div`
  margin-bottom: 80px;
`;

const CategoryTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 48px;
  text-align: center;
  background: var(--gradient-secondary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
`;

const ServiceCard = styled(motion.div)`
  background: var(--background-card);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px var(--shadow-medium);
    border-color: var(--primary-light);
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const ServiceIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: var(--gradient-primary);
  color: var(--text-inverse);
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
`;

const ServiceDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ServiceFeature = styled.li`
  color: var(--text-secondary);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '✓';
    color: var(--success);
    font-weight: bold;
  }
`;

const TechnologyStack = styled.div`
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-primary);
`;

const StackTitle = styled.h4`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StackTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StackTag = styled.span`
  background: var(--background-secondary);
  color: var(--text-secondary);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
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
  display: block;
  margin: 0 auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px var(--shadow-colored);
  }
`;

// Software Development Services
const softwareServices = [
  {
    icon: <Code />,
    title: "Web Development",
    description: "Full-stack web applications built with modern technologies and best practices.",
    features: [
      "Custom web applications",
      "E-commerce platforms",
      "Content management systems",
      "Progressive web apps",
      "API development & integration",
      "Performance optimization"
    ],
    technologies: ["React", "Node.js", "Python", "PHP", "MySQL", "MongoDB", "AWS", "Docker"]
  },
  {
    icon: <Smartphone />,
    title: "Mobile Development",
    description: "Cross-platform and native mobile applications for iOS and Android.",
    features: [
      "Cross-platform development",
      "Native iOS & Android apps",
      "App store optimization",
      "Performance optimization",
      "Push notifications",
      "Offline functionality"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Xcode", "Android Studio"]
  },
  {
    icon: <Brain />,
    title: "AI/ML Solutions",
    description: "Custom artificial intelligence and machine learning implementations.",
    features: [
      "Custom AI algorithms",
      "Data analytics & insights",
      "Computer vision solutions",
      "Natural language processing",
      "Predictive analytics",
      "Chatbot development"
    ],
    technologies: ["TensorFlow", "PyTorch", "Python", "OpenAI", "AWS SageMaker", "Google Cloud AI"]
  },
  {
    icon: <Cloud />,
    title: "Cloud Services & Deployment",
    description: "Cloud infrastructure, migration, and DevOps solutions.",
    features: [
      "Cloud migration",
      "DevOps automation",
      "Scalable infrastructure",
      "24/7 monitoring",
      "CI/CD pipelines",
      "Container orchestration"
    ],
    technologies: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Jenkins", "GitHub Actions"]
  },
  {
    icon: <Database />,
    title: "Database Solutions",
    description: "Database design, optimization, and management services.",
    features: [
      "Database design & architecture",
      "Performance optimization",
      "Data migration",
      "Backup & recovery",
      "Security implementation",
      "Scalability planning"
    ],
    technologies: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "AWS RDS", "Google Cloud SQL"]
  },
  {
    icon: <Shield />,
    title: "Security & Testing",
    description: "Comprehensive security implementation and testing services.",
    features: [
      "Security audits",
      "Penetration testing",
      "Vulnerability assessment",
      "Code review",
      "Automated testing",
      "Quality assurance"
    ],
    technologies: ["OWASP", "Selenium", "Jest", "Cypress", "SonarQube", "Burp Suite"]
  }
];

// Digital Marketing Services
const marketingServices = [
  {
    icon: <Search />,
    title: "SEO & SEM",
    description: "Search engine optimization and marketing to improve online visibility.",
    features: [
      "Keyword research & optimization",
      "On-page & off-page SEO",
      "Google Ads management",
      "Local SEO optimization",
      "Technical SEO audit",
      "Performance tracking"
    ],
    technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Google Search Console", "Google Ads"]
  },
  {
    icon: <Share2 />,
    title: "Social Media Marketing",
    description: "Strategic social media campaigns to build brand presence.",
    features: [
      "Platform strategy",
      "Content creation",
      "Community management",
      "Paid advertising",
      "Influencer partnerships",
      "Performance analytics"
    ],
    technologies: ["Facebook Ads", "Instagram", "LinkedIn", "Twitter", "TikTok", "Hootsuite"]
  },
  {
    icon: <Mail />,
    title: "Email Marketing",
    description: "Targeted email campaigns for customer engagement and conversion.",
    features: [
      "Email list building",
      "Campaign design",
      "Automation workflows",
      "A/B testing",
      "Analytics & reporting",
      "GDPR compliance"
    ],
    technologies: ["Mailchimp", "SendGrid", "HubSpot", "ConvertKit", "ActiveCampaign"]
  },
  {
    icon: <BarChart3 />,
    title: "Content Marketing",
    description: "Strategic content creation to attract and engage target audiences.",
    features: [
      "Content strategy",
      "Blog writing",
      "Video production",
      "Infographic design",
      "Content calendar",
      "Performance metrics"
    ],
    technologies: ["WordPress", "Canva", "Adobe Creative Suite", "YouTube", "Medium"]
  },
  {
    icon: <Target />,
    title: "PPC & Display Advertising",
    description: "Pay-per-click campaigns and display advertising for targeted reach.",
    features: [
      "Google Ads campaigns",
      "Facebook/Instagram ads",
      "Display network ads",
      "Remarketing campaigns",
      "Budget optimization",
      "ROI tracking"
    ],
    technologies: ["Google Ads", "Facebook Ads Manager", "Google Display Network", "AdRoll"]
  },
  {
    icon: <TrendingUp />,
    title: "Analytics & Reporting",
    description: "Comprehensive analytics and reporting for data-driven decisions.",
    features: [
      "KPI tracking",
      "Conversion optimization",
      "A/B testing",
      "ROI analysis",
      "Custom dashboards",
      "Monthly reports"
    ],
    technologies: ["Google Analytics", "Google Data Studio", "Hotjar", "Optimizely", "Mixpanel"]
  }
];

const Services = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <ServicesSection id="services">
      <Container>
        <SectionHeader>
          <SectionTitle>Our Comprehensive Services</SectionTitle>
          <SectionSubtitle>
            We provide end-to-end technology solutions from development to deployment, 
            along with comprehensive digital marketing services to grow your business
          </SectionSubtitle>
        </SectionHeader>

        {/* Software Development Services */}
        <ServiceCategory>
          <CategoryTitle>Software Development & Deployment</CategoryTitle>
          <ServicesGrid
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {softwareServices.map((service, index) => (
              <ServiceCard
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                
                <ServiceFeatures>
                  {service.features.map((feature, idx) => (
                    <ServiceFeature key={idx}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
                
                <TechnologyStack>
                  <StackTitle>Technologies</StackTitle>
                  <StackTags>
                    {service.technologies.map((tech, idx) => (
                      <StackTag key={idx}>{tech}</StackTag>
                    ))}
                  </StackTags>
                </TechnologyStack>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServiceCategory>

        {/* Digital Marketing Services */}
        <ServiceCategory>
          <CategoryTitle>Digital Marketing & Growth</CategoryTitle>
          <ServicesGrid
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {marketingServices.map((service, index) => (
              <ServiceCard
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8 }}
              >
                <ServiceIcon>
                  {service.icon}
                </ServiceIcon>
                
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                
                <ServiceFeatures>
                  {service.features.map((feature, idx) => (
                    <ServiceFeature key={idx}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
                
                <TechnologyStack>
                  <StackTitle>Tools & Platforms</StackTitle>
                  <StackTags>
                    {service.technologies.map((tech, idx) => (
                      <StackTag key={idx}>{tech}</StackTag>
                    ))}
                  </StackTags>
                </TechnologyStack>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </ServiceCategory>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <CTAButton>Get Custom Quote</CTAButton>
        </motion.div>
      </Container>
    </ServicesSection>
  );
};

export default Services;
