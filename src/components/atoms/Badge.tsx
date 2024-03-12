import Icon from '@/components/atoms/Icon.tsx';
import Button, { ButtonProps } from '@/components/atoms/Button.tsx';
import { IconType } from '@/types/icon.type.ts';

type BadgeProps = {
  text: string;
  // eslint-disable-next-line react/require-default-props
  icon?: IconType;
};

type BadgeButtonProps = BadgeProps & ButtonProps;
export default function Badge(props: BadgeProps) {
  const { text, icon } = props;
  return (
    <div className="rounded-lg">
      {text}
      {icon && <Icon type={icon} />}
    </div>
  );
}
Badge.Button = function BadgeButton(props: BadgeButtonProps) {
  const { text, icon, ...others } = props;
  return (
    <Button.Fill {...others}>
      {text}
      {icon && <Icon type={icon} />}
    </Button.Fill>
  );
};
Badge.defaultProps = { icon: null };
