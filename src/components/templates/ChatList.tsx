import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import Avatar from '@/components/atoms/Avatar';
import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import { UserAtom } from '@/stores/auth.store';
import { Tables } from '@/types/supabase';
import { formatDateByCountry, isToday } from '@/libs/dateUtils';
import {
  fetchLastReadDate,
  fetchUnReadMessagesCount,
  useUnReadMessageCount,
} from '@/hooks/useChat';

type PointAlertType = {
  content: string | number;
  containerStyle?: string;
  typoStyle?: string;
};

type ChatListState = {
  chatId: string;
  chatPartnerInfo: Tables<'user'>;
  lastMessage: string;
  lastMessageDate: string;
  userIds: string[];
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

const chatRoomId = '2c818fc5-8b49-44ff-8713-b4ece60c36d5';

export default function ChatList() {
  const [chatListState, setChatListState] = useState<ChatListState[]>([]);
  const userInfo = useRecoilValue(UserAtom);
  const unReadMessageCount = useUnReadMessageCount(
    userInfo?.id ?? '',
    chatRoomId,
  );

  console.log('unReadMessageCount', unReadMessageCount);

  useEffect(() => {
    if (userInfo) {
      (async () => {
        // ! PostgreSQL에서 배열 타입의 컬럼에 대해 외래 키 제약 조건을 설정하는 것은 지원되지 않아
        // ! join을 할 수 없고 따로따로 fetch를 날리는 것으로 해결
        const chatRoomListResponse = await supabase
          .from('chat_room')
          .select('*')
          .contains('users', [userInfo.id])
          .order('last_message_date', { ascending: false });

        // * chatRoomList가 없을 때는 null로 들어옴
        if (chatRoomListResponse.error && !chatRoomListResponse.data) {
          const supabaseError = new SupabaseCustomError(
            chatRoomListResponse.error,
            chatRoomListResponse.status,
          );
          console.error({ supabaseError });
          throw supabaseError;
        }

        const chatRoomListPageData = await Promise.all(
          chatRoomListResponse.data.map(async chatRoomInfo => {
            const {
              id: chatId,
              last_message: lastMessage,
              last_message_date: lastMessageDate,
              users: userIds,
            } = chatRoomInfo;

            const chatPartnerId = userIds?.filter(
              userId => userId !== userInfo?.id,
            )[0];

            if (!chatPartnerId)
              throw new Error(`couldn't find chat partner id`);

            const chatPartnerResponse = await supabase
              .from('user')
              .select('*')
              .eq('id', chatPartnerId)
              .single();

            // TODO: chatPartnerResponse error 처리
            if (!chatPartnerResponse.data && chatPartnerResponse.error)
              throw new Error(`Couldn't find chat partner info`);

            return {
              chatId,
              lastMessage,
              lastMessageDate,
              userIds,
              chatPartnerInfo: chatPartnerResponse.data,
            };
          }),
        );
        // TODO: 안 읽은 message count 기능
        setChatListState(chatRoomListPageData);
        return chatRoomListPageData;
      })();
    }
  }, [userInfo]);

  return (
    <Container.FlexCol className="w-full max-w-[21.75rem] border-r-0.5 border-r-brown1">
      <Container.FlexRow className="sticky left-0 top-0 items-center gap-2 bg-brown6 p-6">
        <Typography.SubTitle1 className="translate-y-[1px] text-brown">
          채팅
        </Typography.SubTitle1>
        <PointAlert content={12} containerStyle="self-center" />
      </Container.FlexRow>
      {/* 친구 대화 목록 전체 container */}
      <Container.FlexCol className="gap-2 overflow-y-auto bg-bg p-2">
        {chatListState.map(
          ({
            chatPartnerInfo: { avatar, nickname },
            chatId,
            lastMessage,
            lastMessageDate,
            newChatCount = 2,
          }) => (
            <NavLink
              key={chatId}
              to={`/chats/${chatId}`}
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
