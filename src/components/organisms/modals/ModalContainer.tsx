import { ReactNode } from 'react';

import Container from '@/components/atoms/Container';

type ModalContainerType = {
  children: ReactNode;
};

export default function ModalContainer({ children }: ModalContainerType) {
  return (
    <Container.FlexRow className="fixed left-0 top-0 z-50 h-[100vh] w-[100vw] items-center justify-center bg-[#6D6D6D]/50">
      {children}
    </Container.FlexRow>
  );
}
