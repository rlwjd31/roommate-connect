import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn';
import Header from '@/components/organisms/Header';

export default function LayoutTemplate() {
  return (
    <>
      <Header isLogin />
      <main
        className={cn(
          'flex flex-col relative max-w-[1200px] mx-auto h-screen px-8 pt-[148px]',
        )}
      >
        <Outlet />
      </main>
    </>
  );
}
