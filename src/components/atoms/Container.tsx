/* eslint-disable react/function-component-definition */
import { ComponentProps, FC } from 'react';

import cn from '@/libs/cn';

type ContainerProps = ComponentProps<'div'>;

export default function Container({
  children,
  className = '',
}: ContainerProps) {
  return <div className={cn(className)}>{children}</div>;
}

const GridContainer: FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={cn('grid', className)}>{children}</div>
);

const FlexRowContainer: FC<ContainerProps> = ({ children, className = '' }) => (
  <div className={cn('flex', className)}>{children}</div>
);

const FlexColumnContainer: FC<ContainerProps> = ({
  children,
  className = '',
}) => <div className={cn('flex flex-col', className)}>{children}</div>;

Container.FlexRow = FlexRowContainer;
Container.FlexCol = FlexColumnContainer;
Container.Grid = GridContainer;
