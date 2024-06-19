import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
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
import { UserAtom } from '@/stores/auth.store';
import { useAuthState } from '@/hooks/useSign';
import { createToast } from '@/libs/toast';

const nonProtectedRoutes = ['/sign/in', '/sign/up', '/component-test'];

type ProtectedRouterType = {
  children: ReactElement<{ isLogin: boolean }>;
};

function ProtectedRouter({ children }: ProtectedRouterType) {
  // * register supabase auth listener on initial rendering
  const session = useAuthState();
  const location = useLocation();
  const [showComponent, setShowComponent] = useState(false);
  const user = useRecoilValue(UserAtom);
  const shouldBeProtected =
    !user && !nonProtectedRoutes.includes(location.pathname);

  useEffect(() => {
    let sleep: number | undefined;

    if (shouldBeProtected) {
      sleep = window.setTimeout(() => {
        setShowComponent(true);
      }, 2000);
    } else {
      setShowComponent(false);
    }

    return () => {
      if (!sleep) clearTimeout(sleep);
    };
  }, [shouldBeProtected]);

  if (shouldBeProtected) {
    createToast('redirectToLoginPage', '💡 로그인이 필요한 페이지입니다', {
      autoClose: 2000,
      type: 'error',
      isLoading: false,
      position: 'top-right',
    });

    return showComponent ? (
      <Navigate to="/sign/in" />
    ) : (
      // ! TOOD: Loading Page 나오면 대체
      <div className="flex h-screen items-center justify-center bg-green-500">
        Redirect to Login Page...
      </div>
    );
  }

  return isValidElement(children)
    ? cloneElement(children, { isLogin: !!session })
    : null;
}

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <About />,
  },
  {
    element: <LayoutTemplate />,
    children: [
      {
        path: 'chats',
        element: <Chat />,
        children: [
          {
            path: ':chatId',
            element: <ChatRoom />,
          },
        ],
      },
    ],
  },
  {
    element: <LayoutTemplate />,
    children: [
      {
        path: 'lounge',
        element: <span>lounge page</span>,
      },
    ],
  },
  {
    element: <LayoutTemplate />,
    children: [{ path: 'house', element: <span>house page</span> }],
  },
  {
    element: <LayoutTemplate />,
    children: [
      {
        // ! Sign 레이아웃 적용
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
      // ! 기본 레이아웃 적용
      {
        path: 'signup-intro',
        element: <SignUpProfileIntro />,
      },
      {
        path: 'signup-profile',
        element: <SignUpProfile />,
      },
      {
        path: 'component-test',
        element: <ComponentTest />,
      },
      {
        path: 'signup-outro',
        element: <SignUpProfileOutro />,
      },
    ],
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
