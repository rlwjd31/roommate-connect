import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import { isEnglish } from '@/libs/checkLanguage';
import Avatar from '@/components/atoms/Avatar';
import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import { UserAtom } from '@/stores/auth.store';

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

// ! TODO: fetch chatList ordered by latest from supabase
// ! TODO: navigateUrl은 그냥 chatId를 이용하면 돼서 나중에는 필요 없음.
const chats = [
  {
    chatId: '1',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '1',
  },
  {
    chatId: '2',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '2',
  },
  {
    chatId: '3',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '3',
  },
  {
    chatId: '4',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '4',
  },
  {
    chatId: '5',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '5',
  },
  {
    chatId: '6',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '6',
  },
  {
    chatId: '7',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: 'hi',
    newChatCount: 2,
    navigateUrl: '7',
  },
  {
    chatId: '8',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '8',
  },
  {
    chatId: '9',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: 'hello',
    newChatCount: 2,
    navigateUrl: '9',
  },
  {
    chatId: '10',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '10',
  },
  {
    chatId: '11',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '11',
  },
  {
    chatId: '12',
    avatarUrl: 'https://picsum.photos/200',
    nickname: 'User1234',
    lastMessageDate: '오후 9:48',
    lastMessage: '안녕하세요',
    newChatCount: 2,
    navigateUrl: '12',
  },
];

export default function ChatList() {
  const [chatListState, setChatListState] = useState(null);
  const userInfo = useRecoilValue(UserAtom);
  useEffect(() => {
    if (userInfo) {
      (async () => {
        // ! PostgreSQL에서 배열 타입의 컬럼에 대해 외래 키 제약 조건을 설정하는 것은 지원되지 않아
        // ! join을 할 수 없고 따로따로 fetch를 날리는 것으로 해결
        const chatListResponse = await supabase
          .from('chat_room')
          .select('*')
          .contains('users', [userInfo.id]);

        if (chatListResponse.error || !chatListResponse.data) {
          const supabaseError = new SupabaseCustomError(
            chatListResponse.error,
            chatListResponse.status,
          );
          console.error({ supabaseError });
          throw supabaseError;
        }

        const chatListPageData = await Promise.all(
          chatListResponse.data.map(async chatRoomInfo => {
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

            return {
              chatId,
              lastMessage,
              lastMessageDate,
              userIds,
              chatPartnerInfo: chatPartnerResponse.data
                ? { ...chatPartnerResponse.data }
                : null,
            };
          }),
        );
        // TODO: 안 읽은 message count 기능
        setChatListState(chatListPageData);
        return chatListPageData;
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
        {chats.map(
          ({
            avatarUrl,
            chatId,
            lastMessage,
            navigateUrl,
            nickname,
            lastMessageDate,
            newChatCount,
          }) => (
            <NavLink
              key={chatId}
              to={navigateUrl}
              className={({ isActive }) =>
                cn(
                  'flex items-start gap-4 rounded-xl p-3 hover:bg-brown6',
                  isActive ? 'bg-brown7' : 'bg-bg',
                )
              }
            >
              {/* shrink를 0으로 설정하지 않으면 이미지가 깨짐 */}
              <Avatar.M src={avatarUrl} />
              {/* <Img className="size-12 shrink-0 rounded-full" src={avatarUrl} /> */}
              <Container.FlexCol className="w-full">
                <Container.FlexRow className="items-center justify-between">
                  <Typography.Span1
                    lang={isEnglish(nickname) ? 'en' : 'ko'}
                    className="font-bold leading-150 text-brown"
                  >
                    {nickname}
                  </Typography.Span1>
                  <Typography.Span2 className="font-semibold leading-150 text-brown2">
                    {lastMessageDate}
                  </Typography.Span2>
                </Container.FlexRow>
                <Container.FlexRow className="items-center justify-between">
                  <Typography.Span2
                    lang={isEnglish(lastMessage) ? 'en' : 'ko'}
                    className="font-semibold leading-150 text-brown2"
                  >
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
