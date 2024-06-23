import { Outlet } from 'react-router-dom';

import cn from '@/libs/cn';
import Header from '@/components/organisms/Header';
import { useAuthState } from '@/hooks/useSign';

// ! TODO: Protected Router를 component로 만들고 HOC로 감싸서 내보내기

type LayoutTemplateType = {
  isLogin?: boolean | null;
};

export default function LayoutTemplate({ isLogin }: LayoutTemplateType) {
  // * supabase authListener를 등록함과 동시에 isLogin상태를 가져오기 위함
  const [session] = useAuthState();

  return (
    <>
      <Header isLogin={!!session} />
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
