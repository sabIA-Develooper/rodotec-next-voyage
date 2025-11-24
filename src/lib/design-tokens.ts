/**
 * Design Tokens - RODOTEC Industrial Theme
 * Tema visual industrial/tecnológico para sites de nível Randon/Volvo/Scania
 */

export const designTokens = {
  colors: {
    // Backgrounds - Dark Industrial
    background: {
      primary: 'hsl(210, 58%, 8%)',      // Azul muito escuro (quase preto)
      secondary: 'hsl(210, 58%, 11%)',   // Azul escuro
      tertiary: 'hsl(210, 50%, 15%)',    // Azul médio-escuro
      card: 'hsl(210, 40%, 98%)',        // Branco para cards
      cardDark: 'hsl(214, 52%, 15%)',    // Card escuro
    },
    
    // Brand Colors
    brand: {
      primary: 'hsl(219, 88%, 48%)',     // Azul da marca
      primaryDark: 'hsl(219, 88%, 37%)',
      primaryLight: 'hsl(219, 88%, 60%)',
    },
    
    // Accent Colors
    accent: {
      orange: 'hsl(33, 89%, 43%)',       // Laranja/âmbar para detalhes
      orangeLight: 'hsl(33, 89%, 55%)',
      cyan: 'hsl(199, 89%, 49%)',        // Ciano para tecnologia
    },
    
    // Text Colors
    text: {
      primary: 'hsl(222, 47%, 11%)',     // Texto escuro
      primaryLight: 'hsl(210, 30%, 97%)', // Texto claro (sobre dark)
      secondary: 'hsl(215, 19%, 35%)',   // Texto secundário
      muted: 'hsl(215, 19%, 50%)',       // Texto muted
    },
    
    // Borders & Lines
    border: {
      light: 'hsl(210, 36%, 90%)',
      medium: 'hsl(210, 36%, 70%)',
      dark: 'hsl(213, 45%, 19%)',
      brand: 'hsl(219, 88%, 48%)',
    },
  },
  
  gradients: {
    background: 'linear-gradient(180deg, hsl(210, 58%, 8%) 0%, hsl(210, 58%, 11%) 100%)',
    hero: 'linear-gradient(135deg, hsl(210, 58%, 8%) 0%, hsl(219, 88%, 20%) 100%)',
    card: 'linear-gradient(135deg, hsl(210, 40%, 98%) 0%, hsl(210, 40%, 95%) 100%)',
    brand: 'linear-gradient(135deg, hsl(219, 88%, 48%) 0%, hsl(199, 89%, 49%) 100%)',
    overlay: 'linear-gradient(180deg, rgba(14, 26, 43, 0.9) 0%, rgba(14, 26, 43, 0.3) 100%)',
  },
  
  shadows: {
    sm: '0 1px 2px hsl(210, 40%, 12% / 0.06)',
    md: '0 4px 12px hsl(210, 40%, 12% / 0.1)',
    lg: '0 10px 24px hsl(210, 40%, 12% / 0.15)',
    xl: '0 20px 40px hsl(210, 40%, 12% / 0.2)',
    glow: '0 0 20px hsl(219, 88%, 48% / 0.3)',
    glowStrong: '0 0 40px hsl(219, 88%, 48% / 0.5)',
  },
  
  spacing: {
    section: {
      py: '6rem',      // py-24
      pyLarge: '8rem', // py-32
    },
  },
  
  typography: {
    heading: {
      fontFamily: 'Manrope, Inter, system-ui, sans-serif',
      sizes: {
        hero: 'clamp(3rem, 8vw, 5.5rem)',      // ~88px
        h1: 'clamp(2.5rem, 5vw, 4rem)',         // ~64px
        h2: 'clamp(2rem, 4vw, 3rem)',          // ~48px
        h3: 'clamp(1.5rem, 3vw, 2rem)',        // ~32px
        h4: 'clamp(1.25rem, 2vw, 1.5rem)',     // ~24px
      },
      weights: {
        bold: 700,
        extrabold: 800,
      },
    },
    body: {
      fontFamily: 'Inter, system-ui, sans-serif',
      sizes: {
        large: '1.25rem',   // 20px
        base: '1rem',      // 16px
        small: '0.875rem', // 14px
      },
    },
  },
  
  effects: {
    glassmorphism: {
      light: 'rgba(255, 255, 255, 0.1)',
      medium: 'rgba(255, 255, 255, 0.15)',
      dark: 'rgba(14, 26, 43, 0.6)',
      blur: 'blur(12px)',
    },
    backdrop: {
      blur: 'backdrop-filter: blur(12px)',
    },
  },
  
  patterns: {
    grid: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231565F5' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%231565F5' fill-opacity='0.05'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
  },
};

