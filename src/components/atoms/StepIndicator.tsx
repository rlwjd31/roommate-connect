import { ComponentProps } from 'react';

import Container from '@/components/atoms/Container';
import cn from '@/libs/cn';

type CircleProps = ComponentProps<'div'> & {
  isActive?: boolean;
};

function Step({ isActive }: CircleProps) {
  const baseStyle = 'relative size-[7px] rounded-full';

  return <div className={cn(baseStyle, isActive ? 'bg-brown' : 'bg-brown2')} />;
}

Step.defaultProps = {
  isActive: false,
};

type Direction = 'vertical' | 'horizontal';

type StepIndicatorProps = {
  totalStepCount: number;
  currentStep: number;
  direction: Direction;
  className?: string;
};

type ContainerDirectionType = {
  [key in Direction]: key extends 'vertical'
    ? typeof Container.FlexCol
    : typeof Container.FlexRow;
};

export default function StepIndicator({
  totalStepCount = 2,
  currentStep = 0,
  direction: direciton,
  className = '',
}: StepIndicatorProps) {
  const ContainerDirection: ContainerDirectionType = {
    vertical: Container.FlexCol,
    horizontal: Container.FlexRow,
  };

  // ! <ContainerDirection[direciton] />이와 같이 동적 컴포넌트로 할당하는 것은 오류가 남
  const SelectedDirectionalContainer = ContainerDirection[direciton];
  const baseStyle = cn(
    'relative gap-7',
    direciton === 'vertical' ? 'w-[7px]' : 'h-[7-px] w-fit', // ? width: fit-content => flex container의 width를 content로 제한한다.
  );

  // * validate currentStep <= totalStepCount - 1
  if (currentStep > totalStepCount - 1) {
    throw new Error('currentStep should be less than totalStepCount');
  }

  return (
    <SelectedDirectionalContainer className={cn(baseStyle, className)}>
      {direciton === 'vertical' ? (
        <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-brown2" />
      ) : (
        <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-brown2" />
      )}
      {Array(totalStepCount)
        .fill(null)
        .map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Step key={i} isActive={currentStep === i} />
        ))}
    </SelectedDirectionalContainer>
  );
}

StepIndicator.defaultProps = {
  className: '',
};
