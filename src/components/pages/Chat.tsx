import { Outlet } from 'react-router-dom';

import ChatList from '@/components/templates/ChatList';
import Container from '@/components/atoms/Container';

export default function Chat() {
  return (
    <Container.FlexRow className="w-full bg-red-500">
      <ChatList />
      <Outlet />
    </Container.FlexRow>
  );
}
