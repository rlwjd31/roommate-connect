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

  return (
    <Container.FlexRow
      className={cn(
        'sticky top-0 z-10 w-full justify-between bg-bg py-8',
        's-tablet:bottom-0 s-tablet:border-t-[1px] s-tablet:border-brown',
        'bg-teal-200',
      )}
    >
      {/* 취소 버튼 */}
      <Container.FlexRow>
        <Button.Fill
          className="flex h-[3.5rem] w-[9.25rem] items-center justify-center
    rounded-[2rem] border border-brown bg-bg"
          onClick={() => navigate(routePaths.root)}
          disabled={buttonDisable}
        >
          <Typography.P1 className="text-brown">취소</Typography.P1>
        </Button.Fill>
      </Container.FlexRow>
      {/* 이전 다음 버튼 */}
      <Container.FlexRow className="gap-4">
        {currentStep === 0 ? (
          <Button.Fill
            className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem] bg-brown p-2"
            onClick={onClickNextCarousel}
            disabled={buttonDisable}
          >
            <Typography.P1 className="text-brown tablet:text-bg">
              다음
            </Typography.P1>
          </Button.Fill>
        ) : (
          <>
            {/* 이전 버튼 */}
            <Button.Outline
              className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem] border border-brown p-2"
              onClick={onClickPrevCarousel}
            >
              <Typography.P1 className="text-brown">이전</Typography.P1>
            </Button.Outline>
            {/* 완료 버튼 */}
            <Button.Fill
              className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem] bg-brown p-2"
              type="submit"
              disabled={buttonDisable}
            >
              <Typography.P1 className="text-brown tablet:text-bg">
                완료
              </Typography.P1>
            </Button.Fill>
          </>
        )}
      </Container.FlexRow>
    </Container.FlexRow>
  );
}
