import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn';

export default function LayoutTemplate() {
  return (
    <main
      className={cn(
        'flex flex-col relative max-w-[1200px] mx-auto h-screen px-8 pt-[147px]',
      )}
    >
      <Outlet />
    </main>
  );
}
