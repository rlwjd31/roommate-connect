import Avatar from '@/components/atoms/Avatar';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import MessageBox from '@/components/templates/chats/MessageBox';
import cn from '@/libs/cn';

// 유저에 따른 chats UI Component
export default function UserMessageBox() {
  const userId = 'me';
  const chatPartenrId = 'other';

  const fakeMessageData = [
    {
      userInfo: {
        userId: 'me',
        avatar: 'https://picsum.photos/200?1',
      },
      messages: [
        {
          id: 1,
          content: '안녕하세요',
        },
        {
          id: 2,
          content: '글 보고 연락드렸어요',
        },
        {
          id: 3,
          content: '아직도 구하시나요?',
        },
      ],
      lastCreatedAt: '오후 3:26',
    },
    {
      userInfo: {
        userId: 'other',
        avatar: 'https://picsum.photos/200?2',
      },
      messages: [
        {
          id: 4,
          content: '넵',
        },
        {
          id: 5,
          content: '안녕하세요',
        },
      ],
      lastCreatedAt: '오후 4:16',
    },
  ];

  return fakeMessageData.map((messageData, index) => (
    <Container.FlexRow
      key={index}
      className={cn(
        'gap-4',
        userId !== messageData.userInfo.userId && 'flex-row-reverse',
      )}
    >
      <Avatar.XS src={messageData.userInfo.avatar} />
      <Container.FlexCol
        className={cn(
          'gap-[10px]',
          userId !== messageData.userInfo.userId && 'items-end',
        )}
      >
        {messageData.messages.map((eachMessage, index) =>
          index !== messageData.messages.length - 1 ? (
            <MessageBox
              isChatPartner={userId !== messageData.userInfo.userId}
              key={eachMessage.id}
            >
              {eachMessage.content}
            </MessageBox>
          ) : (
            // 마지막 메세지일 시 시간 표시
            <Container.FlexRow
              key={eachMessage.id}
              className={cn(
                'items-end gap-2',
                userId !== messageData.userInfo.userId && 'flex-row-reverse',
              )}
            >
              <MessageBox
                isChatPartner={userId !== messageData.userInfo.userId}
                key={eachMessage.id}
              >
                {eachMessage.content}
              </MessageBox>
              <Typography.Span2 className="translate-y-[-0.125rem] text-brown2">
                {messageData.lastCreatedAt}
              </Typography.Span2>
            </Container.FlexRow>
          ),
        )}
      </Container.FlexCol>
    </Container.FlexRow>
  ));
}
