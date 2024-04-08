import { ComponentProps } from 'react';

import cn from '@/libs/cn';
import Typography from '@/components/atoms/Typography';
import Link from '@/components/atoms/Link';

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
  const baseStyle = 'flex items-center gap-7 text-brown2';
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
