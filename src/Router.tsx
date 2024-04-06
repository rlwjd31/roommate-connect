import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutTemplate from '@/components/templates/Layout.template';
import ComponentTest from '@/components/pages/ComponentTest';
import SignLayoutTemplate from '@/components/templates/SignLayout.template';
import SignUpProfileIntro from '@/components/pages/SignUpProfileIntro';
import SignUpProfile from '@/components/pages/SignUpProfile';
import SignIn from '@/components/pages/SignIn';
import SignUp from '@/components/pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    index: true,
    element: <span>서비스 소개 및 사용방법</span>,
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
            element: (
              <SignUp />
            ),
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
    ],
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
