import React from 'react';

import { CustomIconType } from '@/types/icon.type.ts';

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
    <div
      className={`${stroke ? style.stroke : ''} ${fill ? style.fill : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

SVGContainer.defaultProps = { className: '' };
