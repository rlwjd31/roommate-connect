import React, { ComponentProps, ReactNode } from 'react';

import cn from '@/libs/cn.ts';

export type ButtonProps = ComponentProps<'button'>;
export type ButtonType = 'Fill' | 'Outline' | 'Ghost';

type ButtonComponentProps = {
  [key in ButtonType]: (props: ButtonProps) => ReactNode;
};

const buttonType: { type: ButtonType; defaultClassName: string }[] = [
  {
    type: 'Fill',
    defaultClassName:
      'group flex items-center bg-brown hover:bg-bg hover:outline hover:outline-brown',
  },
  {
    type: 'Outline',
    defaultClassName:
      'group flex bg-bg items-center outline outline-brown hover:bg-brown hover:outline-none',
  },
  {
    type: 'Ghost',
    defaultClassName: 'group items-center flex bg-transparent',
  },
];

const Button = {} as ButtonComponentProps;

buttonType.forEach(({ type, defaultClassName }) => {
  Button[type] = ({ children, className, ...others }: ButtonProps) =>
    React.createElement(
      'button',
      {
        className: `${defaultClassName} ${cn(className)}`,
        type: 'button',
        ...others,
      },
      children,
    );
});

export default Button;
