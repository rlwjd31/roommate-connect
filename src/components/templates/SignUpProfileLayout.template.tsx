/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Children, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';
import Carousel from '@/components/organisms/Carousel';
import StepNavLinks from '@/components/molecules/StepNavLinks';
import cn from '@/libs/cn';
import Button from '@/components/atoms/Button';
import { canGoNextCarousel } from '@/stores/sign.store';
import { ProfileFormValues } from '@/components/pages/SignUpProfile';

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
        carouselCurrentStep: 0,
      },
      {
        labelName: '위치, 기간',
        carouselCurrentStep: 1,
      },
      {
        labelName: '가격대',
        carouselCurrentStep: 2,
      },
    ],
  },
  {
    stepTitle: '나의 라이프스타일',
    stepNum: 2,
    stepContents: [
      {
        labelName: '흡연, 반려동물',
        carouselCurrentStep: 3,
      },
      {
        labelName: '나의 라이프스타일 어필',
        carouselCurrentStep: 4,
      },
    ],
  },
  {
    stepTitle: '내가 원하는 룸메이트',
    stepNum: 3,
    stepContents: [
      {
        labelName: '성별, 인원 수',
        carouselCurrentStep: 5,
      },
      {
        labelName: '원하는 라이프스타일 어필',
        carouselCurrentStep: 6,
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
  const numsOfCarouselChildren = Children.count(children);
  const isFirstOfCarousel = currentStep === 0;
  const isLastOfCarousel = currentStep === numsOfCarouselChildren - 1;
  const isInitialRendered = useRef<boolean>(true);
  const {
    trigger,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  const onClickPrevButton = () => {
    if (isFirstOfCarousel) navigate('/signup-intro');
    else setCurrentStep(prev => prev - 1);
  };

  const onClickNextButton = async () => {
    let canGoNextCarousel = true;

    switch (currentStep) {
      case 0: {
        const isStepValid = await trigger(['houseType', 'rentalType']);
        console.log('houseTypeValue', isStepValid);
        console.log(errors);
        // TODO: Alternate alert API to toast alert
        if (!isStepValid) {
          if (errors.houseType) alert(errors.houseType?.message);
          if (errors.rentalType) alert(errors.rentalType?.message);
          canGoNextCarousel = false;
        }
        break;
      }

      default:
        console.log('validating now...');
        break;
    }

    if (canGoNextCarousel) setCurrentStep(prev => prev + 1);
  };

  // * persist carousel state(currentStep) with session Storage
  useEffect(() => {
    const carouselStepKey = 'carouselStep';
    const carouselStep = sessionStorage.getItem(carouselStepKey);

    if (isInitialRendered.current) {
      isInitialRendered.current = false;

      if (carouselStep) {
        setCurrentStep(JSON.parse(carouselStep));
      }
    } else {
      sessionStorage.setItem(carouselStepKey, JSON.stringify(currentStep));
    }
  }, [currentStep]);

  return (
    <Container.FlexRow className="max-h-[816px] grow justify-between">
      <Container.FlexCol className="w-full min-w-48">
        {stepInfos.map(({ stepTitle, stepNum, stepContents }) => (
          <Container.FlexCol key={stepTitle} className="mb-12">
            <StepTitle
              num={stepNum}
              isActive={stepContents.some(
                content => content.carouselCurrentStep === currentStep,
              )}
              title={stepTitle}
            />
            <StepNavLinks
              className="pl-[14px]"
              contents={stepContents.map(stepContent => ({
                ...stepContent,
                isActive: currentStep === stepContent.carouselCurrentStep,
                onClick: () => setCurrentStep(stepContent.carouselCurrentStep),
              }))}
            />
          </Container.FlexCol>
        ))}
      </Container.FlexCol>
      <Container.FlexCol className="justify-between">
        <Container className="w-[894px]">
          <Carousel order={currentStep}>{children}</Carousel>
        </Container>
        <Container.FlexRow className="justify-end gap-x-3 pb-[76px]">
          <IconButton.Outline
            className="flex-row-reverse gap-x-[10px] rounded-[32px] px-[30px] py-[15px]"
            iconType="left-arrow"
            onClick={onClickPrevButton}
          >
            <Typography.P1 className="text-brown">이전</Typography.P1>
          </IconButton.Outline>
          {isLastOfCarousel ? (
            <Button.Fill
              className="gap-x-[10px] rounded-[32px] px-12 py-[15px]"
              type="submit"
            >
              <Typography.P1 className="text-bg">완료</Typography.P1>
            </Button.Fill>
          ) : (
            <IconButton.Fill
              className="gap-x-[10px] rounded-[32px] px-[30px] py-[15px]"
              iconType="right-arrow"
              stroke="bg"
              onClick={onClickNextButton}
              type="button"
            >
              <Typography.P1 className="text-bg">다음</Typography.P1>
            </IconButton.Fill>
          )}
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}
