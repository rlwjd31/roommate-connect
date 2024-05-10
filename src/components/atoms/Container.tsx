/* eslint-disable react/function-component-definition */
import { ComponentProps, FC } from 'react';

import cn from '@/libs/cn';

type ContainerProps = ComponentProps<'div'>;

export default function Container({
  children,
  className = '',
  ...others
}: ContainerProps) {
  return (
    <div className={cn(className)} {...others}>
      {children}
    </div>
  );
}

const GridContainer: FC<ContainerProps> = ({
  children,
  className = '',
  ...others
}) => (
  <div className={cn('grid', className)} {...others}>
    {children}
  </div>
);

const FlexRowContainer: FC<ContainerProps> = ({
  children,
  className = '',
  ...others
}) => (
  <div className={cn('flex', className)} {...others}>
    {children}
  </div>
);

const FlexColumnContainer: FC<ContainerProps> = ({
  children,
  className = '',
  ...others
}) => (
  <div className={cn('flex flex-col', className)} {...others}>
    {children}
  </div>
);

Container.FlexRow = FlexRowContainer;
Container.FlexCol = FlexColumnContainer;
Container.Grid = GridContainer;
