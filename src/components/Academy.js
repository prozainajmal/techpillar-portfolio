import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, 
  Palette, 
  Smartphone, 
  Globe, 
  TrendingUp,
  Clock,
  Target,
  Brain,
  Database,
  Server,
  Zap,
  BookOpen,
  Users,
  Star,
  Play,
  Certificate
} from 'lucide-react';

const AcademySection = styled.section`
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

const AcademyIntro = styled.div`
  background: var(--background-card);
  border-radius: 20px;
  padding: 64px;
  text-align: center;
  margin-bottom: 80px;
  border: 1px solid var(--border-primary);
  
  @media (max-width: 768px) {
    padding: 40px 24px;
  }
`;

const IntroTitle = styled.h3`
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 24px;
`;

const IntroDescription = styled.p`
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
  margin-top: 48px;
`;

const StatItem = styled.div`
  text-align: center;
  
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

const CourseCategories = styled.div`
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

const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  margin-bottom: 64px;
`;

const FlipCard = styled(motion.div)`
  width: 100%;
  height: 400px;
  perspective: 1000px;
  cursor: pointer;
`;

const FlipCardInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
`;

const FlipCardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: var(--background-card);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px var(--shadow-light);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    border-radius: 16px 16px 0 0;
  }
`;

const FlipCardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: var(--gradient-primary);
  border-radius: 16px;
  padding: 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-inverse);
  transform: rotateY(180deg);
  box-shadow: 0 8px 25px var(--shadow-colored);
`;

const CourseIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  background: var(--gradient-primary);
  color: var(--text-inverse);
  position: relative;
  z-index: 1;
  
  svg {
    width: 40px;
    height: 40px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: var(--gradient-primary);
    border-radius: 22px;
    z-index: -1;
    opacity: 0.3;
    filter: blur(8px);
  }
`;

const CourseTitle = styled.h4`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.3;
`;

const CourseDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 24px;
  font-size: 14px;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: auto;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 500;
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const BackTitle = styled.h4`
  font-size: 22px;
  font-weight: 600;
  color: var(--text-inverse);
  margin-bottom: 20px;
`;

const BackFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
  text-align: left;
`;

const BackFeature = styled.li`
  color: var(--text-inverse);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  
  &::before {
    content: '✓';
    color: var(--success);
    font-weight: bold;
    font-size: 14px;
  }
`;

const EnrollButton = styled.button`
  background: var(--text-inverse);
  color: var(--primary-main);
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: auto;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CTAButton = styled.button`
  background: var(--gradient-secondary);
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

// Development Courses
const developmentCourses = [
  {
    icon: <Code />,
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, and databases.",
    features: [
      "HTML5, CSS3, JavaScript ES6+",
      "React.js with Hooks & Context",
      "Node.js & Express.js",
      "MongoDB & SQL databases",
      "RESTful APIs & Authentication",
      "Deployment & DevOps basics"
    ],
    duration: "6 months",
    level: "Beginner to Advanced"
  },
  {
    icon: <Smartphone />,
    title: "Mobile App Development",
    description: "Learn to build cross-platform mobile applications using React Native and Flutter.",
    features: [
      "React Native fundamentals",
      "Flutter & Dart programming",
      "Mobile UI/UX design",
      "State management",
      "Native device features",
      "App store deployment"
    ],
    duration: "4 months",
    level: "Intermediate"
  },
  {
    icon: <Database />,
    title: "MERN Stack Development",
    description: "Specialized course in MongoDB, Express.js, React, and Node.js.",
    features: [
      "MongoDB database design",
      "Express.js server development",
      "React frontend architecture",
      "Node.js backend logic",
      "JWT authentication",
      "Real-time features with Socket.io"
    ],
    duration: "5 months",
    level: "Intermediate to Advanced"
  }
];

// Design & Marketing Courses
const designMarketingCourses = [
  {
    icon: <Palette />,
    title: "Graphic Design & Branding",
    description: "Master graphic design principles, create stunning visuals, and build strong brand identities.",
    features: [
      "Design fundamentals & principles",
      "Adobe Creative Suite mastery",
      "Logo & brand identity design",
      "Print & digital design",
      "Typography & color theory",
      "Portfolio development"
    ],
    duration: "3 months",
    level: "Beginner to Intermediate"
  },
  {
    icon: <TrendingUp />,
    title: "Digital Marketing Mastery",
    description: "Comprehensive digital marketing course covering SEO, social media, PPC, and content marketing.",
    features: [
      "SEO & search engine optimization",
      "Social media marketing",
      "Google Ads & PPC campaigns",
      "Content marketing strategy",
      "Email marketing automation",
      "Analytics & performance tracking"
    ],
    duration: "4 months",
    level: "Beginner to Advanced"
  },
  {
    icon: <Globe />,
    title: "UI/UX Design",
    description: "Learn user interface and user experience design for web and mobile applications.",
    features: [
      "User research & personas",
      "Wireframing & prototyping",
      "Visual design principles",
      "Interaction design",
      "Usability testing",
      "Design systems & components"
    ],
    duration: "4 months",
    level: "Intermediate"
  }
];

// Programming & Technology Courses
const programmingCourses = [
  {
    icon: <Brain />,
    title: "Python Programming",
    description: "Master Python programming from basics to advanced concepts including data science and AI.",
    features: [
      "Python fundamentals & OOP",
      "Data structures & algorithms",
      "Web development with Django/Flask",
      "Data science with Pandas",
      "Machine learning basics",
      "Automation & scripting"
    ],
    duration: "5 months",
    level: "Beginner to Advanced"
  },
  {
    icon: <Server />,
    title: "Java Development",
    description: "Learn Java programming for enterprise applications, Android development, and backend systems.",
    features: [
      "Java fundamentals & OOP",
      "Spring Framework & Spring Boot",
      "Database connectivity",
      "RESTful web services",
      "Testing with JUnit",
      "Enterprise application development"
    ],
    duration: "6 months",
    level: "Intermediate to Advanced"
  },
  {
    icon: <Zap />,
    title: "AI & Machine Learning",
    description: "Introduction to artificial intelligence and machine learning with practical applications.",
    features: [
      "Machine learning fundamentals",
      "Data preprocessing & analysis",
      "Supervised & unsupervised learning",
      "Deep learning with TensorFlow",
      "Natural language processing",
      "Real-world AI projects"
    ],
    duration: "5 months",
    level: "Advanced"
  }
];

const Academy = () => {
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const flipVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  return (
    <AcademySection id="academy">
      <Container>
        <SectionHeader>
          <SectionTitle>TechPillar Academy</SectionTitle>
          <SectionSubtitle>
            Empowering students and young professionals with cutting-edge technology skills 
            through comprehensive courses and hands-on training
          </SectionSubtitle>
        </SectionHeader>

        <AcademyIntro>
          <IntroTitle>Transform Your Career with TechPillar Academy</IntroTitle>
          <IntroDescription>
            Our academy offers industry-focused courses designed by industry experts. 
            Learn the latest technologies, build real-world projects, and get certified 
            to advance your career in technology.
          </IntroDescription>
          
          <StatsGrid>
            <StatItem>
              <div className="number">500+</div>
              <div className="label">Students Trained</div>
            </StatItem>
            <StatItem>
              <div className="number">25+</div>
              <div className="label">Expert Instructors</div>
            </StatItem>
            <StatItem>
              <div className="number">95%</div>
              <div className="label">Placement Rate</div>
            </StatItem>
            <StatItem>
              <div className="number">50+</div>
              <div className="label">Corporate Partners</div>
            </StatItem>
          </StatsGrid>
        </AcademyIntro>

        {/* Development Courses */}
        <CourseCategories>
          <CategoryTitle>Software Development Courses</CategoryTitle>
          <CoursesGrid
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {developmentCourses.map((course, index) => (
              <FlipCard
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FlipCardInner
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <FlipCardFront>
                    <CourseIcon>
                      {course.icon}
                    </CourseIcon>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseDescription>{course.description}</CourseDescription>
                    <CourseMeta>
                      <MetaItem>
                        <Clock />
                        {course.duration}
                      </MetaItem>
                      <MetaItem>
                        <Target />
                        {course.level}
                      </MetaItem>
                    </CourseMeta>
                  </FlipCardFront>
                  
                  <FlipCardBack>
                    <BackTitle>{course.title}</BackTitle>
                    <BackFeatures>
                      {course.features.map((feature, idx) => (
                        <BackFeature key={idx}>{feature}</BackFeature>
                      ))}
                    </BackFeatures>
                    <EnrollButton>Enroll Now</EnrollButton>
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            ))}
          </CoursesGrid>
        </CourseCategories>

        {/* Design & Marketing Courses */}
        <CourseCategories>
          <CategoryTitle>Design & Digital Marketing Courses</CategoryTitle>
          <CoursesGrid
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {designMarketingCourses.map((course, index) => (
              <FlipCard
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FlipCardInner
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <FlipCardFront>
                    <CourseIcon>
                      {course.icon}
                    </CourseIcon>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseDescription>{course.description}</CourseDescription>
                    <CourseMeta>
                      <MetaItem>
                        <Clock />
                        {course.duration}
                      </MetaItem>
                      <MetaItem>
                        <Target />
                        {course.level}
                      </MetaItem>
                    </CourseMeta>
                  </FlipCardFront>
                  
                  <FlipCardBack>
                    <BackTitle>{course.title}</BackTitle>
                    <BackFeatures>
                      {course.features.map((feature, idx) => (
                        <BackFeature key={idx}>{feature}</BackFeature>
                      ))}
                    </BackFeatures>
                    <EnrollButton>Enroll Now</EnrollButton>
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            ))}
          </CoursesGrid>
        </CourseCategories>

        {/* Programming Courses */}
        <CourseCategories>
          <CategoryTitle>Programming & Technology Courses</CategoryTitle>
          <CoursesGrid
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {programmingCourses.map((course, index) => (
              <FlipCard
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FlipCardInner
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <FlipCardFront>
                    <CourseIcon>
                      {course.icon}
                    </CourseIcon>
                    <CourseTitle>{course.title}</CourseTitle>
                    <CourseDescription>{course.description}</CourseDescription>
                    <CourseMeta>
                      <MetaItem>
                        <Clock />
                        {course.duration}
                      </MetaItem>
                      <MetaItem>
                        <Target />
                        {course.level}
                      </MetaItem>
                    </CourseMeta>
                  </FlipCardFront>
                  
                  <FlipCardBack>
                    <BackTitle>{course.title}</BackTitle>
                    <BackFeatures>
                      {course.features.map((feature, idx) => (
                        <BackFeature key={idx}>{feature}</BackFeature>
                      ))}
                    </BackFeatures>
                    <EnrollButton>Enroll Now</EnrollButton>
                  </FlipCardBack>
                </FlipCardInner>
              </FlipCard>
            ))}
          </CoursesGrid>
        </CourseCategories>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <CTAButton>View All Courses & Enroll</CTAButton>
        </motion.div>
      </Container>
    </AcademySection>
  );
};

export default Academy;
