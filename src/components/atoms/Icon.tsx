import { CustomIconType, IconType } from '@/types/icon.type';
import IconSVG from '@/constants/iconSVG';
import SVGContainer from '@/components/atoms/SVGContainer.tsx';

export type IconProps = CustomIconType & {
  type: IconType;
  className?: string;
};

export default function Icon(props: IconProps) {
  const { type, fill = undefined, stroke = undefined, className = '' } = props;
  return (
    <SVGContainer className={className} fill={fill} stroke={stroke}>
      {IconSVG[type]}
    </SVGContainer>
  );
}

Icon.defaultProps = { className: '' };
