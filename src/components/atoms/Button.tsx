import React, { ComponentProps, ReactNode } from 'react';

import cn from '@/libs/cn';

export type ButtonProps = ComponentProps<'button'> & { isActive?: boolean };
export type ButtonType = 'Fill' | 'Outline' | 'Ghost';

type ButtonComponentProps = {
  [key in ButtonType]: (props: ButtonProps) => ReactNode;
};

const buttonType: { type: ButtonType; defaultClassName: string }[] = [
  {
    type: 'Fill',
    defaultClassName:
      'group flex items-center border border-brown bg-brown hover:bg-bg',
  },
  {
    type: 'Outline',
    defaultClassName:
      'group flex bg-bg items-center border-brown border hover:bg-brown',
  },
  {
    type: 'Ghost',
    defaultClassName: 'group items-center flex bg-transparent',
  },
];

const Button = {} as ButtonComponentProps;

buttonType.forEach(({ type, defaultClassName }) => {
  Button[type] = ({
    children,
    className,
    isActive = false,
    ...others
  }: ButtonProps) =>
    React.createElement(
      'button',
      {
        className: `${defaultClassName} ${cn(className, isActive && 'border-transparent bg-brown4 outline outline-[3px] outline-point')}`,
        type: 'button',
        ...others,
      },
      children,
    );
});

export default Button;
