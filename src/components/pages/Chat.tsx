import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import Container from '@/components/atoms/Container';
import { ChatList } from '@/components/templates/chats';
import { UserAtom } from '@/stores/auth.store';
import { useChatRoomListPageData } from '@/hooks/useChat';
import { supabase } from '@/libs/supabaseClient';

export default function Chat() {
  const userInfo = useRecoilValue(UserAtom);
  const {
    chatRoomListPageData,
    totalNewChatsCount,
    isLoading: isLoadingPageData,
  } = useChatRoomListPageData(userInfo?.id ?? '')!;
  const queryClient = useQueryClient();

  useEffect(() => {
    const chatChannel = supabase
      .channel(`chatRoomList`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => {
          // * refetch chatListPageData
          queryClient.invalidateQueries({ queryKey: ['chatRoomList'] });
          queryClient.invalidateQueries({ queryKey: ['chatPartnerInfo'] });
        },
      )
      .subscribe();

    return () => {
      chatChannel.unsubscribe();
    };
  }, [queryClient]);

  if (isLoadingPageData) return <h1>...loading chat room list data</h1>;

  return (
    <Container.FlexRow className="min-h-full w-full">
      <ChatList
        chatRoomListPageData={chatRoomListPageData}
        totalNewChatsCount={totalNewChatsCount}
      />
      <Outlet />
    </Container.FlexRow>
  );
}
