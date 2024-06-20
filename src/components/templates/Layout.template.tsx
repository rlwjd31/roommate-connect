import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn';
import Header from '@/components/organisms/Header';

// ! TODO: Protected Router를 component로 만들고 HOC로 감싸서 내보내기

type LayoutTemplateType = {
  isLogin?: boolean | null;
};

export default function LayoutTemplate({ isLogin }: LayoutTemplateType) {
  return (
    <>
      <Header isLogin={!!isLogin} />
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

LayoutTemplate.defaultProps = {
  isLogin: false,
};
