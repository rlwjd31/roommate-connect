import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Input from '@/components/atoms/Input';
import IconButton from '@/components/molecules/IconButton';
import Avatar from '@/components/atoms/Avatar';
import { supabase } from '@/libs/supabaseClient';
import { UserAtom } from '@/stores/auth.store';
import { Database } from '@/types/supabase';

type MessageType = Database['public']['Tables']['messages']['Row'];

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
    <Container.FlexCol className="size-full min-h-full">
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
        <Container.FlexCol className="gap-8">
          <Typography.Span1 className="mx-auto w-fit rounded-xl bg-brown6 px-4 pb-[5px] pt-[6px] font-semibold text-brown">
            2024년 1월 1일
          </Typography.Span1>

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
        </Container.FlexCol>
        {/* date별로 묶을 UI */}
        <Container.FlexCol className="gap-8">
          <Typography.Span1 className="mx-auto w-fit rounded-xl bg-brown6 px-4 pb-[5px] pt-[6px] font-semibold text-brown">
            2024년 1월 2일
          </Typography.Span1>

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
        </Container.FlexCol>
        {/* date별로 묶을 UI */}
        <Container.FlexCol className="gap-8">
          <Typography.Span1 className="mx-auto w-fit rounded-xl bg-brown6 px-4 pb-[5px] pt-[6px] font-semibold text-brown">
            2024년 1월 1일
          </Typography.Span1>

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
        </Container.FlexCol>
        {/* date별로 묶을 UI */}
        <Container.FlexCol className="gap-8">
          <Typography.Span1 className="mx-auto w-fit rounded-xl bg-brown6 px-4 pb-[5px] pt-[6px] font-semibold text-brown">
            2024년 1월 2일
          </Typography.Span1>

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
        </Container.FlexCol>
        {/* date별로 묶을 UI */}
        <Container.FlexCol className="gap-8">
          <Typography.Span1 className="mx-auto w-fit rounded-xl bg-brown6 px-4 pb-[5px] pt-[6px] font-semibold text-brown">
            2024년 1월 1일
          </Typography.Span1>

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
        </Container.FlexCol>
        {/* date별로 묶을 UI */}
        <Container.FlexCol className="gap-8">
          <Typography.Span1 className="mx-auto w-fit rounded-xl bg-brown6 px-4 pb-[5px] pt-[6px] font-semibold text-brown">
            2024년 1월 2일
          </Typography.Span1>

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
        </Container.FlexCol>
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
