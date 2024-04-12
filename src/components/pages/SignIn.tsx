import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import SignInTemplate from '@/components/templates/SignInTemplate';
import { useAuth, userAdditionalInfo, useUpdateUser } from '@/hooks/useSignIn';

export default function SignIn() {
  const { updateUser } = useUpdateUser();
  const queryClient = useQueryClient();
  const session = useAuth();

  useEffect(() => {
    if (session && session.user.app_metadata.provider !== 'email') {
      const queryUserAdditionalInfo = userAdditionalInfo(session);
      queryClient.fetchQuery(queryUserAdditionalInfo).then(data => {
        updateUser(data);
      });
    }
  }, [session]);
  return <SignInTemplate />;
}
