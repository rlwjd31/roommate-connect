import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import cn from '@/libs/cn';
import { useAuthState } from '@/hooks/useSign';
import Header from '@/components/templates/Header';
import { GNB } from '@/components/organisms/header';

export default function LayoutTemplate() {
  // * supabase authListener를 등록함과 동시에 isLogin상태를 가져오기 위함
  const [session] = useAuthState();
  const location = useLocation();
  const [isOverSTabletBreakPoint, setIsOverSTabletBreakPoint] = useState(true);

  const isChatRoute = /^\/chats/.test(location.pathname);
  const isChatRoomRoute = /^\/chats\/[a-zA-Z0-9_-]+$/.test(location.pathname);
  const isSignPath = location.pathname.startsWith('/sign');
  const isSignUpProfilePath = location.pathname.startsWith('/signup');
  const commonHeaderStyle = 'flex h-[8rem] items-center fixed w-screen z-50';

  useEffect(() => {
    const handleResize = () => {
      // ! !isSTabletBreakPoint 조건식에 추가하지 않으면 window size가 변할 때마다 isMobile state가 변경되어 렌더링이 불필요하게 많이 일어남
      // ! 576 => s-tablet breakpoint(refer -> tailwind.config.ts)
      if (window.innerWidth < 576 && isOverSTabletBreakPoint) {
        setIsOverSTabletBreakPoint(false);
      } else if (window.innerWidth >= 576 && !isOverSTabletBreakPoint) {
        setIsOverSTabletBreakPoint(true);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOverSTabletBreakPoint]);

  return (
    <>
      {/* ! signupProfile에서는 mobile에서 header가 사라지므로 이에 대한 처리를 해줘야 함 */}
      {(isOverSTabletBreakPoint || isSignPath || isSignUpProfilePath) && (
        <Header
          isLogin={!!session}
          className={cn(commonHeaderStyle, isSignPath && 'bg-transparent')}
          // TODO: page route별 header구성요소 분기처리
          exist={{
            logo: true,
            gnb: !(isSignPath || isSignUpProfilePath),
            userMenu: !(isSignPath || isSignUpProfilePath),
          }}
        />
      )}
      {/* TODO: chat page뿐만이 아닌 다른 page에 대한 sTable breakpoint에 대한 분기 처리 */}
      {isOverSTabletBreakPoint && isChatRoute && !isChatRoomRoute && (
        <GNB
          className={cn(
            commonHeaderStyle,
            'bottom-0 left-0 justify-center bg-bg',
          )}
        />
      )}
      <main
        className={cn(
          'flex flex-col relative max-w-[79rem] p-5 mx-auto h-screen',
          (isSignPath || isSignUpProfilePath) && 'pt-[8rem] pb-8',
          's-tablet:pt-[8rem] px-8 pb-8',
        )}
      >
        <Outlet />
      </main>
    </>
  );
}

LayoutTemplate.defaultProps = {
  isLogin: false,
};
