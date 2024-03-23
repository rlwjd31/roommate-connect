import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import InputRange from '@/components/atoms/InputRange';
import Container from '@/components/atoms/Container';
import tailwindConfig from '../../../tailwind.config';

export type InputRangeState = {
  min: number;
  max: number;
};

type DualInputRangetype = {
  min: number;
  max: number;
  step: number;
  rangeValue: InputRangeState;
  setRangeValue: Dispatch<SetStateAction<InputRangeState>>;
};

type MinMax = 'min' | 'max';

export default function DualInputRange({
  min = 0,
  max = 100,
  step = 1,
  rangeValue,
  setRangeValue,
}: DualInputRangetype) {
  // * ensure range.min < range.max function
  const validateRangeValue =
    (type: MinMax, e: ChangeEvent<HTMLInputElement>) =>
    (prev: InputRangeState) => ({
      ...prev,
      min:
        type === 'min' ? Math.min(+e.target.value, prev.max - step) : prev.min,
      max:
        type === 'max' ? Math.max(+e.target.value, prev.min + step) : prev.max,
    });

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>, type: MinMax) =>
    setRangeValue(validateRangeValue(type, e));

  const { brown: accentTrackColor, brown2: noneAccentTrackColor } =
    tailwindConfig.theme.extend.colors;

  // * get thumb's position as % from the width of the input track.
  const getGradientStop = (stopPoint: number): string =>
    Math.round((stopPoint / Math.abs(max - min)) * 100).toString();

  const minGradientStopPoint = getGradientStop(rangeValue.min);
  const maxGradientStopPoint = getGradientStop(rangeValue.max);

  return (
    <Container.Grid className="w-full">
      {/* 
        input type range custom track 
        - apply inline style avoid tailwind dynamic style error
      */}
      <div
        className="relative h-2 w-full translate-y-[-200%] rounded-lg"
        style={{
          backgroundImage: `linear-gradient(
              to right, 
              ${noneAccentTrackColor} 0%, 
              ${noneAccentTrackColor} ${minGradientStopPoint}%,
              ${accentTrackColor} ${minGradientStopPoint}%,
              ${accentTrackColor} ${maxGradientStopPoint}%,
              ${noneAccentTrackColor} ${maxGradientStopPoint}%, 
              ${noneAccentTrackColor} 100%)`,
        }}
      />
      <InputRange
        min={min}
        max={max}
        step={step}
        value={rangeValue.min}
        onChange={e => onChangeInput(e, 'min')}
        className="col-start-1 row-start-1"
      />
      <InputRange
        min={min}
        max={max}
        step={step}
        value={rangeValue.max}
        onChange={e => onChangeInput(e, 'max')}
        className="col-start-1 row-start-1"
      />
    </Container.Grid>
  );
}
