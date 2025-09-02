-- Create categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(7),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(300),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  image_url TEXT,
  technologies TEXT[],
  features TEXT[],
  client VARCHAR(100),
  duration VARCHAR(50),
  budget VARCHAR(50),
  status VARCHAR(20) DEFAULT 'completed',
  project_url TEXT,
  github_url TEXT,
  demo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to projects" ON projects FOR SELECT USING (true);

-- Insert demo categories
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('Web Development', 'web-development', 'Custom websites and web applications', 'Globe', '#3B82F6'),
  ('Mobile Development', 'mobile-development', 'iOS and Android applications', 'Smartphone', '#10B981'),
  ('UI/UX Design', 'ui-ux-design', 'User interface and experience design', 'Palette', '#8B5CF6'),
  ('Digital Marketing', 'digital-marketing', 'SEO, social media, and content marketing', 'TrendingUp', '#F59E0B'),
  ('E-commerce', 'e-commerce', 'Online store development', 'ShoppingCart', '#EF4444'),
  ('AI & Machine Learning', 'ai-ml', 'AI and ML solutions', 'Brain', '#06B6D4'),
  ('Cloud & DevOps', 'cloud-devops', 'Cloud infrastructure and DevOps', 'Cloud', '#84CC16'),
  ('Database Solutions', 'database-solutions', 'Database design and management', 'Database', '#F97316');

-- Insert demo projects
INSERT INTO projects (title, description, short_description, category_id, image_url, technologies, features, client, duration, budget, status, project_url, github_url, demo_url) VALUES
  (
    'E-commerce Platform',
    'Full-featured e-commerce platform with React, Node.js, and MongoDB',
    'Modern e-commerce platform with React and Node.js',
    (SELECT id FROM categories WHERE slug = 'e-commerce'),
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    ARRAY['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
    ARRAY['User Authentication', 'Product Catalog', 'Shopping Cart', 'Payment Processing'],
    'TechStore Inc.',
    '3 months',
    '$15,000',
    'completed',
    'https://techstore-demo.com',
    'https://github.com/techpillar/ecommerce',
    'https://demo.techstore.com'
  ),
  (
    'Mobile Banking App',
    'Secure mobile banking application with biometric authentication',
    'Secure mobile banking app with biometric authentication',
    (SELECT id FROM categories WHERE slug = 'mobile-development'),
    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    ARRAY['React Native', 'TypeScript', 'Firebase', 'Redux Toolkit'],
    ARRAY['Biometric Login', 'Account Management', 'Money Transfer', 'Transaction History'],
    'SecureBank',
    '4 months',
    '$25,000',
    'completed',
    'https://securebank-app.com',
    'https://github.com/techpillar/banking-app',
    'https://demo.securebank.com'
  );

-- Create indexes
CREATE INDEX idx_projects_category_id ON projects(category_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_categories_slug ON categories(slug);
