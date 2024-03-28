import { ReactNode } from 'react';

import { IconType } from '@/types/icon.type';

const IconSVG: { [key in IconType]: ReactNode } = {
  character: <div />,
  logo: <div />,
  welcome: <div />,
  'seeking-house': <div />,
  male: <div />,
  female: <div />,
  'dont-mind-sex': <div />,
  'dont-mind-pet': <div />,
  'pet-lover': <div />,
  'none-pet-lover': <div />,
  'studio-officetel': <div />,
  'villa-townhouse': <div />,
  apartment: <div />,
  'single-family-house': <div />,
  smoke: <div />,
  'non-smoke': <div />,
  'left-arrow': <div />,
  'right-arrow': (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8L17 8M17 8L10 1M17 8L10 15"
        stroke="#643927"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  close: <div />,
  'expand-arrow': <div />,
};

export default IconSVG;
