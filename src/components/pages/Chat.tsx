import { Outlet } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import { ChatList } from '@/components/templates/chats';

export default function Chat() {
  return (
    <Container.FlexRow className="min-h-full w-full">
      <ChatList />
      <Outlet />
    </Container.FlexRow>
  );
}
