import React from 'react';

import { CustomIconType } from '@/types/icon.type';
import cn from '@/libs/cn';

type SVGContainerProps = CustomIconType & {
  children: React.ReactNode;
  className?: string;
};
export default function SVGContainer(props: SVGContainerProps) {
  const { children, fill, stroke, className } = props;
  const style = {
    fill: `[&_path]:fill-${fill}`,
    stroke: `[&_path]:stroke-${stroke}`,
  };
  return (
    <div className={cn(`${style.stroke} ${style.fill} ${className}`)}>
      {children}
    </div>
  );
}

SVGContainer.defaultProps = { className: '' };
