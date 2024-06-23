import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn';
import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';

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
      <Container className="h-full w-[50%] pl-[4.75rem] pt-[calc(50vh-147px)]">
        <Icon className="translate-y-[-50%]" type="character" />
      </Container>
      <Container className="absolute right-0 w-[50%] pl-[7.125rem]">
        <Outlet />
      </Container>
    </>
  );
}
