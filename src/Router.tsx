import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutTemplate from '@/components/templates/Layout.template';
import ComponentTest from '@/components/pages/ComponentTest.tsx';
import SignLayoutTemplate from '@/components/templates/SignLayout.template';
import SignUpProfileIntro from '@/components/pages/SignUpProfileIntro.tsx';
import SignUpProfile from '@/components/pages/SignUpProfile.tsx';

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
            element: <span>로그인 / 소셜 로그인 /회원가입 이동</span>,
          },
          {
            path: 'up',
            element: (
              <span>이메일 인증, 암호 설정, 이름, 주소, 전화번호 인증</span>
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
