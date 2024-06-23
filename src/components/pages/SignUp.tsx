import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Carousel from '@/components/organisms/Carousel';
import SignUpIntroTemplate1 from '@/components/templates/SignUpIntroTemplate1';
import SignUpIntroTemplate2 from '@/components/templates/SignUpIntroTemplate2';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { supabase } from '@/libs/supabaseClient';

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const onClickPrevButton = () => {
    if (currentStep === 0) navigate('/sign/in');
    else setCurrentStep(prev => prev - 1);
  };

  // ! TODO: OAuth를 이용한 회원가입시 회원가입때 SIGNED_IN이 발생하므로 useAuthState에서 처리하는 것이 좋음
  // ! onAuthStateChange말고 다른 방법을 강구하는 것이 좋음.
  // useEffect(() => {
  // supabase.auth.onAuthStateChange(async event => {
  //   if (event === 'SIGNED_IN') navigate('/signup-intro');
  // });
  // }, []);

  return (
    <Container.FlexCol className="w-full gap-[2.5rem]">
      <IconButton.Ghost
        onClick={onClickPrevButton}
        iconType="back"
        iconClassName="mx-auto"
        className="size-[2.75rem] rounded-full"
      />
      <Container.FlexCol className="gap-[3.5rem]">
        <Typography.Head2 className="text-brown">회원가입</Typography.Head2>
        <Container className="w-full">
          <Carousel order={currentStep}>
            <SignUpIntroTemplate1 step={setCurrentStep} />
            <SignUpIntroTemplate2 />
          </Carousel>
        </Container>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
