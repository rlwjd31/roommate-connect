import { useLocation, useParams } from 'react-router-dom';
import { KeyboardEvent, useEffect, useRef } from 'react';
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
import DateMessageBox from '@/components/templates/chats/DateMessageBox';
import UserMessageBox from '@/components/templates/chats/UserMessageBox';
import { useGetMessagesGroupByDate, useSendMessage } from '@/hooks/useChat';
import { MessageType } from '@/types/chat.type';

export default function ChatRoom() {
  // ! chatRoomId는 무조건 존재하지만 undefined로도 추론되어 제네릭으로 타입 명시 후
  // ! 타입 단언 이용
  const params = useParams<{ chatRoomId: string }>();
  const chatRoomId = params.chatRoomId as string;
  const queryClient = useQueryClient();
  const user = useRecoilValue(UserAtom);
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const chatPartnerId = location.state.chatPartnerId as string;
  const sendMessage = useSendMessage();
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
            if (payload.new as MessageType) {
              queryClient.invalidateQueries({
                queryKey: ['MessagesGroupByDate'],
              });
            }
          }
        },
      )
      .subscribe();

    return () => {
      chatChannel.unsubscribe();
    };
  }, [chatRoomId, queryClient]);

  const onClickSendMessage = async () => {
    if (inputRef.current) {
      const response = await sendMessage.mutate({
        content: inputRef.current.value,
        chatRoomId,
        // ! user는 protected router에서 user가 있는 경우만 현재 컴포넌트를 rendering하므로 !를 이용하여 type error 해결
        sendBy: user?.id as string,
      });
      console.log('response =>', { response });
    }
  };

  const onEnterSendMessage = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      const response = await sendMessage.mutate({
        content: inputRef.current.value,
        chatRoomId,
        sendBy: user?.id as string,
      });
      console.log('response =>', { response });
    }
  };

  return (
    <Container.FlexCol className="size-full min-h-full">
      {/* chat room header */}
      <Container.FlexRow className="sticky left-0 top-0 min-h-[4.875rem] items-center gap-4 bg-brown6 px-6">
        <Avatar.XS src={chatPartnerInfo.avatar ?? ''} />
        <Container.FlexCol>
          <Typography.SubTitle3 className="font-bold leading-150 text-brown">
            {chatPartnerInfo.nickname}
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
      <Container.FlexCol className="h-full justify-end gap-8 overflow-y-auto bg-green-100 p-6">
        {/* TODO: react query를 이용해서 loading일 때는 대체 처리 하기 */}
        {dateMessages?.map(dateMessage => (
          <DateMessageBox
            key={dateMessage.date.toString()}
            date={dateMessage.date}
          >
            {dateMessage.userMessages.map(userMessage => (
              <UserMessageBox
                key={userMessage.userId + userMessage.lastCreatedAt.toString()}
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
          <Input
            ref={inputRef}
            className="w-full"
            placeholder="메세지를 입력해주세요"
            onKeyDown={onEnterSendMessage}
          />
          <IconButton
            iconType="send"
            button="Ghost"
            className="absolute right-5 top-1/2 -translate-y-1/2"
            onClick={onClickSendMessage}
          />
        </div>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
