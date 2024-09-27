import { Outlet, useLocation } from 'react-router-dom';

import cn from '@/libs/cn';
import { useAuthState } from '@/hooks/useSign';
import Header from '@/components/templates/Header';
import isRoutePathMatched from '@/libs/isRoutePathMatched';
import Container from '@/components/atoms/Container';
import HouseListTopSection from '@/components/templates/House/HouseList/HouseListTopSection';

export default function LayoutTemplate() {
  // * supabase authListener를 등록함과 동시에 isLogin상태를 가져오기 위함
  const [session] = useAuthState();
  const location = useLocation();
  const isSignPath = isRoutePathMatched(location.pathname, [
    'sign',
    'signIn',
    'signUp',
    'signUpInfo',
    'signPasswordReset',
    'signUpdatePassword',
  ]);
  const isSignUpProfilePath = isRoutePathMatched(location.pathname, [
    'signUpProfile',
    'signUpProfileIntro',
    'signUpProfileOutro',
  ]);
  const commonHeaderStyle = 'flex h-[8rem] items-center fixed w-screen z-50';
  const isHouseList = location.pathname.endsWith('/house');

  return (
    <>
      <Header
        isLogin={!!session}
        className={cn(commonHeaderStyle, isSignPath && 'bg-transparent')}
      />
      {isHouseList ? (
        <Container.FlexCol className="min-h-screen w-full overflow-x-hidden">
          <HouseListTopSection />
          <Container.FlexRow className="inset-x-0 -z-10 bg-bg-orange">
            <main
              className={cn(
                'flex flex-col relative max-w-[90rem] monitor:max-w-[97.5rem] mx-auto pt-[5rem] pb-[13rem] bg-transparent',
              )}
            >
              <Outlet />
            </main>
          </Container.FlexRow>
        </Container.FlexCol>
      ) : (
        <main
          className={cn(
            'flex flex-col relative max-w-[79rem] p-5 mx-auto h-screen',
            // * isSignPath & isSignUpProfilePath에 해당하는 page는 header가 존재하기 때문
            (isSignPath || isSignUpProfilePath) && 'pt-[8rem] pb-8',
            's-tablet:pt-[8rem] px-8 pb-8',
          )}
        >
          <Outlet />
        </main>
      )}
    </>
  );
}

LayoutTemplate.defaultProps = {
  isLogin: false,
};

// (
// 	<Container.FlexCol className="min-h-screen w-full overflow-x-hidden">
// 		<Container.FlexRow className=" h-[17.25rem] w-full justify-center bg-[#FCF7E7] tablet:h-[37.875rem] laptop:h-[43.0625rem] desktop:h-[45rem] monitor:h-[48.5rem]">
// 			<HouseListTopSection />
// 			<Container className="absolute inset-x-0 top-[33.8125rem] z-[1] h-[39.5px] tablet:h-[111.5px] laptop:h-[117px] desktop:h-[126.5px] monitor:h-[234px] rounded-t-[100rem] bg-[#FFD7C6] [clip-path:polygon(50%_0%,0%_100%,100%_100%)]" />
// 		</Container.FlexRow>
// 		<Container.FlexRow className="inset-x-0 -z-10 bg-[#FFD7C6]">
// 			<main
// 				className={cn(
// 					'flex flex-col relative max-w-[90rem] monitor:max-w-[97.5rem] mx-auto pt-[5rem] pb-[13rem] bg-transparent',
// 				)}
// 			>
// 				<Outlet />
// 			</main>
// 		</Container.FlexRow>
// 	</Container.FlexCol>
// )
