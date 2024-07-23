import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import MyBookmarkTemplate from '@/components/templates/MyBookmark.template';
import { UserAtom } from '@/stores/auth.store';
import { useMyBookmarkList } from '@/hooks/useMyBookmark';

export default function MyBookmark() {
  const user = useRecoilValue(UserAtom);
  const { data } = useQuery(useMyBookmarkList(user));
  console.log(data);
  return <MyBookmarkTemplate />;
}
