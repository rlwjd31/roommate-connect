// eslint-disable-next-file react-/required-default-props
import React from 'react';

import Button, { ButtonProps } from '@/components/atoms/Button.tsx';
import Badge from '@/components/atoms/Badge.tsx';
import cn from '@/libs/cn.ts';
import { IconDirectionType, IconType } from '@/types/icon.type.ts';
import Icon, { IconProps } from '@/components/atoms/Icon.tsx';

type BadgeButtonProps = Omit<IconProps, 'type'> &
  Omit<ButtonProps, 'className'> & {
    children: React.ReactNode;
    className?: string;
    badge?: 'Fill' | 'Outline';
    iconType?: IconType;
    direction?: IconDirectionType;
  };

export default function BadgeButton(props: BadgeButtonProps) {
  const {
    children,
    className,
    badge,
    iconType,
    direction = 'right',
    fill,
    stroke,
    ...others
  } = props;
  const directionStyle = {
    right: '',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };

  const iconComponent = iconType ? (
    <Icon type={iconType} fill={fill} stroke={stroke} />
  ) : null;

  if (badge === 'Fill') {
    return (
      <Button.Ghost {...others}>
        <Badge.Fill className={`${directionStyle[direction]} ${cn(className)}`}>
          {children}
          {iconComponent}
        </Badge.Fill>
      </Button.Ghost>
    );
  }
  if (badge === 'Outline') {
    return (
      <Button.Ghost {...others}>
        <Badge.Outline
          className={`${directionStyle[direction]} ${cn(className)}`}
        >
          {children}
          {iconComponent}
        </Badge.Outline>
      </Button.Ghost>
    );
  }
}
BadgeButton.Fill = function BadgeButtonFill(props: BadgeButtonProps) {
  return <BadgeButton badge="Fill" {...props} />;
};

BadgeButton.Outline = function BadgeButtonOutline(props: BadgeButtonProps) {
  return <BadgeButton badge="Outline" {...props} />;
};
