/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Children, ReactNode, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';
import Carousel from '@/components/organisms/Carousel';
import StepNavLinks from '@/components/molecules/StepNavLinks';
import cn from '@/libs/cn';
import Button from '@/components/atoms/Button';
import { ProfileFormValues } from '@/components/pages/SignUpProfile';
import { createToast } from '@/libs/toast';
import {
  signUpProfileValidationConfig,
  stepDisplayData,
  ValidationStep,
  ValidationStepFieldName,
} from '@/constants/signUpProfileData';

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
  children: ReactNode;
};

export default function SignUpProfileLayoutTemplate(
  props: Readonly<SignProfileLayoutTemplateProps>,
) {
  const { children } = props;
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const numsOfCarouselChildren = Children.count(children);
  const [isFirstOfCarousel, isLastOfCarousel] = [
    currentStep === 0,
    currentStep === numsOfCarouselChildren - 1,
  ];
  const isInitialRendered = useRef<boolean>(true);
  const {
    trigger,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    trigger();
  }, []);

  const validationStep = async (carouselStep: ValidationStep) => {
    const validationConfig = signUpProfileValidationConfig[carouselStep];

    if (!validationConfig) return true;

    const { fields, messages } = validationConfig;
    const isStepValid = await trigger(fields);

    if (!isStepValid) {
      fields.forEach(field => {
        if (errors[field]) {
          createToast(
            `${field}ValidationError`,
            errors[field]?.message ||
              messages[field as ValidationStepFieldName],
            {
              autoClose: 1000,
              type: 'error',
              isLoading: false,
              position: 'top-center',
            },
          );
        }
      });
      return false;
    }
    return true;
  };

  const onClickPrevButton = () => {
    if (isFirstOfCarousel) navigate('/signup-intro');
    else setCurrentStep(prev => prev - 1);
  };

  const onClickNextButton = async () => {
    const canGoNextCarousel = await validationStep(
      currentStep as ValidationStep,
    );

    if (canGoNextCarousel) setCurrentStep(prev => prev + 1);
  };

  const onClickSubmit = async () => {
    if (isLastOfCarousel) {
      const isFinalStepValid = await validationStep(
        currentStep as ValidationStep,
      );

      // ! TODO: fetch user profile data to supabase
      if (isFinalStepValid) navigate('/signup-outro');
    }
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
        {stepDisplayData.map(({ stepTitle, stepNum, stepContents }) => (
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
              onClick={onClickSubmit}
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
