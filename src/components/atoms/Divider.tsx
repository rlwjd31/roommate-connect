/* eslint-disable react/function-component-definition */
import { ComponentProps, FC } from 'react';

import cn from '@/libs/cn';

// ! lint error => propType "type" is not required, but has no corresponding defaultProps declaration
// ! solve => assign DividerRow as DividerProps and define the DividerRow defaultProps
type DividerProps = ComponentProps<'div'> & {
  type?: 'thin' | 'medium' | 'thick';
};

const thickNess = {
  thin: 'border-[0.5px]', // width: 1px
  medium: 'border-[1px]', // width: 2px
  thick: 'border-[1.5px]', // width: 3px
};

const commonStyle = 'border-brown/60';

export default function Divider() {
  return {};
}

const DividerRow: FC<DividerProps> = ({
  type = 'thin',
  children,
  className,
  ...props
}) => (
  <div className={cn(className, commonStyle, thickNess[type])} {...props}>
    {children}
  </div>
);

const DividerCol: FC<DividerProps> = ({
  type = 'thin',
  children,
  className,
  ...props
}) => (
  <div className={cn(className, commonStyle, thickNess[type])} {...props}>
    {children}
  </div>
);

DividerRow.defaultProps = { type: 'thin' };
DividerCol.defaultProps = { type: 'thin' };

Divider.Row = DividerRow;
Divider.Col = DividerCol;
