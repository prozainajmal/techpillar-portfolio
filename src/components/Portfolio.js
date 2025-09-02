import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  ExternalLink, 
  Github, 
  Play, 
  Search,
  X,
  FolderOpen
} from 'lucide-react';
import { fetchCategories, fetchProjects } from '../services/supabaseService';

const PortfolioSection = styled.section`
  padding: 128px 24px;
  background: var(--background-primary);
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

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 64px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchBar = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
  
  input {
    width: 100%;
    padding: 12px 16px 12px 48px;
    border: 1px solid var(--border-primary);
    border-radius: 8px;
    background: var(--background-card);
    color: var(--text-primary);
    font-size: 16px;
    
    &:focus {
      outline: none;
      border-color: var(--primary-main);
      box-shadow: 0 0 0 3px var(--shadow-colored);
    }
    
    &::placeholder {
      color: var(--text-tertiary);
    }
  }
  
  svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-tertiary);
    width: 20px;
    height: 20px;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 1px solid var(--border-primary);
  border-radius: 20px;
  background: ${props => props.active ? 'var(--gradient-primary)' : 'var(--background-card)'};
  color: ${props => props.active ? 'var(--text-inverse)' : 'var(--text-secondary)'};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-main);
    transform: translateY(-1px);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
`;

const ProjectCard = styled(motion.div)`
  background: var(--background-card);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px var(--shadow-medium);
    border-color: var(--primary-light);
  }
`;

const ProjectImage = styled.div`
  position: relative;
  height: 200px;
  background: ${props => props.imageUrl ? `url(${props.imageUrl})` : 'var(--gradient-secondary)'};
  background-size: cover;
  background-position: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
  
  .category-badge {
    position: absolute;
    top: 16px;
    left: 16px;
    background: ${props => props.categoryColor || 'var(--primary-main)'};
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
    z-index: 1;
  }
`;

const ProjectContent = styled.div`
  padding: 24px;
`;

const ProjectTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 14px;
`;

const ProjectTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const TechTag = styled.span`
  background: var(--background-secondary);
  color: var(--text-secondary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
`;

const ProjectMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: var(--background-secondary);
  border-top: 1px solid var(--border-primary);
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--text-tertiary);
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--background-card);
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--primary-main);
    color: var(--text-inverse);
    transform: translateY(-2px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: var(--text-secondary);
`;

const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: var(--background-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 40px;
    height: 40px;
    color: var(--text-tertiary);
  }
`;

const EmptyTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
`;

const EmptyDescription = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 80px 24px;
  color: var(--text-secondary);
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-primary);
  border-top: 3px solid var(--primary-main);
  border-radius: 50%;
  margin: 0 auto 24px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [categoriesData, projectsData] = await Promise.all([
          fetchCategories(),
          fetchProjects()
        ]);
        
        setCategories(categoriesData);
        setProjects(projectsData);
        setFilteredProjects(projectsData);
      } catch (err) {
        setError(err.message);
        console.error('Error loading portfolio data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category?.slug === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.technologies?.some(tech => tech.toLowerCase().includes(term))
      );
    }

    setFilteredProjects(filtered);
  }, [selectedCategory, searchTerm, projects]);

  const handleCategoryFilter = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <PortfolioSection id="portfolio">
        <Container>
          <SectionHeader>
            <SectionTitle>Our Portfolio</SectionTitle>
            <SectionSubtitle>
              Explore our latest projects and see how we bring ideas to life
            </SectionSubtitle>
          </SectionHeader>
          <LoadingState>
            <LoadingSpinner />
            <p>Loading amazing projects...</p>
          </LoadingState>
        </Container>
      </PortfolioSection>
    );
  }

  if (error) {
    return (
      <PortfolioSection id="portfolio">
        <Container>
          <SectionHeader>
            <SectionTitle>Our Portfolio</SectionTitle>
            <SectionSubtitle>
              Explore our latest projects and see how we bring ideas to life
            </SectionSubtitle>
          </SectionHeader>
          <EmptyState>
            <EmptyIcon>
              <FolderOpen />
            </EmptyIcon>
            <EmptyTitle>Unable to Load Projects</EmptyTitle>
            <EmptyDescription>
              We're experiencing some technical difficulties. Please check your internet connection and try again.
            </EmptyDescription>
          </EmptyState>
        </Container>
      </PortfolioSection>
    );
  }

  return (
    <PortfolioSection id="portfolio">
      <Container>
        <SectionHeader>
          <SectionTitle>Our Portfolio</SectionTitle>
          <SectionSubtitle>
            Explore our latest projects and see how we bring ideas to life
          </SectionSubtitle>
        </SectionHeader>

        <FilterSection>
          <SearchBar>
            <Search />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>

          <FilterButtons>
            <FilterButton
              active={selectedCategory === 'all'}
              onClick={() => handleCategoryFilter('all')}
            >
              All Projects ({projects.length})
            </FilterButton>
            {categories.map((category) => (
              <FilterButton
                key={category.id}
                active={selectedCategory === category.slug}
                onClick={() => handleCategoryFilter(category.slug)}
              >
                {category.name} ({projects.filter(p => p.category?.slug === category.slug).length})
              </FilterButton>
            ))}
            {(selectedCategory !== 'all' || searchTerm) && (
              <FilterButton onClick={clearFilters}>
                <X size={16} />
                Clear
              </FilterButton>
            )}
          </FilterButtons>
        </FilterSection>

        {filteredProjects.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <FolderOpen />
            </EmptyIcon>
            <EmptyTitle>
              {searchTerm ? 'No projects found' : 'No projects in this category'}
            </EmptyTitle>
            <EmptyDescription>
              {searchTerm 
                ? `We couldn't find any projects matching "${searchTerm}". Try adjusting your search terms.`
                : 'This category is currently empty. Check back soon for new projects!'
              }
            </EmptyDescription>
          </EmptyState>
        ) : (
          <ProjectsGrid
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                whileHover={{ y: -8 }}
              >
                <ProjectImage 
                  imageUrl={project.image_url}
                  categoryColor={project.category?.color}
                >
                  <div className="category-badge">
                    {project.category?.name || 'Uncategorized'}
                  </div>
                </ProjectImage>
                
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectDescription>{project.short_description || project.description}</ProjectDescription>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <ProjectTechnologies>
                      {project.technologies.slice(0, 4).map((tech, index) => (
                        <TechTag key={index}>{tech}</TechTag>
                      ))}
                      {project.technologies.length > 4 && (
                        <TechTag>+{project.technologies.length - 4} more</TechTag>
                      )}
                    </ProjectTechnologies>
                  )}
                </ProjectContent>
                
                <ProjectMeta>
                  <MetaInfo>
                    <span>{project.duration}</span>
                    <span>{project.budget}</span>
                  </MetaInfo>
                  
                  <ProjectActions>
                    {project.demo_url && (
                      <ActionButton href={project.demo_url} target="_blank" rel="noopener noreferrer">
                        <Play size={16} />
                      </ActionButton>
                    )}
                    {project.github_url && (
                      <ActionButton href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                      </ActionButton>
                    )}
                    {project.project_url && (
                      <ActionButton href={project.project_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                      </ActionButton>
                    )}
                  </ProjectActions>
                </ProjectMeta>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        )}
      </Container>
    </PortfolioSection>
  );
};

export default Portfolio;
