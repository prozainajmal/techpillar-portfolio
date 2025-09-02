import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Dark theme variables (default) */
    --primary-main: #60A5FA;
    --primary-light: #93C5FD;
    --primary-dark: #3B82F6;
    --secondary-main: #A78BFA;
    --secondary-light: #C4B5FD;
    --secondary-dark: #8B5CF6;
    
    --background-primary: #0F172A;
    --background-secondary: #1E293B;
    --background-tertiary: #334155;
    --background-card: #1E293B;
    --background-header: rgba(15, 23, 42, 0.95);
    --background-footer: #0F172A;
    
    --text-primary: #F8FAFC;
    --text-secondary: #CBD5E1;
    --text-tertiary: #94A3B8;
    --text-inverse: #0F172A;
    --text-muted: #64748B;
    
    --border-primary: #334155;
    --border-secondary: #475569;
    --border-accent: #60A5FA;
    --border-dark: #1E293B;
    
    --success: #34D399;
    --warning: #FBBF24;
    --error: #F87171;
    --info: #60A5FA;
    
    --shadow-light: rgba(0, 0, 0, 0.3);
    --shadow-medium: rgba(0, 0, 0, 0.5);
    --shadow-heavy: rgba(0, 0, 0, 0.7);
    --shadow-colored: rgba(96, 165, 250, 0.3);
    
    --gradient-primary: linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%);
    --gradient-secondary: linear-gradient(135deg, #93C5FD 0%, #A78BFA 100%);
    --gradient-hero: linear-gradient(135deg, #60A5FA 0%, #93C5FD 50%, #A78BFA 100%);
    --gradient-background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  }

  [data-theme="light"] {
    /* Light theme variables */
    --primary-main: #1E3A8A;
    --primary-light: #3B82F6;
    --primary-dark: #1E40AF;
    --secondary-main: #8B5CF6;
    --secondary-light: #A78BFA;
    --secondary-dark: #7C3AED;
    
    --background-primary: #FFFFFF;
    --background-secondary: #F8FAFC;
    --background-tertiary: #F1F5F9;
    --background-card: #FFFFFF;
    --background-header: rgba(255, 255, 255, 0.95);
    --background-footer: #1A1A1A;
    
    --text-primary: #1A1A1A;
    --text-secondary: #64748B;
    --text-tertiary: #94A3B8;
    --text-inverse: #FFFFFF;
    --text-muted: #9CA3AF;
    
    --border-primary: #E2E8F0;
    --border-secondary: #F1F5F9;
    --border-accent: #3B82F6;
    --border-dark: #CBD5E1;
    
    --success: #10B981;
    --warning: #F59E0B;
    --error: #EF4444;
    --info: #3B82F6;
    
    --shadow-light: rgba(0, 0, 0, 0.05);
    --shadow-medium: rgba(0, 0, 0, 0.1);
    --shadow-heavy: rgba(0, 0, 0, 0.2);
    --shadow-colored: rgba(59, 130, 246, 0.3);
    
    --gradient-primary: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%);
    --gradient-secondary: linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%);
    --gradient-hero: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #8B5CF6 100%);
    --gradient-background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--background-primary);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  ::selection {
    background-color: var(--primary-light);
    color: var(--text-inverse);
  }

  /* Smooth transitions for theme changes */
  * {
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--background-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-primary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--border-accent);
  }

  /* Focus styles */
  :focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }

  /* Button focus styles */
  button:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }

  /* Link focus styles */
  a:focus {
    outline: 2px solid var(--primary-light);
    outline-offset: 2px;
  }
`;
