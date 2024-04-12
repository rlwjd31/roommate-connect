import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import cn from '@/libs/cn';
import { supabase } from '@/libs/supabaseClient';
import { UserAtom } from '@/stores/auth.store';

export default function LayoutTemplate() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(UserAtom);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, _session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/sign/in');
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);
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
