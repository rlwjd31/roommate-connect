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
      Head1: ['3rem', { fontWeight: 700 }],
      Head2: ['2rem', { fontWeight: 600 }],
      Head3: ['1.5rem', { fontWeight: 600 }],
      SubTitle1: ['1.25rem', { fontWeight: 600 }],
      SubTitle2: ['1.125rem', { fontWeight: 600 }],
      SubTitle3: ['1rem', { fontWeight: 600 }],
      P1: ['1.25rem', { fontWeight: 400 }],
      P2: ['1.125rem', { fontWeight: 400 }],
      P3: ['1rem', { fontWeight: 400 }],
      Span1: ['0.875rem', { fontWeight: 400 }],
      Span2: ['0.75rem', { fontWeight: 400 }],
      SpanMid1: ['0.875rem', { fontWeight: 500 }],
      SpanMid2: ['0.75rem', { fontWeight: 500 }],
    },
    fontFamily: {
      'Noto-Sans-KR': ['Noto Sans KR'],
    },
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(!?)(bg|text|fill|stroke)-(bg|subColor1|subColor2|brown|brown1|brown2|brown3|brown4|brown5|point)/,
      variants: ['hover', '[&_path]'],
    },
  ],
} satisfies Config;
