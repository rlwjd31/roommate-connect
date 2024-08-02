import { useRecoilValue } from 'recoil';

import Avatar from '@/components/atoms/Avatar';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import MessageBox from '@/components/templates/chats/MessageBox';
import cn from '@/libs/cn';
import { UserAtom } from '@/stores/auth.store';
import { Tables } from '@/types/supabase';

type UserMessageType = {
  userMessage: {
    userId: string;
    messages: Tables<'messages'>[];
  };
  chatPartnerInfo: Tables<'user'>;
};

// 유저에 따른 chats UI Component
export default function UserMessageBox({
  userMessage,
  chatPartnerInfo,
}: UserMessageType) {
  const currentUserInfo = useRecoilValue(UserAtom);
  const { userId, messages } = userMessage;

  const isCurrentUser = userMessage.userId === currentUserInfo?.id;

  return messages.length > 0 ? (
    <Container.FlexRow
      className={cn(
        'gap-4',
        currentUserInfo?.id !== userId && 'flex-row-reverse',
      )}
    >
      <Avatar.XS
        src={
          (isCurrentUser ? currentUserInfo.avatar : chatPartnerInfo.avatar) ||
          ''
        }
      />
      <Container.FlexCol
        className={cn(
          'gap-[10px]',
          currentUserInfo?.id !== userId && 'items-end',
        )}
      >
        {messages.map((eachMessage, index) =>
          index !== messages.length - 1 ? (
            <MessageBox
              isChatPartner={currentUserInfo?.id !== userId}
              key={eachMessage.id}
            >
              {eachMessage.message}
            </MessageBox>
          ) : (
            // 마지막 메세지일 시 시간 표시
            <Container.FlexRow
              key={eachMessage.id}
              className={cn(
                'items-end gap-2',
                currentUserInfo?.id !== userId && 'flex-row-reverse',
              )}
            >
              <MessageBox
                isChatPartner={currentUserInfo?.id !== userId}
                key={eachMessage.id}
              >
                {eachMessage.message}
              </MessageBox>
              <Typography.Span2 className="translate-y-[-0.125rem] text-brown2">
                {/* TODO: lastCreatedAt */}
                오후 3:00
              </Typography.Span2>
            </Container.FlexRow>
          ),
        )}
      </Container.FlexCol>
    </Container.FlexRow>
  ) : (
    <h1>메세지가 없습니다</h1>
  );
}
