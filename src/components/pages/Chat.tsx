import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import Container from '@/components/atoms/Container';
import { ChatList } from '@/components/templates/chats';
import { UserAtom } from '@/stores/auth.store';
import { useChatRoomListPageData, useOpenChatChannel } from '@/hooks/useChat';
import { MessageType } from '@/types/chat.type';
import Typography from '@/components/atoms/Typography';
import { CHAT_KEYS } from '@/constants/queryKeys';

export default function Chat() {
  const userInfo = useRecoilValue(UserAtom);
  const location = useLocation();
  const {
    chatRoomListPageData,
    totalNewChatsCount,
    isLoading: isLoadingPageData,
  } = useChatRoomListPageData(userInfo?.id ?? '')!;
  const queryClient = useQueryClient();

  const isChatTopRoute =
    location.pathname === '/chats' || location.pathname === '/chats/';

  useOpenChatChannel<MessageType>({
    channelName: `chatRoomList`,
    realtimeEventFilters: [
      {
        filterOption: {
          event: '*',
          schema: 'public',
          table: 'messages',
        },
        callbackFn: payload => {
          console.log('payload', payload);
          queryClient.invalidateQueries({ queryKey: CHAT_KEYS.ALL });
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
      {isChatTopRoute ? (
        <Container.FlexRow className="size-full items-center justify-center text-brown1">
          <Typography.P3>대화를 시작할 채팅방을 선택해주세요</Typography.P3>
        </Container.FlexRow>
      ) : (
        <Outlet />
      )}
    </Container.FlexRow>
  );
}
