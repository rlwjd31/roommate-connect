import { IconType } from '@/types/icon.type';
import IconSVG from '@/constants/iconSVG';

type IconProps = {
  type: IconType;
};

export default function Icon(props: IconProps) {
  const { type } = props;
  return IconSVG[type];
}
