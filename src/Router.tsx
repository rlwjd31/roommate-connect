import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutTemplate from '@/components/templates/Layout.template';
import ComponentTest from '@/components/pages/ComponentTest';
import SignLayoutTemplate from '@/components/templates/SignLayout.template';
import SignUpProfileIntro from '@/components/pages/SignUpProfileIntro';
import SignUpProfile from '@/components/pages/SignUpProfile';
import SignIn from '@/components/pages/SignIn';
import SignUp from '@/components/pages/SignUp';
import About from '@/components/pages/About';
import SignUpProfileOutro from '@/components/pages/SignUpProfileOutro';
import HouseRegister from '@/components/pages/HouseRegister';
import SignUpEmail from '@/components/pages/SignUpEmail';
import SignUpInfo from '@/components/pages/SignUpInfo';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <About />,
  },
  {
    element: <LayoutTemplate />,
    children: [{ path: 'chats', element: <span>chats page</span> }],
  },
  {
    element: <LayoutTemplate />,
    children: [{ path: 'lounge', element: <span>lounge page</span> }],
  },
  {
    element: <LayoutTemplate />,
    children: [
      {
        path: 'house',
        children: [
          {
            path: 'regist',
            element: <HouseRegister />,
          },
        ],
      },
    ],
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
            children: [
              { path: 'email', element: <SignUpEmail /> },
              { path: 'info', element: <SignUpInfo /> },
            ],
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
