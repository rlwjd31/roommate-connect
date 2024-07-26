import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import Avatar from '@/components/atoms/Avatar';
import { UserAtom } from '@/stores/auth.store';
import { formatDateByCountry, isToday } from '@/libs/dateUtils';
import { useChatRoomListPageData } from '@/hooks/useChat';
import { supabase } from '@/libs/supabaseClient';

type PointAlertType = {
  content: string | number;
  containerStyle?: string;
  typoStyle?: string;
};

export function PointAlert({
  content,
  containerStyle,
  typoStyle,
}: PointAlertType) {
  return (
    <Container.FlexRow
      className={cn(
        'w-fit items-center justify-center rounded-full bg-point pl-2 pr-[7px] pt-[4px] pb-[5px]',
        containerStyle,
      )}
    >
      <Typography.Span2 className={cn('font-semibold text-bg', typoStyle)}>
        {content}
      </Typography.Span2>
    </Container.FlexRow>
  );
}

PointAlert.defaultProps = {
  containerStyle: '',
  typoStyle: '',
};

export default function ChatList() {
  const userInfo = useRecoilValue(UserAtom);
  const { chatRoomListPageData, totalNewChatsCount } =
    useChatRoomListPageData(userInfo?.id ?? '')!;
  const queryClient = useQueryClient();

  useEffect(() => {
    const chatChannel = supabase
      .channel(`chatRoomList`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        () => {
          queryClient.invalidateQueries({ queryKey: ['chatRoomList'] });
          queryClient.invalidateQueries({ queryKey: ['chatPartnerInfo'] });
        },
      )
      .subscribe();

    return () => {
      chatChannel.unsubscribe();
    };
  }, [queryClient]);

  return (
    <Container.FlexCol className="w-full max-w-[21.75rem] border-r-0.5 border-r-brown1">
      <Container.FlexRow className="sticky left-0 top-0 items-center gap-2 bg-brown6 p-6">
        <Typography.SubTitle1 className="text-brown">채팅</Typography.SubTitle1>
        <PointAlert
          content={totalNewChatsCount}
          containerStyle="self-center"
        />
      </Container.FlexRow>
      {/* 친구 대화 목록 전체 container */}
      <Container.FlexCol className="gap-2 overflow-y-auto bg-bg p-2">
        {chatRoomListPageData.map(
          ({
            chatPartnerInfo: { avatar, nickname },
            chatRoomId,
            lastMessage,
            lastMessageDate,
            newChatCount,
          }) => (
            <NavLink
              key={chatRoomId}
              to={`/chats/${chatRoomId}`}
              className={({ isActive }) =>
                cn(
                  'flex items-start gap-4 rounded-xl p-3 hover:bg-brown6',
                  isActive ? 'bg-brown7' : 'bg-bg',
                )
              }
            >
              {/* shrink를 0으로 설정하지 않으면 이미지가 깨짐 */}
              <Avatar.M src={avatar ?? ''} />
              <Container.FlexCol className="w-full">
                <Container.FlexRow className="items-center justify-between">
                  <Typography.Span1 className="font-bold leading-150 text-brown">
                    {nickname}
                  </Typography.Span1>
                  <Typography.Span2 className="font-medium leading-150 text-brown2">
                    {formatDateByCountry(
                      new Date(lastMessageDate),
                      isToday(new Date(), new Date(lastMessageDate)),
                    )}
                  </Typography.Span2>
                </Container.FlexRow>
                <Container.FlexRow className="items-center justify-between">
                  <Typography.Span2 className="font-medium leading-150 text-brown2">
                    {lastMessage}
                  </Typography.Span2>
                  <PointAlert content={newChatCount} />
                </Container.FlexRow>
              </Container.FlexCol>
            </NavLink>
          ),
        )}
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
