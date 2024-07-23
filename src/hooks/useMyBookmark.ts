import { queryOptions } from '@tanstack/react-query';

import { UserType } from '@/types/auth.type';
import { supabase } from '@/libs/supabaseClient';

export const useMyBookmarkList = (user: UserType | null) =>
  queryOptions({
    queryKey: ['bookmark', 'list', user?.id],
    queryFn: async () =>
      supabase
        .from('user_bookmark')
        .select('house_id, house(*)')
        .eq('id', user?.id ?? ''),
    enabled: !!user,
  });
