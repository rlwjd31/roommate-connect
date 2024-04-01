import { CustomIconType, IconType } from '@/types/icon.type';
import IconSVG from '@/constants/iconSVG';
import SVGContainer from '@/components/atoms/SVGContainer';
import cn from '@/libs/cn';

export type IconProps = CustomIconType & {
  type: IconType;
  className?: string;
};

export default function Icon(props: IconProps) {
  const { type, fill = undefined, stroke = undefined, className = '' } = props;
  return (
    <SVGContainer className={cn(className)} fill={fill} stroke={stroke}>
      {IconSVG[type]}
    </SVGContainer>
  );
}

Icon.defaultProps = { className: '' };
