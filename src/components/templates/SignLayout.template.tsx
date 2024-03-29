import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn';
import Container from '@/components/atoms/Container';

export default function SignLayoutTemplate() {
  return (
    <>
      <Container
        className={cn(
          'fixed left-0 top-0 z-[-9999] h-screen w-[51vw] bg-subColor1',
        )}
      />
      <Container
        className={cn(
          'fixed right-0 top-0 z-[-9998] h-screen w-[50vw] bg-bg rounded-xl',
        )}
      />
      <Outlet />
    </>
  );
}
