import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn.ts';

export default function LayoutTemplate() {
  return (
    <main className={cn('relative mx-[328px] min-h-screen px-8 pt-[147px]')}>
      <Outlet />
    </main>
  );
}
