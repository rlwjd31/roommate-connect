import React from 'react';

import cn from '@/libs/cn';

export type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

type BadgeType = 'Fill' | 'Outline';

type BadgeComponentProps = {
  [key in BadgeType]: (props: BadgeProps) => React.ReactNode;
};
const badgeType: { type: BadgeType; defaultClassName: string }[] = [
  {
    type: 'Fill',
    defaultClassName:
      'flex group items-center rounded-xl bg-brown border border-brown hover:bg-bg',
  },
  {
    type: 'Outline',
    defaultClassName:
      'flex group items-center rounded-xl bg-bg border border-brown hover:bg-brown',
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
