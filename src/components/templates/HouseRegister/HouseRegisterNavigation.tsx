import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { routePaths } from '@/constants/route';
import cn from '@/libs/cn';

type NavigationProps = {
  currentStep: number;
  onClickNextCarousel: () => void;
  onClickPrevCarousel: () => void;

  buttonDisable: boolean;
};

export default function HouseRegisterNavigation({
  currentStep,
  onClickNextCarousel,
  onClickPrevCarousel,
  buttonDisable,
}: NavigationProps) {
  const navigate = useNavigate();

  const commonButtonStyle =
    'flex h-[3.5rem] w-[9.25rem] justify-center items-center rounded-[2rem] p-2';

  return (
    <Container.FlexRow
      className={cn(
        'sticky top-0 z-10 w-full justify-between bg-bg py-8',
        's-tablet:bottom-0 s-tablet:border-t-[1px] s-tablet:border-brown',
        'bg-teal-200',
      )}
    >
      <Container.FlexRow>
        <Button.Outline
          className={commonButtonStyle}
          onClick={() => navigate(routePaths.root)}
          disabled={buttonDisable}
        >
          <Typography.P1 className="text-brown">취소</Typography.P1>
        </Button.Outline>
      </Container.FlexRow>
      <Container.FlexRow className="gap-4">
        {currentStep > 0 && (
          <Button.Outline
            className={commonButtonStyle}
            onClick={onClickPrevCarousel}
          >
            <Typography.P1 className="text-brown">이전</Typography.P1>
          </Button.Outline>
        )}
        <Button.Fill
          type={currentStep === 0 ? 'button' : 'submit'}
          className={commonButtonStyle}
          onClick={currentStep === 0 ? onClickNextCarousel : () => {}}
          disabled={buttonDisable}
        >
          <Typography.P1 className="text-bg">
            {currentStep === 0 ? '다음' : '완료'}
          </Typography.P1>
        </Button.Fill>
      </Container.FlexRow>
    </Container.FlexRow>
  );
}
