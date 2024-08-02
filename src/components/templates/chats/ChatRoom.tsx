import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { supabase } from '@/libs/supabaseClient';
import { UserAtom } from '@/stores/auth.store';
import { Tables } from '@/types/supabase';
import Avatar from '@/components/atoms/Avatar';
import IconButton from '@/components/molecules/IconButton';
import Input from '@/components/atoms/Input';
import { formatDateByCountry } from '@/libs/dateUtils';
import DateMessageBox from '@/components/templates/chats/DateMessageBox';
import UserMessageBox from '@/components/templates/chats/UserMessageBox';
import { useGetMessagesGroupByDate } from '@/hooks/useChat';

type MessageType = Tables<'messages'>;

export default function ChatRoom() {
  const { chatRoomId } = useParams();
  const queryClient = useQueryClient();
  const user = useRecoilValue(UserAtom);
  const location = useLocation();
  const userId = user?.id;
  const chatPartnerId = location.state.chatPartnerId as string;
  const { chatPartnerInfo } = queryClient.getQueryData([
    'chatPartnerInfo',
    user?.id,
    chatPartnerId,
  ]) as {
    newChatCount: number;
    chatPartnerInfo: Tables<'user'>;
  };

  const dateMessages = useGetMessagesGroupByDate(chatRoomId);

  useEffect(() => {
    const chatChannel = supabase
      .channel(`chat_room_messages:${chatRoomId}`) // ? channel에 '/'가 들어가면 정상작동하지 않음...
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        payload => {
          if (payload.eventType === 'INSERT') {
            const {
              created_at,
              message,
              send_by: sendBy,
            } = payload.new as MessageType;
            console.table({ created_at, message, sendBy });

            // * formatDateByCountry method test
            console.log(formatDateByCountry(new Date(created_at)));
          }
        },
      )
      .subscribe();

    return () => {
      chatChannel.unsubscribe();
    };
  }, [chatRoomId]);

  return (
    <Container.FlexCol className="size-full min-h-full">
      {/* chat room header */}
      <Container.FlexRow className="sticky left-0 top-0 min-h-[4.875rem] items-center gap-4 bg-brown6 px-6">
        <Avatar.XS src="https://picsum.photos/200?1" />
        <Container.FlexCol>
          <Typography.SubTitle3 className="font-bold leading-150 text-brown">
            User1234
          </Typography.SubTitle3>
          <Container.FlexRow className="items-center gap-1">
            <div className="size-[0.625rem] animate-pulse rounded-full bg-teal-400" />
            <Typography.Span2 className="text-[0.625rem] leading-150 text-brown/60">
              활동중
            </Typography.Span2>
          </Container.FlexRow>
        </Container.FlexCol>
      </Container.FlexRow>
      {/* chats area */}
      <Container.FlexCol className="h-full gap-8 overflow-y-auto p-6">
        {/* TODO: react query를 이용해서 loading일 때는 대체 처리 하기 */}
        {dateMessages?.map(dateMessage => (
          <DateMessageBox
            key={dateMessage.date.toString()}
            date={dateMessage.date}
          >
            {dateMessage.userMessages.map((userMessage, index) => (
              <UserMessageBox
                key={userMessage.userId + index}
                chatPartnerInfo={chatPartnerInfo}
                userMessage={userMessage}
              />
            ))}
          </DateMessageBox>
        ))}
      </Container.FlexCol>
      {/* Chat Input UI */}
      <Container.FlexRow className="gap-6 px-6 py-9">
        <Container.FlexRow className="w-6 items-center justify-center">
          <IconButton iconType="paper-clip" button="Ghost" />
        </Container.FlexRow>
        <div className="relative w-full">
          <Input className="w-full" placeholder="메세지를 입력해주세요" />
          <IconButton
            iconType="send"
            button="Ghost"
            className="absolute right-5 top-1/2 -translate-y-1/2"
          />
        </div>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
