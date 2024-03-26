import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn.ts';

export default function SignLayoutTemplate() {
  return (
    <>
      <div
        className={cn(
          'fixed left-0 top-0 z-[-9999] h-screen w-[50vw] bg-subColor1',
        )}
      />
      <Outlet />
    </>
  );
}
