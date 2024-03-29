/* eslint-disable react/require-default-props */
import Button, { ButtonProps, ButtonType } from '@/components/atoms/Button';
import Icon, { IconProps } from '@/components/atoms/Icon';
import { IconDirectionType, IconType } from '@/types/icon.type';

type IconButtonProps = Omit<IconProps, 'type'> &
  ButtonProps & {
    iconType: IconType;
    button?: ButtonType;
    direction?: IconDirectionType;
    iconProps?: IconProps;
  };
export default function IconButton(props: IconButtonProps) {
  const {
    button,
    fill,
    stroke,
    iconType,
    direction = 'right',
    children,
    className = '',
    iconProps,
    ...others
  } = props;
  const IconComponent = (
    <Icon type={iconType} fill={fill} stroke={stroke} {...iconProps} />
  );
  const directionStyle = {
    right: '',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };
  if (button === 'Fill')
    return (
      <Button.Fill
        className={`${directionStyle[direction]} ${className}`}
        {...others}
      >
        {children}
        {IconComponent}
      </Button.Fill>
    );
  if (button === 'Outline')
    return (
      <Button.Outline
        className={`${directionStyle[direction]} ${className}`}
        {...others}
      >
        {children}
        {IconComponent}
      </Button.Outline>
    );
  if (button === 'Ghost')
    return (
      <Button.Ghost
        className={`${directionStyle[direction]} ${className}`}
        {...others}
      >
        {children}
        {IconComponent}
      </Button.Ghost>
    );
  return null;
}

IconButton.Fill = function IconButtonFill(props: IconButtonProps) {
  return <IconButton button="Fill" {...props} />;
};
IconButton.Outline = function IconButtonOutline(props: IconButtonProps) {
  return <IconButton button="Outline" {...props} />;
};
IconButton.Ghost = function IconButtonGhost(props: IconButtonProps) {
  return <IconButton button="Ghost" {...props} />;
};
