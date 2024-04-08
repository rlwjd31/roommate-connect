import { ComponentProps } from 'react';

import cn from '@/libs/cn';
import Typography from '@/components/atoms/Typography';
import Link from '@/components/atoms/Link';

type StepProps = ComponentProps<'div'> & {
  isActive?: boolean;
  className?: string;
};

function Step({ isActive, className }: StepProps) {
  // ! 이것도 저번에 공부해서 얻은 stacking context와 관련있음.
  // ! 이번에는 link의 after보다 상위로 stacking context를 생성하여 line이 보이지 않게하기 위해
  // ! flex container내 z-index를 가지면 새로운 stacking context를 생성할 수 있으므로
  // ! z-10을 주어 해결함.
  const baseStyle = 'size-[7px] rounded-full z-10';

  return (
    <div
      className={cn(baseStyle, isActive ? 'bg-brown' : 'bg-brown2', className)}
    />
  );
}

Step.defaultProps = {
  isActive: false,
  className: '',
};

type StepIndicatorProps = {
  className?: string;
  isActive?: boolean;
  labelName: string;
  routePath: string;
};

export default function StepLink({
  labelName,
  isActive,
  routePath,
  className,
}: StepIndicatorProps) {
  const baseStyle = 'relative flex items-center gap-7 text-brown2 py-[11px]';

  return (
    <Link className={cn(baseStyle, className)} to={routePath}>
      <Step isActive={isActive} />
      <Typography.Span1 className={cn(isActive && 'text-brown')}>
        {labelName}
      </Typography.Span1>
    </Link>
  );
}

StepLink.defaultProps = {
  className: '',
  isActive: false,
};
