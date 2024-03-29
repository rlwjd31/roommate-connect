import React from 'react';

import Container from '@/components/atoms/Container';

type CarouselProps = {
  children: React.ReactNode;
  order: number;
};
export default function Carousel(props: CarouselProps) {
  const { children, order } = props;

  const translateX = `-translate-x-[${order * 100}%]`;
  return (
    <Container className="w-full overflow-hidden">
      <Container className={`flex transition ${translateX}`}>
        {children}
      </Container>
    </Container>
  );
}
