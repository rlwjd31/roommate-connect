import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import cn from '@/libs/cn';
import { supabase } from '@/libs/supabaseClient';
import { UserAtom } from '@/stores/auth.store';
import Header from '@/components/organisms/Header';
import { createToast } from '@/libs/toast';
import { useAuthState } from '@/hooks/useSign';

const nonProtectedRouts = ['/sign/in', '/sign/up', '/component-test'];

// ! TODO: Protected Router를 component로 만들고 HOC로 감싸서 내보내기

export default function LayoutTemplate() {
  const [user, setUser] = useRecoilState(UserAtom);
  const location = useLocation();
  const [showComponent, setShowComponent] = useState(false);
  const session = useAuthState();
  const shouldBeProtected =
    !user && !nonProtectedRouts.includes(location.pathname);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'SIGNED_OUT') setUser(null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let sleep: number | undefined;

    if (shouldBeProtected) {
      sleep = window.setTimeout(() => {
        setShowComponent(true);
      }, 2000);
    } else {
      setShowComponent(false);
    }

    return () => {
      if (!sleep) clearTimeout(sleep);
    };
  }, [shouldBeProtected]);

  if (shouldBeProtected) {
    createToast('redirectToLoginPage', '💡 로그인이 필요한 페이지입니다', {
      autoClose: 2000,
      type: 'error',
      isLoading: false,
      position: 'top-right',
    });

    return showComponent ? (
      <Navigate to="/sign/in" />
    ) : (
      <div className="flex h-screen items-center justify-center bg-green-500">
        Redirect to Login Page...
      </div>
    );
  }
  console.log('in SignIn session', session);

  return (
    <>
      <Header isLogin={!!user} />
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
