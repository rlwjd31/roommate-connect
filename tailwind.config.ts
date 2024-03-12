import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      bg: '#FFFAF5',
      subColor1: '#FFDBA5',
      subColor2: '#FFB186',
      brown: '#643927',
      brown1: '#966E5D',
      brown2: '#BCA79E',
      brown3: '#DDCFC4',
      brown4: '#FFF7F1',
      brown5: '#FFFEFB',
      point: '#FF7759',
    },
    fontSize: {
      '3xl': '3rem',
      '2xl': '2rem',
      xl: '1.5rem',
      l: '1.25rem',
      ml: '1.125rem',
      m: '1rem',
      s: '0.875rem',
      xs: '0.75rem',
    },
    fontFamily: {
      'Noto-Sans-KR': ['Noto Sans KR'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
