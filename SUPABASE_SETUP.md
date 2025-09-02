# 🚀 Supabase Setup Guide for TechPillar Portfolio

## 📋 Prerequisites
- Supabase account (free tier available)
- React project with the required dependencies

## 🔧 Installation

### 1. Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 2. Environment Variables
Create a `.env` file in your project root:
```env
REACT_APP_SUPABASE_URL=your_supabase_project_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## 🗄️ Database Setup

### 1. Create New Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `techpillar-portfolio`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest to your users

### 2. Get Project Credentials
1. Go to Project Settings → API
2. Copy the following:
   - **Project URL** → `REACT_APP_SUPABASE_URL`
   - **Anon Public Key** → `REACT_APP_SUPABASE_ANON_KEY`

### 3. Run SQL Script
1. Go to SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase-setup.sql`
3. Click "Run" to execute the script

## 📊 Database Schema

### Categories Table
- `id` - Unique identifier (UUID)
- `name` - Category name (e.g., "Web Development")
- `slug` - URL-friendly identifier (e.g., "web-development")
- `description` - Category description
- `icon` - Icon name for display
- `color` - Hex color code
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

### Projects Table
- `id` - Unique identifier (UUID)
- `title` - Project title
- `description` - Full project description
- `short_description` - Brief project summary
- `category_id` - Reference to categories table
- `image_url` - Project image URL
- `technologies` - Array of technologies used
- `features` - Array of project features
- `client` - Client name
- `duration` - Project duration
- `budget` - Project budget
- `status` - Project status (completed, in-progress, etc.)
- `project_url` - Live project URL
- `github_url` - GitHub repository URL
- `demo_url` - Demo URL
- `created_at` - Creation timestamp
- `updated_at` - Last update timestamp

## 🎯 Demo Data

The setup script includes sample data for:
- **8 Categories**: Web Development, Mobile Development, UI/UX Design, Digital Marketing, E-commerce, AI & ML, Cloud & DevOps, Database Solutions
- **2 Sample Projects**: E-commerce Platform, Mobile Banking App

## 🔐 Row Level Security (RLS)

- **Categories**: Public read access
- **Projects**: Public read access
- All tables have RLS enabled with appropriate policies

## 📱 Frontend Integration

### 1. Supabase Client Configuration
```javascript
// src/config/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Service Functions
```javascript
// src/services/supabaseService.js
import { supabase } from '../config/supabase'

// Fetch all categories
export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  
  if (error) throw error
  return data || []
}

// Fetch all projects with category info
export const fetchProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      category:categories(name, slug, color, icon)
    `)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}
```

### 3. Component Usage
```javascript
import React, { useState, useEffect } from 'react'
import { fetchCategories, fetchProjects } from '../services/supabaseService'

const Portfolio = () => {
  const [categories, setCategories] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const [categoriesData, projectsData] = await Promise.all([
        fetchCategories(),
        fetchProjects()
      ])
      
      setCategories(categoriesData)
      setProjects(projectsData)
    }

    loadData()
  }, [])

  // Render your portfolio with the data
}
```

## 🚀 Features

### ✅ What's Included
- **Dynamic Categories**: Categories are loaded from database
- **Project Filtering**: Filter by category or search term
- **Empty States**: Beautiful empty state when no projects found
- **Loading States**: Smooth loading animations
- **Error Handling**: Graceful error handling for API failures
- **Responsive Design**: Mobile-first responsive layout
- **Search Functionality**: Search projects by title, description, or technologies

### 🔍 Search & Filtering
- **Category Filter**: Click category buttons to filter projects
- **Search**: Search across project titles, descriptions, and technologies
- **Clear Filters**: Easy way to reset all filters
- **Project Counts**: Shows number of projects in each category

### 📱 Responsive Features
- **Mobile-First**: Optimized for mobile devices
- **Grid Layout**: Responsive grid that adapts to screen size
- **Touch-Friendly**: Optimized for touch interactions

## 🛠️ Customization

### Adding New Categories
1. Insert into `categories` table:
```sql
INSERT INTO categories (name, slug, description, icon, color) VALUES
  ('New Category', 'new-category', 'Description here', 'IconName', '#HEXCODE');
```

### Adding New Projects
1. Insert into `projects` table:
```sql
INSERT INTO projects (title, description, short_description, category_id, image_url, technologies, features, client, duration, budget, status, project_url, github_url, demo_url) VALUES
  ('Project Title', 'Full description', 'Short description', 'category-uuid', 'image-url', ARRAY['Tech1', 'Tech2'], ARRAY['Feature1', 'Feature2'], 'Client Name', 'Duration', 'Budget', 'completed', 'project-url', 'github-url', 'demo-url');
```

### Styling Customization
- All styles use CSS variables for easy theming
- Colors, spacing, and typography can be adjusted in the theme files
- Component styles are modular and easy to modify

## 🚨 Troubleshooting

### Common Issues

#### 1. "Invalid API key" Error
- Check your `.env` file has correct values
- Ensure environment variables start with `REACT_APP_`
- Restart your development server after adding `.env`

#### 2. "Table doesn't exist" Error
- Run the SQL setup script in Supabase SQL Editor
- Check table names match exactly
- Verify RLS policies are created

#### 3. "Permission denied" Error
- Check RLS policies are enabled
- Verify policies allow public read access
- Check your API key has correct permissions

#### 4. Data Not Loading
- Check browser console for errors
- Verify Supabase project is active
- Check network tab for failed requests

### Debug Steps
1. **Check Console**: Look for JavaScript errors
2. **Network Tab**: Check if API requests are successful
3. **Supabase Dashboard**: Verify tables and data exist
4. **Environment Variables**: Confirm `.env` file is loaded
5. **Restart Server**: Sometimes needed after adding `.env`

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Styled Components](https://styled-components.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

## 🎉 Next Steps

After setup:
1. **Add Real Projects**: Replace demo data with your actual projects
2. **Customize Categories**: Modify categories to match your services
3. **Add Images**: Upload project images to Supabase Storage
4. **Enhance Features**: Add pagination, sorting, or advanced filtering
5. **Deploy**: Deploy your portfolio to production

---

**Need Help?** Check the troubleshooting section or refer to Supabase documentation for advanced features.
