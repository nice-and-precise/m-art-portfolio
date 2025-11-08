import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pottery & Ceramics Color Palette
        clay: {
          50: '#FAF8F5',    // Cream
          100: '#F5F1EA',   // Light Clay
          200: '#E6D5C3',   // Warm Clay
          300: '#D4C4B0',   // Warm Tan
          400: '#C4A57B',   // Sand
          500: '#9C8671',   // Terracotta (Primary Brand)
          600: '#8B7355',   // Darker Terracotta
          700: '#6B5544',   // Fired Clay
          800: '#4A3F35',   // Deep Brown
          900: '#3D2F24',   // Dark Earth
        },
        glaze: {
          celadon: '#7FA5A3',  // Celadon green
          sage: '#8B9D83',      // Sage green
          honey: '#D4A574',     // Honey glaze
          matte: '#F0EBE3',     // Matte white
        },
        // Keep existing primary colors for backward compatibility
        primary: {
          50: '#FAF8F5',
          100: '#F5F1EA',
          200: '#E6D5C3',
          300: '#D4C4B0',
          400: '#C4A57B',
          500: '#9C8671',
          600: '#8B7355',
          700: '#6B5544',
          800: '#4A3F35',
          900: '#3D2F24',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-in-slow': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
