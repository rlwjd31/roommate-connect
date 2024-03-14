import ColorType from '@/types/color.type.ts';

export type IconType =
  | 'character'
  | 'logo'
  | 'welcome'
  | 'seeking-house'
  | 'male'
  | 'female'
  | 'dont-mind-sex'
  | 'dont-mind-pet'
  | 'pet-lover'
  | 'none-pet-lover'
  | 'studio-officetel'
  | 'villa-townhouse'
  | 'apartment'
  | 'single-family-house'
  | 'smoke'
  | 'non-smoke'
  | 'right-arrow'
  | 'left-arrow'
  | 'expand-arrow'
  | 'close';

export type CustomIconType = {
  fill?: ColorType;
  stroke?: ColorType;
};
