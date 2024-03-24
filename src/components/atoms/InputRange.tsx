import { ComponentProps } from 'react';

import cn from '@/libs/cn';

type InputRangeProps = ComponentProps<'input'>;

// ! translate을 주니 thumb가 track의 위에서 보이게 됨
const inputThumbStyle =
  'slider-thumb:appearance-none slider-thumb:size-6 slider-thumb:rounded-full slider-thumb:bg-bg slider-thumb:ring-1 slider-thumb:ring-brown  slider-thumb:hover:bg-brown4 slider-thumb:hover:ring-2 slider-thumb:hover:ring-offset-2 slider-thumb:hover:ring-brown1 slider-thumb:cursor-pointer slider-thumb:translate-y-0 slider-thumb:pointer-events-auto';
const inputTrackStyle =
  'slider-track:appearance-none slider-track:bg-transparent';

export default function InputRange({
  min,
  max,
  step,
  onChange,
  value,
  className,
}: InputRangeProps) {
  return (
    <input
      className={`pointer-events-none w-full appearance-none ${cn(inputThumbStyle, inputTrackStyle, className)}`}
      onChange={onChange}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
    />
  );
}
