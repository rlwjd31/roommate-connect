import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';
import Carousel from '@/components/organisms/Carousel';
import StepNavigation from '@/components/molecules/StepNavigation';
import cn from '@/libs/cn';

type StepTitleType = {
  num: string | number;
  title: string;
  isActive?: boolean;
};
function StepTitle({ num, title, isActive }: StepTitleType) {
  return (
    <Container.FlexRow className="mb-3 items-center gap-3">
      <div
        className={cn(
          'size-9 rounded-full flex justify-center items-center ',
          isActive ? 'bg-brown' : 'bg-brown2',
        )}
      >
        <span className="translate-y-[1.5px] text-xl font-semibold text-bg">
          {num}
        </span>
      </div>
      <Typography.SubTitle3
        className={cn('font-semibold', isActive ? 'text-brown' : 'text-brown2')}
      >
        {title}
      </Typography.SubTitle3>
    </Container.FlexRow>
  );
}

StepTitle.defaultProps = {
  isActive: false,
};

type SignProfileLayoutTemplateProps = {
  children: React.ReactNode;
};

const stepInfos = [
  {
    stepTitle: '내가 찾는 집',
    stepNum: 1,
    stepContents: [
      {
        labelName: '집 유형, 매물 종류',
        isActive: false,
      },
      {
        labelName: '위치, 기간',
        isActive: true,
      },
      {
        labelName: '가격대',
        isActive: false,
      },
    ],
  },
  {
    stepTitle: '나의 라이프스타일',
    stepNum: 2,
    stepContents: [
      {
        labelName: '흡연, 반려동물',
        isActive: false,
      },
      {
        labelName: '나의 라이프스타일 어필',
        isActive: true,
      },
    ],
  },
  {
    stepTitle: '내가 원하는 룸메이트',
    stepNum: 3,
    stepContents: [
      {
        labelName: '성별, 인원 수',
        isActive: false,
      },
      {
        labelName: '원하는 라이프스타일 어필',
        isActive: true,
      },
    ],
  },
];

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
    <Container.FlexRow className="max-h-[816px] grow justify-between">
      {/* Step Indicator */}
      <Container.FlexCol className="w-full min-w-48">
        {stepInfos.map(({ stepTitle, stepNum, stepContents }) => (
          <Container.FlexCol key={stepTitle} className="mb-12">
            {/* 큰 stepTitle에 해당될 때 조건식 필요 true로 대체 */}
            <StepTitle num={stepNum} isActive title={stepTitle} />
            <StepNavigation className="pl-[14px]" contents={stepContents} />
          </Container.FlexCol>
        ))}
      </Container.FlexCol>
      <Container.FlexCol className="justify-between">
        <Container className="w-[894px]">
          <Carousel order={currentStep}>{children}</Carousel>
        </Container>
        <Container.FlexRow className="justify-end gap-x-3 pb-[76px]">
          {/* TODO right-arrow to left-arrow */}
          <IconButton.Outline
            className="flex-row-reverse gap-x-[10px] rounded-[32px] px-[30px] py-[15px]"
            iconType="left-arrow"
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
