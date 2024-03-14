import Button, { ButtonProps, ButtonType } from '@/components/atoms/Button.tsx';
import Icon, { IconProps } from '@/components/atoms/Icon.tsx';
import { IconType } from '@/types/icon.type.ts';

type IconButtonProps = Omit<IconProps, 'type'> &
  // eslint-disable-next-line react/require-default-props
  ButtonProps & { iconType: IconType; button?: ButtonType };
export default function IconButton(props: IconButtonProps) {
  const { button, fill, stroke, iconType, children, ...others } = props;
  const IconComponent = <Icon type={iconType} fill={fill} stroke={stroke} />;
  if (button === 'Fill')
    return (
      <Button.Fill {...others}>
        {children}
        {IconComponent}
      </Button.Fill>
    );
  if (button === 'Outline')
    return (
      <Button.Outline {...others}>
        {children}
        {IconComponent}
      </Button.Outline>
    );
  if (button === 'Ghost')
    return (
      <Button.Ghost {...others}>
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
