/* eslint-disable react/require-default-props */
import React from 'react';

import Button, { ButtonProps } from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import { IconDirectionType, IconType } from '@/types/icon.type';
import Icon, { IconProps } from '@/components/atoms/Icon';

type BadgeButtonProps = Omit<IconProps, 'type'> &
  Omit<ButtonProps, 'className'> & {
    children: React.ReactNode;
    className?: string;
    badge?: 'Fill' | 'Outline';
    iconType?: IconType;
    direction?: IconDirectionType;
    iconProps?: IconProps;
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
    iconProps,
    ...others
  } = props;
  const directionStyle = {
    right: '',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };

  const iconComponent = iconType ? (
    <Icon type={iconType} fill={fill} stroke={stroke} {...iconProps} />
  ) : null;

  if (badge === 'Fill') {
    return (
      <Button.Ghost {...others}>
        <Badge.Fill className={`${directionStyle[direction]} ${className}`}>
          {children}
          {iconComponent}
        </Badge.Fill>
      </Button.Ghost>
    );
  }
  if (badge === 'Outline') {
    return (
      <Button.Ghost {...others}>
        <Badge.Outline className={`${directionStyle[direction]} ${className}`}>
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
