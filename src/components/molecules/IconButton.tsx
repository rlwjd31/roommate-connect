// eslint-disable-next-file react-/required-default-props
import Button, { ButtonProps, ButtonType } from '@/components/atoms/Button.tsx';
import Icon, { IconProps } from '@/components/atoms/Icon.tsx';
import { IconDirectionType, IconType } from '@/types/icon.type.ts';

type IconButtonProps = Omit<IconProps, 'type'> &
  ButtonProps & {
    iconType: IconType;
    button?: ButtonType;
    direction?: IconDirectionType;
  };
export default function IconButton(props: IconButtonProps) {
  const {
    button,
    fill,
    stroke,
    iconType,
    direction = 'right',
    children,
    ...others
  } = props;
  const IconComponent = <Icon type={iconType} fill={fill} stroke={stroke} />;
  const directionStyle = {
    right: '',
    left: 'flex-row-reverse',
    top: 'flex-col-reverse',
    bottom: 'flex-col',
  };
  if (button === 'Fill')
    return (
      <Button.Fill
        className={`flex items-center ${directionStyle[direction]}`}
        {...others}
      >
        {children}
        {IconComponent}
      </Button.Fill>
    );
  if (button === 'Outline')
    return (
      <Button.Outline
        className={`flex items-center ${directionStyle[direction]}`}
        {...others}
      >
        {children}
        {IconComponent}
      </Button.Outline>
    );
  if (button === 'Ghost')
    return (
      <Button.Ghost
        className={`flex items-center ${directionStyle[direction]}`}
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
