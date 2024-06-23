import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import SignInTemplate from '@/components/templates/SignInTemplate';
import {
  useAuthState,
  userAdditionalInfo,
  useUpdateUserAdditionalInfo,
} from '@/hooks/useSign';

export default function SignIn() {
  const { updateUser } = useUpdateUserAdditionalInfo();
  const queryClient = useQueryClient();
  const [session, _] = useAuthState();

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
