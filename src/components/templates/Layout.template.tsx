import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import cn from '@/libs/cn';
import Header from '@/components/organisms/Header';
import { useAuthState } from '@/hooks/useSign';
import { createToast } from '@/libs/toast';

export default function LayoutTemplate() {
  // * supabase authListener를 등록함과 동시에 isLogin상태를 가져오기 위함
  const [session] = useAuthState();
  const navigate = useNavigate();
  useEffect(() => {
    if (session) {
      if (
        !session.user.user_metadata.birth ||
        !session.user.user_metadata.gender ||
        !session.user.user_metadata.nickname
      ) {
        createToast('signup-info', '추가정보를 입력해주세요.', {
          isLoading: false,
          type: 'warning',
          autoClose: 3000,
        });
        navigate('/sign/up/info');
      }
    }
  }, [session]);

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
