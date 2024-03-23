/* eslint-disable react/function-component-definition */
import { ComponentProps, FC } from 'react';

import cls from '@/libs/cls';

type ContainerProps = ComponentProps<'div'>;

export default function Container({ children, className }: ContainerProps) {
  return <div className={cls(className)}>{children}</div>;
}

const GridContainer: FC<ContainerProps> = ({ children, className }) => (
  <div className={cls('grid', className)}>{children}</div>
);

const FlexRowContainer: FC<ContainerProps> = ({ children, className }) => (
  <div className={cls('flex', className)}>{children}</div>
);

const FlexColumnContainer: FC<ContainerProps> = ({ children, className }) => (
  <div className={cls('flex flex-col', className)}>{children}</div>
);

Container.FlexRow = FlexRowContainer;
Container.FlexCol = FlexColumnContainer;
Container.Grid = GridContainer;
