import React from 'react';

import cn from '@/libs/cn';

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

type BadgeType = 'Fill' | 'Outline';

type BadgeComponentProps = {
  [key in BadgeType]: (props: BadgeProps) => React.ReactNode;
};
const badgeType: { type: BadgeType; defaultClassName: string }[] = [
  {
    type: 'Fill',
    defaultClassName:
      'group flex items-center bg-brown hover:bg-brown1 hover:shadow-[0_4px_4px_0] hover:shadow-brown/25 active:bg-active-fill active:shadow-none focus:bg-brown focus:outline-subColor1 focus:shadow-[0_4px_4px_0] focus:outline focus:outline-[3px] focus:shadow-brown/25',
  },
  {
    type: 'Outline',
    defaultClassName:
      'group flex bg-bg items-center border-brown border hover:bg-hover-outline hover:shadow-[0_4px_4px_0] hover:shadow-brown/25 active:bg-active-outline active:shadow-none focus:outline-[3px] focus:outline focus:border-transparent focus:outline-subColor1 focus:shadow-[0_4px_4px_0] focus:shadow-brown/25',
  },
];
const Badge = {} as BadgeComponentProps;
badgeType.forEach(({ type, defaultClassName }) => {
  Badge[type] = ({ children, className, ...others }: BadgeProps) =>
    React.createElement(
      'div',
      {
        className: `${defaultClassName} ${cn(className)} `,
        ...others,
      },
      children,
    );
});

export default Badge;
