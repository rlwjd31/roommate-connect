import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import InputRange, { Track } from '@/components/atoms/InputRange';
import Container from '@/components/atoms/Container';
import cn from '@/libs/cn';
import getGradientStop from '@/libs/getGradientStop';

export type InputRangeState = {
  min: number;
  max: number;
};

export type DualInputRangeType = {
  min: number;
  max: number;
  step: number;
  rangeValue: InputRangeState;
  setRangeValue: Dispatch<SetStateAction<InputRangeState>>;
  className?: string;
};

type MinMax = 'min' | 'max';

export default function DualInputRange({
  min = 0,
  max = 100,
  step = 1,
  rangeValue,
  setRangeValue,
  className = '',
}: DualInputRangeType) {
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

  const minGradientStopPoint = getGradientStop(rangeValue.min, min, max);
  const maxGradientStopPoint = getGradientStop(rangeValue.max, min, max);

  return (
    <Container.Grid
      className={cn(
        'w-full grid-cols-1 grid-rows-1 items-center justify-items-center [&>*]:col-start-1 [&>*]:row-start-1',
        className,
      )}
    >
      <Track stopPoints={[minGradientStopPoint, maxGradientStopPoint]} />
      <InputRange
        min={min}
        max={max}
        step={step}
        value={rangeValue.min}
        onChange={e => onChangeInput(e, 'min')}
        overlap
      />
      <InputRange
        min={min}
        max={max}
        step={step}
        value={rangeValue.max}
        onChange={e => onChangeInput(e, 'max')}
        overlap
      />
    </Container.Grid>
  );
}

DualInputRange.defaultProps = {
  className: '',
};
