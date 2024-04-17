import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import SignInTemplate from '@/components/templates/SignInTemplate';
import { useUpdateUser, useUserAdditionalInfo } from '@/hooks/useSignIn';
import { supabase } from '@/libs/supabaseClient';

export default function SignIn() {
  const { updateUser } = useUpdateUser();
  const queryClient = useQueryClient();
  useEffect(() => {
    // ! onAuthStateChange 를 사용하는 이유는 React-Query에서 onSuccess 로 처리를 하면 API Fetching 에 필요한 토큰 값을 받을 수 없기 때문
    // ! 토큰을 취득하려면 localStorage 에서 저장된 값을 불러와 하거나 onAuthStateChange 를 사용
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const additionalInfo = useUserAdditionalInfo(session);
        const user = await queryClient.fetchQuery(additionalInfo);
        if (session.user.app_metadata.provider === 'email') return;
        updateUser(user);
      }
    });
    return () => data.subscription.unsubscribe();
  }, []);

  return <SignInTemplate />;
}
