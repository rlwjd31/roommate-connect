import { Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import Container from '@/components/atoms/Container';
import { ChatList } from '@/components/templates/chats';
import { UserAtom } from '@/stores/auth.store';
import { useChatRoomListPageData, useOpenChatChannel } from '@/hooks/useChat';
import { MessageType } from '@/types/chat.type';

export default function Chat() {
  const userInfo = useRecoilValue(UserAtom);
  const {
    chatRoomListPageData,
    totalNewChatsCount,
    isLoading: isLoadingPageData,
  } = useChatRoomListPageData(userInfo?.id ?? '')!;
  const queryClient = useQueryClient();

  useOpenChatChannel<MessageType>({
    channelName: `chatRoomList`,
    realtimeEventFilters: [
      {
        filterOption: {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        callbackFn: () => {
          queryClient.invalidateQueries({ queryKey: ['chatRoomList'] });
          queryClient.invalidateQueries({ queryKey: ['chatPartnerInfo'] });
        },
      },
    ],
    useEffectDependencies: [queryClient],
  });

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
