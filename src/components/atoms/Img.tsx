import { ComponentProps } from 'react';

import Container from '@/components/atoms/Container';
import cn from '@/libs/cn';

type ImgProps = ComponentProps<'img'>;

export default function Img({ src, alt, className, ...others }: ImgProps) {
  return (
    <Container.FlexRow
      className={cn('w-full rounded-xl bg-point overflow-hidden', className)}
    >
      <img
        className="w-full max-w-full object-cover"
        src={src}
        alt={alt}
        {...others}
      />
    </Container.FlexRow>
  );
}
