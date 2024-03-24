import React from 'react';

import Button, { ButtonProps } from '@/components/atoms/Button.tsx';
import Badge from '@/components/atoms/Badge.tsx';
import cn from '@/libs/cn.ts';

type BadgeButtonProps = Omit<ButtonProps, 'className'> & {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  className?: string;
  // eslint-disable-next-line react/require-default-props
  icon?: React.ReactNode;
};

export default function BadgeButton(props: BadgeButtonProps) {
  const { className, icon, children, ...others } = props;
  return (
    <Button.Ghost {...others}>
      <Badge.Fill className={cn(className)} icon={icon}>
        {children}
      </Badge.Fill>
    </Button.Ghost>
  );
}

BadgeButton.Outline = function BadgeButtonOutline(props: BadgeButtonProps) {
  const { className, icon, children, ...others } = props;
  return (
    <Button.Ghost {...others}>
      <Badge.Outline className={cn(className)} icon={icon}>
        {children}
      </Badge.Outline>
    </Button.Ghost>
  );
};
