import { supabase } from '../config/supabase';

// Fetch all categories
export const fetchCategories = async () => {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch all projects
export const fetchProjects = async () => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(name, slug, color, icon)
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Fetch projects by category
export const fetchProjectsByCategory = async (categorySlug) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(name, slug, color, icon)
      `)
      .eq('category.slug', categorySlug)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    return [];
  }
};

// Fetch single project by ID
export const fetchProjectById = async (projectId) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(name, slug, color, icon)
      `)
      .eq('id', projectId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

// Search projects
export const searchProjects = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        *,
        category:categories(name, slug, color, icon)
      `)
      .or(`title.ilike.%${searchTerm}%, description.ilike.%${searchTerm}%, technologies.cs.{${searchTerm}}`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching projects:', error);
    return [];
  }
};
