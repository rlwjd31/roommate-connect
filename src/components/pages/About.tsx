import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { supabase } from '@/libs/supabaseClient';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { UserAtom } from '@/stores/auth.store';
import {
  useAuthState,
  userAdditionalInfo,
  useUpdateUser,
} from '@/hooks/useSign';
import Link from '@/components/atoms/Link';

export default function About() {
  const isInitial = useRef(0);
  // ! TODO 추후 수정 로그인 기능 테스트를 위한 로그아웃
  // ! Layout.template.tsx 의 onAuthStateChange 에서 navigate 동작
  // ! 현재 About 컴포넌트는 Layout.template.tsx 외부에 위치한 컴포넌트로 임시로 작성
  // ! TODO 제거
  const [user, setUser] = useRecoilState(UserAtom);
  const navigate = useNavigate();
  const onClickSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error.message);
  };

  const { updateUser } = useUpdateUser();
  const queryClient = useQueryClient();
  const [session, _] = useAuthState();

  // ! TODO: 무한 로딩으로 인해 임시방편 error 처리
  useEffect(() => {
    if (isInitial.current < 3) {
      if (session && session.user.app_metadata.provider !== 'email') {
        const queryUserAdditionalInfo = userAdditionalInfo(session);
        queryClient.fetchQuery(queryUserAdditionalInfo).then(data => {
          updateUser(data);
        });
      }
      isInitial.current += 1;
    }
  }, [session]);

  return (
    <Container.FlexCol className="gap-4">
      <Typography.Head1>서비스 소개 및 사용방법</Typography.Head1>
      <Typography.P1>고유번호: {user?.id}</Typography.P1>
      <Typography.P1>생년월일: {user?.birth}</Typography.P1>
      <Typography.P1>성별 : {user?.gender}</Typography.P1>
      <Typography.P1>성명 : {user?.name}</Typography.P1>
      <Typography.P1>이메일 : {user?.email}</Typography.P1>
      {user?.avatar && (
        <img
          className="size-[100px] rounded-full"
          src={user?.avatar}
          alt="avatar"
        />
      )}
      <Button.Fill className="w-[100px] rounded-xl p-4">
        <Typography.P2 className="text-white" onClick={onClickSignOut}>
          로그아웃
        </Typography.P2>
      </Button.Fill>
      <Container.FlexCol className="space-y-2">
        <Link to="/chats" className="w-40 bg-brown text-xl text-white">
          chats
        </Link>
        <Link to="/chats/1" className="w-40 bg-brown text-xl text-white">
          chatRoom
        </Link>
        <Link to="/lounge" className="w-40 bg-brown text-xl text-white">
          lounge
        </Link>
        <Link to="/house" className="w-40 bg-brown text-xl text-white">
          house
        </Link>
        <Link to="/house/register" className="w-40 bg-brown text-xl text-white">
          house register
        </Link>
        <Link to="/house/1" className="w-40 bg-brown text-xl text-white">
          house detail
        </Link>
        <Link to="/signup-intro" className="w-40 bg-brown text-xl text-white">
          signup-intro
        </Link>
        <Link to="/signup-profile" className="w-40 bg-brown text-xl text-white">
          signup-profile
        </Link>
        <Link to="/signup-outro" className="w-40 bg-brown text-xl text-white">
          signup-outro
        </Link>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
