import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import {
  cloneElement,
  isValidElement,
  ReactElement,
  useEffect,
  useState,
} from 'react';

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
import { useAuthState } from '@/hooks/useSign';
import { createToast } from '@/libs/toast';

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
            path: 'register',
            element: <h1>Register Page</h1>,
            shouldProtected: true,
          },
          {
            path: ':houseId',
            element: <h1>House Detail Page</h1>,
          },
        ],
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
    ],
  },
];

function ProtectedRouter({ children }: ProtectedRouterType) {
  // * register supabase auth listener on initial rendering
  const [session, isInitializingSession] = useAuthState();
  const [isForceDelayFinished, setIsForceDelayFinished] = useState(false);

  useEffect(() => {
    let sleep: number | undefined;

    // * session이 초기화 되었는데 session이 없다면
    if (!isInitializingSession && !session) {
      sleep = window.setTimeout(() => {
        setIsForceDelayFinished(true);
      }, 2000);
    }

    return () => {
      if (sleep) clearTimeout(sleep);
    };
  }, [session, isInitializingSession, isForceDelayFinished]);

  if (!isInitializingSession && !session) {
    createToast('redirectToLoginPage', '💡 로그인이 필요한 페이지입니다', {
      autoClose: 2000,
      type: 'error',
      isLoading: false,
      position: 'top-right',
    });

    return isForceDelayFinished ? (
      <Navigate to="/sign/in" />
    ) : (
      // ! TOOD: Loading Page 나오면 대체
      <div className="flex h-screen items-center justify-center bg-green-500 text-2xl text-white">
        Redirect to Login Page...
      </div>
    );
  }

  // * session이 초기화되었을 때만 도달하는 영역
  return isValidElement(children)
    ? cloneElement(children, { isLogin: !!session })
    : null;
}

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
