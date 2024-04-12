import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { supabase } from '@/libs/supabaseClient';
import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import { UserAtom } from '@/stores/auth.store';

export default function About() {
  // ! TODO 추후 수정 로그인 기능 테스트를 위한 로그아웃
  // ! Layout.template.tsx 의 onAuthStateChange 에서 navigate 동작
  // ! 현재 About 컴포넌트는 Layout.template.tsx 외부에 위치한 컴포넌트로 임시로 작성
  // ! TODO 제거
  const setUser = useSetRecoilState(UserAtom);
  const navigate = useNavigate();
  const onClickSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error === null) setUser(null);
    // ! TODO 제거
    navigate('/sign/in');
  };
  return (
    <Container.FlexRow>
      <span>서비스 소개 및 사용방법</span>
      <Button.Fill className="rounded-xl p-4">
        <Typography.P2 className="text-white" onClick={onClickSignOut}>
          로그아웃
        </Typography.P2>
      </Button.Fill>
    </Container.FlexRow>
  );
}
