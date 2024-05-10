import React, { Children, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';
import Carousel from '@/components/organisms/Carousel';
import StepNavigation from '@/components/molecules/StepNavigation';
import cn from '@/libs/cn';
import Button from '@/components/atoms/Button';

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

// TODO: DeepType?을 통해서 할 수 있으면 정확한 type 추론
// TODO: carousel 개수와 data연관짓기
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const alternateProperty = <T extends Record<string, any>>(
  data: T[],
  injectTargetPath: string[],
  targetKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (value: T[keyof T]) => Record<string, any>,
  removeKey: string = '',
) => {
  const removeProperty = (key: string, obj: Record<string, unknown>) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { [key]: _, ...restObj } = obj;

    return restObj;
  };

  const traverseToAlternate = (nestedData: T[], keyIndex = 0): T[] =>
    nestedData.map(d => {
      const currentKey = injectTargetPath[keyIndex];
      const isPathEnd = keyIndex === injectTargetPath.length;
      const injectedObj = {
        ...(isPathEnd
          ? callback(d[targetKey] as T[keyof T])
          : {
              [`${currentKey}`]: traverseToAlternate(
                d[currentKey] as T[],
                keyIndex + 1,
              ),
            }),
      };

      return removeProperty(removeKey, {
        ...d,
        ...injectedObj,
      }) as T;
    });

  const result = traverseToAlternate(data);

  return result;
};

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

  const onClickPrevButton = () => {
    if (isFirstOfCarousel) navigate('/signup-intro');
    else setCurrentStep(prev => prev - 1);
  };
  const onClickNextButton = () => {
    if (isLastOfCarousel) navigate('/signup-outro');
    else setCurrentStep(prev => prev + 1);
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

  const addedIsActivePropertyStepInfos = alternateProperty<
    (typeof stepInfos)[number]
  >(
    stepInfos,
    ['stepContents'],
    'carouselCurrentStep',
    value => ({
      isActive: value === currentStep,
    }),
    'carouselCurrentStep',
  ) as unknown as {
    stepTitle: string;
    stepNum: number;
    stepContents: {
      labelName: string;
      isActive: boolean;
    }[];
  }[];

  return (
    <Container.FlexRow className="max-h-[816px] grow justify-between">
      {/* Step Indicator */}
      <Container.FlexCol className="w-full min-w-48">
        {addedIsActivePropertyStepInfos.map(
          ({ stepTitle, stepNum, stepContents }) => (
            <Container.FlexCol key={stepTitle} className="mb-12">
              {/* 큰 stepTitle에 해당될 때 조건식 필요 true로 대체 */}
              <StepTitle
                num={stepNum}
                isActive={stepContents.some(content => content.isActive)}
                title={stepTitle}
              />
              <StepNavigation className="pl-[14px]" contents={stepContents} />
            </Container.FlexCol>
          ),
        )}
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
          {isLastOfCarousel ? (
            <Button.Fill
              className="gap-x-[10px] rounded-[32px] px-12 py-[15px]"
              onClick={onClickNextButton}
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
