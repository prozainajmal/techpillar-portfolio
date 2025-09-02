export const lightTheme = {
  // Primary colors
  primary: {
    main: '#1E3A8A',
    light: '#3B82F6',
    dark: '#1E40AF',
    contrast: '#FFFFFF'
  },
  
  // Secondary colors
  secondary: {
    main: '#8B5CF6',
    light: '#A78BFA',
    dark: '#7C3AED',
    contrast: '#FFFFFF'
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
    card: '#FFFFFF',
    header: 'rgba(255, 255, 255, 0.95)',
    footer: '#1A1A1A'
  },
  
  // Text colors
  text: {
    primary: '#1A1A1A',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
    muted: '#9CA3AF'
  },
  
  // Border colors
  border: {
    primary: '#E2E8F0',
    secondary: '#F1F5F9',
    accent: '#3B82F6',
    dark: '#CBD5E1'
  },
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    heavy: 'rgba(0, 0, 0, 0.2)',
    colored: 'rgba(59, 130, 246, 0.3)'
  },
  
  // Gradient colors
  gradients: {
    primary: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
    secondary: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
    hero: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #8B5CF6 100%)',
    background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)'
  }
};

export const darkTheme = {
  // Primary colors
  primary: {
    main: '#60A5FA',
    light: '#93C5FD',
    dark: '#3B82F6',
    contrast: '#1A1A1A'
  },
  
  // Secondary colors
  secondary: {
    main: '#A78BFA',
    light: '#C4B5FD',
    dark: '#8B5CF6',
    contrast: '#1A1A1A'
  },
  
  // Background colors
  background: {
    primary: '#0F172A',
    secondary: '#1E293B',
    tertiary: '#334155',
    card: '#1E293B',
    header: 'rgba(15, 23, 42, 0.95)',
    footer: '#0F172A'
  },
  
  // Text colors
  text: {
    primary: '#F8FAFC',
    secondary: '#CBD5E1',
    tertiary: '#94A3B8',
    inverse: '#0F172A',
    muted: '#64748B'
  },
  
  // Border colors
  border: {
    primary: '#334155',
    secondary: '#475569',
    accent: '#60A5FA',
    dark: '#1E293B'
  },
  
  // Status colors
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  info: '#60A5FA',
  
  // Shadow colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.3)',
    medium: 'rgba(0, 0, 0, 0.5)',
    heavy: 'rgba(0, 0, 0, 0.7)',
    colored: 'rgba(96, 165, 250, 0.3)'
  },
  
  // Gradient colors
  gradients: {
    primary: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)',
    secondary: 'linear-gradient(135deg, #93C5FD 0%, #A78BFA 100%)',
    hero: 'linear-gradient(135deg, #60A5FA 0%, #93C5FD 50%, #A78BFA 100%)',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
  }
};

export const commonTheme = {
  // Typography
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px',
      '5xl': '48px',
      '6xl': '60px',
      '7xl': '72px',
      '8xl': '96px'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  // Spacing
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '80px',
    '5xl': '96px',
    '6xl': '128px'
  },
  
  // Border radius
  borderRadius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '20px',
    '3xl': '24px',
    full: '9999px'
  },
  
  // Transitions
  transition: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  
  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};
