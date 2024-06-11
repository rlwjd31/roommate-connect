import { Outlet } from 'react-router-dom';

import ChatList from '@/components/templates/ChatList';

export default function Chat() {
  return (
    <div>
      <ChatList />
      <Outlet />
    </div>
  );
}
