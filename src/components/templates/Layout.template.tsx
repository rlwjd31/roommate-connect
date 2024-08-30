import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

import cn from '@/libs/cn';
import Header, { GNB } from '@/components/organisms/Header';
import { useAuthState } from '@/hooks/useSign';

export default function LayoutTemplate() {
  // * supabase authListener를 등록함과 동시에 isLogin상태를 가져오기 위함
  const [session] = useAuthState();
  const location = useLocation();
  const [isSTabletBreakPoint, setIsSTabletBreakPoint] = useState(false);

  const isChatRoute = /^\/chats/.test(location.pathname);
  const isChatRoomRoute = /^\/chats\/[a-zA-Z0-9_-]+$/.test(location.pathname);
  const commonHeaderStyle = 'flex h-[8rem] items-center fixed w-screen z-50';

  useEffect(() => {
    const handleResize = () => {
      // ! !isSTabletBreakPoint 조건식에 추가하지 않으면 window size가 변할 때마다 isMobile state가 변경되어 렌더링이 불필요하게 많이 일어남
      // ! 576 => s-tablet breakpoint(refer -> tailwind.config.ts)
      if (window.innerWidth <= 576 && !isSTabletBreakPoint) {
        setIsSTabletBreakPoint(true);
      } else if (window.innerWidth > 576 && isSTabletBreakPoint) {
        setIsSTabletBreakPoint(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSTabletBreakPoint]);

  const navItems = useMemo(
    () => [
      { name: 'chats', path: '/chats' },
      { name: 'lounge', path: '/lounge' },
      { name: 'house', path: '/house' },
    ],
    [],
  );

  return (
    <div className="relative">
      {/* ! signupProfile에서는 mobile에서 header가 사라지므로 이에 대한 처리를 해줘야 함 */}
      {!isSTabletBreakPoint && (
        <Header
          isLogin={!!session}
          className={commonHeaderStyle}
          // TODO: page route별 header구성요소 분기처리
          exist={{ logo: true, gnb: true, userMenu: true }}
        />
      )}
      {/* TODO: chat page뿐만이 아닌 다른 page에 대한 sTable breakpoint에 대한 분기 처리 */}
      {isSTabletBreakPoint && isChatRoute && !isChatRoomRoute && (
        <GNB
          className={cn(
            commonHeaderStyle,
            'bottom-0 left-0 justify-center bg-bg',
          )}
          navItems={navItems}
        />
      )}
      <main
        className={cn(
          `flex bg-bg flex-col relative max-w-[79rem] px-2 pt-2 mx-auto h-screen`,
          's-tablet:pt-[8rem] s-tablet:px-8 ',
        )}
      >
        <Outlet />
      </main>
    </div>
  );
}

LayoutTemplate.defaultProps = {
  isLogin: false,
};
