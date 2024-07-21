import { useParams } from 'react-router-dom';
import { ReactNode, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Input from '@/components/atoms/Input';
import IconButton from '@/components/molecules/IconButton';
import Avatar from '@/components/atoms/Avatar';
import { supabase } from '@/libs/supabaseClient';
import { UserAtom } from '@/stores/auth.store';
import { Database } from '@/types/supabase';
import { formatDateByCountry } from '@/libs/formatDate';

type MessageType = Database['public']['Tables']['messages']['Row'];

type DateMessageBoxProps = {
  children: ReactNode;
  date: Date;
};

function DateMessageBox({ children, date }: DateMessageBoxProps) {
  const messageDate = formatDateByCountry(date, 'ko-KR');

  return (
    <Container.FlexCol>
      <Typography.Span1 className="mx-auto w-fit rounded-[1.25rem] bg-brown6 px-4 py-2 font-semibold text-brown">
        {messageDate}
      </Typography.Span1>
      {children}
    </Container.FlexCol>
  );
}

export default function ChatRoom() {
  const { chatId } = useParams();
  const user = useRecoilValue(UserAtom);
  const userId = user?.id;

  useEffect(() => {
    const chatChannel = supabase
      .channel(`chat_room_messages:${chatId}`) // ? channel에 '/'가 들어가면 정상작동하지 않음...
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
            console.log(formatDateByCountry(new Date(created_at), 'ko-KR'));
          }
        },
      )
      .subscribe();

    return () => {
      chatChannel.unsubscribe();
    };
  }, []);

  // ! TODO: image 클릭시 userProfileModal
  return (
    <Container.FlexCol className="size-full min-h-full bg-teal-500">
      {/* chat room header */}
      <Container.FlexRow className="sticky left-0 top-0 items-center gap-4 bg-brown6 p-6">
        <Avatar.XS src="https://picsum.photos/200?1" />
        <Container.FlexCol>
          <Typography.SubTitle1
            lang="en"
            className="font-bold leading-150 text-brown"
          >
            User1234
          </Typography.SubTitle1>
          <Container.FlexRow className="items-center gap-1">
            <div className="size-[10px] translate-y-[-1px] animate-pulse rounded-full bg-teal-400" />
            <Typography.Span2 className="leading-150 text-brown/60">
              활동중
            </Typography.Span2>
          </Container.FlexRow>
        </Container.FlexCol>
      </Container.FlexRow>
      {/* chats area */}
      <Container.FlexCol className="h-full gap-8 overflow-y-auto p-6">
        {/* date별로 묶을 UI */}
        <DateMessageBox date={new Date(2024, 0, 1)}>
          {/* 유저에 따른 chats UI */}
          <Container.FlexRow className="gap-4">
            <Avatar.XS src="https://picsum.photos/200?1" />
            <Container.FlexCol className="gap-[10px]">
              <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                안녕하세요
              </Typography.Span1>
              <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                글 보고 연락드렸어요
              </Typography.Span1>
              {/* TODO: 마지막 메세지일 시 div로 묶고 시간 표시 */}
              <Container.FlexRow className="items-end gap-2">
                <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                  아직도 구하시나요?
                </Typography.Span1>
                <Typography.Span2 className="translate-y-[-1px] text-brown2">
                  오후 3:26
                </Typography.Span2>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexRow>
        </DateMessageBox>
        {/* date별로 묶을 UI */}
        <DateMessageBox date={new Date(2024, 0, 2)}>
          {/* 유저에 따른 chats UI */}
          {/* user 다를 시 reverse 적용 */}
          <Container.FlexRow className="flex-row-reverse gap-4">
            <Avatar.XS src="https://picsum.photos/200?2" />
            {/* user 다를 시 items-end추가 */}
            <Container.FlexCol className="items-end gap-[10px]">
              <Typography.Span1 className="w-fit rounded-xl bg-brown px-4 py-2 leading-150 text-white">
                넵
              </Typography.Span1>
              {/* TODO: 마지막 메세지일 시 div로 묶고 시간 표시 */}
              <Container.FlexRow className="items-end gap-2">
                <Typography.Span2 className="translate-y-[-1px] text-brown2">
                  오후 3:26
                </Typography.Span2>
                <Typography.Span1 className="w-fit rounded-xl bg-brown px-4 py-2 leading-150 text-white">
                  안녕하세요!!
                </Typography.Span1>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexRow>
        </DateMessageBox>
        {/* date별로 묶을 UI */}
        <DateMessageBox date={new Date(2024, 0, 3)}>
          {/* 유저에 따른 chats UI */}
          <Container.FlexRow className="gap-4">
            <Avatar.XS src="https://picsum.photos/200?1" />
            <Container.FlexCol className="gap-[10px]">
              <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                안녕하세요
              </Typography.Span1>
              <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                글 보고 연락드렸어요
              </Typography.Span1>
              {/* TODO: 마지막 메세지일 시 div로 묶고 시간 표시 */}
              <Container.FlexRow className="items-end gap-2">
                <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                  아직도 구하시나요?
                </Typography.Span1>
                <Typography.Span2 className="translate-y-[-1px] text-brown2">
                  오후 3:26
                </Typography.Span2>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexRow>
        </DateMessageBox>
        {/* date별로 묶을 UI */}
        <DateMessageBox date={new Date(2024, 0, 4)}>
          {/* 유저에 따른 chats UI */}
          {/* user 다를 시 reverse 적용 */}
          <Container.FlexRow className="flex-row-reverse gap-4">
            <Avatar.XS src="https://picsum.photos/200?2" />
            {/* user 다를 시 items-end추가 */}
            <Container.FlexCol className="items-end gap-[10px]">
              <Typography.Span1 className="w-fit rounded-xl bg-brown px-4 py-2 leading-150 text-white">
                넵
              </Typography.Span1>
              {/* TODO: 마지막 메세지일 시 div로 묶고 시간 표시 */}
              <Container.FlexRow className="items-end gap-2">
                <Typography.Span2 className="translate-y-[-1px] text-brown2">
                  오후 3:26
                </Typography.Span2>
                <Typography.Span1 className="w-fit rounded-xl bg-brown px-4 py-2 leading-150 text-white">
                  안녕하세요!!
                </Typography.Span1>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexRow>
        </DateMessageBox>
        {/* date별로 묶을 UI */}
        <DateMessageBox date={new Date(2024, 0, 5)}>
          {/* 유저에 따른 chats UI */}
          <Container.FlexRow className="gap-4">
            <Avatar.XS src="https://picsum.photos/200?1" />
            <Container.FlexCol className="gap-[10px]">
              <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                안녕하세요
              </Typography.Span1>
              <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                글 보고 연락드렸어요
              </Typography.Span1>
              {/* TODO: 마지막 메세지일 시 div로 묶고 시간 표시 */}
              <Container.FlexRow className="items-end gap-2">
                <Typography.Span1 className="w-fit rounded-xl bg-brown6 px-4 py-2 leading-150 text-brown">
                  아직도 구하시나요?
                </Typography.Span1>
                <Typography.Span2 className="translate-y-[-1px] text-brown2">
                  오후 3:26
                </Typography.Span2>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexRow>
        </DateMessageBox>
        {/* date별로 묶을 UI */}
        <DateMessageBox date={new Date(2024, 0, 6)}>
          {/* 유저에 따른 chats UI */}
          {/* user 다를 시 reverse 적용 */}
          <Container.FlexRow className="flex-row-reverse gap-4">
            <Avatar.XS src="https://picsum.photos/200?2" />
            {/* user 다를 시 items-end추가 */}
            <Container.FlexCol className="items-end gap-[10px]">
              <Typography.Span1 className="w-fit rounded-xl bg-brown px-4 py-2 leading-150 text-white">
                넵
              </Typography.Span1>
              {/* TODO: 마지막 메세지일 시 div로 묶고 시간 표시 */}
              <Container.FlexRow className="items-end gap-2">
                <Typography.Span2 className="translate-y-[-1px] text-brown2">
                  오후 3:26
                </Typography.Span2>
                <Typography.Span1 className="w-fit rounded-xl bg-brown px-4 py-2 leading-150 text-white">
                  안녕하세요!!
                </Typography.Span1>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexRow>
        </DateMessageBox>
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

// ! gijung8282   cd916d68-216b-4a7a-8ba9-7155e0c2ce16
// ! gijung828282 b87f4ae6-fe0d-46b9-802e-45742e81f2b5
