import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';

import cn from '@/libs/cn';
import Header from '@/components/organisms/Header';
import { useAuthState } from '@/hooks/useSign';

export default function LayoutTemplate() {
  // * supabase authListener를 등록함과 동시에 isLogin상태를 가져오기 위함
  const [session] = useAuthState();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // ! !isMobile을 조건식에 추가하지 않으면 window size가 변할 때마다 isMobile state가 변경되어 렌더링이 불필요하게 많이 일어남
      // ! 576 => s-tablet breakpoint(refer -> tailwind.config.ts)
      if (window.innerWidth <= 576 && !isMobile) {
        setIsMobile(true);
      } else if (window.innerWidth > 576 && isMobile) {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // console.log('windowRef.current', windowRef.current);

  return (
    <>
      {/* ! signupProfile에서는 mobile에서 header가 사라지므로 이에 대한 처리를 해줘야 함 */}
      <Header
        isLogin={!!session}
        className="hidden min-h-[8rem] s-tablet:flex"
        exist={{ logo: true, gnb: true, userMenu: true }}
      />
      {isMobile && <h1>page별 mobile header 작성</h1>}
      <main
        className={cn(
          `flex bg-bg flex-col relative max-w-[79rem] px-2 pt-2 mx-auto h-screen`,
          's-tablet:pt-[8rem] s-tablet:px-8 ',
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
