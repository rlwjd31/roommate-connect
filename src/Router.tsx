import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import LayoutTemplate from '@/components/templates/Layout.template';
import ComponentTest from '@/components/pages/ComponentTest';
import SignLayoutTemplate from '@/components/templates/SignLayout.template';
import SignUpProfileIntro from '@/components/pages/SignUpProfileIntro';
import SignUpProfile from '@/components/pages/SignUpProfile';
import SignIn from '@/components/pages/SignIn';
import SignUp from '@/components/pages/SignUp';
import About from '@/components/pages/About';
import SignUpProfileOutro from '@/components/pages/SignUpProfileOutro';
import Chat from '@/components/pages/Chat';
import ChatRoom from '@/components/templates/ChatRoom';
import { IsInitializingSession, SessionAtom } from '@/stores/auth.store';
import Loading from '@/components/pages/Loading';
import HouseRegister from '@/components/pages/HouseRegister';
import SignPasswordReset from '@/components/pages/SignPasswordReset';
import SignUpdatePassword from '@/components/pages/SignUpdatePassword';

// ! React.cloneElement는 ReactNode가 아닌 props또한 정의할 수 있는 ReactElement만 받는다
// ! 따라서, element, layout을 ReactElement로 지정함
type RouteType = RouteObject & {
  shouldProtected?: boolean;
  element: ReactElement;
  children?: RouteType[];
};

type ProtectedRouterType = {
  children: ReactElement<{ isLogin?: boolean }>;
};

function ProtectedRouter({ children }: ProtectedRouterType) {
  // * register supabase auth listener on initial rendering
  // const [session, isInitializingSession] = useAuthState();
  const session = useRecoilValue(SessionAtom);
  const isInitializingSession = useRecoilValue(IsInitializingSession);
  const [isDelaying, setIsDelaying] = useState(true);

  if (!isInitializingSession && !session) {
    return isDelaying ? (
      <Loading delayTime={2000} setIsDelaying={setIsDelaying} />
    ) : (
      <Navigate to="/sign/in" />
    );
  }

  // * session이 초기화되었을 때만 도달하는 영역
  return children;
}

const routes: RouteType[] = [
  {
    path: '/',
    element: <LayoutTemplate />,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: 'chats',
        element: <Chat />,
        shouldProtected: true,
        children: [
          {
            path: ':chatId',
            element: <ChatRoom />,
          },
        ],
      },
      {
        path: 'lounge',
        shouldProtected: true,
        element: <span>lounge page</span>,
      },
      {
        path: 'house',
        element: (
          <span>
            house page
            <Outlet />
          </span>
        ),
        children: [
          {
            path: 'regist',
            element: <h1>Regist Page</h1>,
            shouldProtected: true,
          },
        ],
      },
      {
        // TODO: @수현 -> 미인증은 blur를 통해 일부 정보만을 보여주는 페이지 등록
        path: 'house-detail/:houseId',
        element: <h1>House Detail Page</h1>,
        shouldProtected: true,
      },
      {
        path: 'sign',
        element: <SignLayoutTemplate />,
        children: [
          {
            path: 'in',
            element: <SignIn />,
          },
          {
            path: 'up',
            element: <SignUp />,
          },
          {
            path: 'password',
            element: <SignPasswordReset />,
          },
          {
            path: 'update-password',
            element: <SignUpdatePassword />,
          },
        ],
      },
      {
        path: 'signup-intro',
        shouldProtected: true,
        element: <SignUpProfileIntro />,
      },
      {
        path: 'signup-profile',
        shouldProtected: true,
        element: <SignUpProfile />,
      },
      {
        path: 'component-test',
        element: <ComponentTest />,
      },
      {
        path: 'signup-outro',
        shouldProtected: true,
        element: <SignUpProfileOutro />,
      },
      {
        path: 'account',
        shouldProtected: true,
        element: (
          <div>
            My Account page(myPage할 때 sidebar UI먼저 작업 필요해 보임)
            <Outlet />
          </div>
        ),
        // ! TODO: 아래는 my-page의 알림 설정 mock page -> 추후 재조정
        children: [
          {
            path: 'alert-settings',
            element: <h1>알림 설정</h1>,
          },
        ],
      },
    ],
  },
];

const createRoutes = (routes: RouteType[]): RouteObject[] =>
  routes.map(route => {
    const { path, element, children, shouldProtected } = route;

    const routeObject = {
      ...route,
      path,
      element: shouldProtected ? (
        <ProtectedRouter>{element}</ProtectedRouter>
      ) : (
        element
      ),
      children: children ? createRoutes(children) : undefined,
    } as RouteType;

    // ! delete useless property of RouterObject from react-router-dom
    const { shouldProtected: _, ...parsedToRouterObject } = routeObject;

    return parsedToRouterObject;
  });

const router = createBrowserRouter(createRoutes(routes));

export default function Router() {
  return <RouterProvider router={router} />;
}
