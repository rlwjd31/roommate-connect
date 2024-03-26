import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import LayoutTemplate from '@/components/templates/Layout.template';
import ComponentTest from '@/components/pages/ComponentTest.tsx';
import SignLayoutTemplate from '@/components/templates/SignLayout.template';

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
      {
        // ! 기본 레이아웃 적용
        path: 'signup-intro',
        element: <span>프로필 설정 여부</span>,
      },
      {
        path: 'signup-profile',
        element: <span>프로필 설정</span>,
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
