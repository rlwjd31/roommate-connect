import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';
import Carousel from '@/components/organisms/Carousel';

type SignProfileLayoutTemplateProps = {
  children: React.ReactNode;
};
export default function SignUpProfileLayoutTemplate(
  props: Readonly<SignProfileLayoutTemplateProps>,
) {
  const { children } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const onClickPrevButton = () => {
    if (currentStep === 0) navigate('/signup-intro');
    else setCurrentStep(prev => prev - 1);
  };
  const onClickNextButton = () => {
    if (currentStep === 6) navigate('/signup-outro');
    else setCurrentStep(prev => prev + 1);
  };

  return (
    <Container.FlexRow className="max-h-[816px] grow justify-between pt-[41px]">
      {/* TODO Container To Stepper */}
      <Container className="w-[188px]">
        <span>Stepper </span>
      </Container>
      <Container.FlexCol className="justify-between">
        <Container className="w-[894px]">
          <Carousel order={currentStep}>{children}</Carousel>
        </Container>
        <Container.FlexRow className="justify-end gap-x-3">
          {/* TODO right-arrow to left-arrow */}
          <IconButton.Outline
            className="flex-row-reverse gap-x-[10px] rounded-[32px] px-[30px] py-[15px]"
            iconType="right-arrow"
            onClick={onClickPrevButton}
          >
            <Typography.P1 className="text-brown">이전</Typography.P1>
          </IconButton.Outline>
          <IconButton.Fill
            className="gap-x-[10px] rounded-[32px] px-[30px] py-[15px]"
            iconType="right-arrow"
            stroke="bg"
            onClick={onClickNextButton}
          >
            <Typography.P1 className="text-bg">다음</Typography.P1>
          </IconButton.Fill>
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}
