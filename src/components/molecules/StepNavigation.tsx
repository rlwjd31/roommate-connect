import Container from '@/components/atoms/Container';
import StepLink from '@/components/atoms/StepLink';
import cn from '@/libs/cn';

type Props = {
  contents: {
    labelName: string;
    routePath: string;
  }[];
  currentStep?: number;
};

export default function StepNavigation({
  contents,
  currentStep = 0,
}: Props) {
  const stepLineStyle =
    '[&>a:not(:first-child)]:after:absolute [&>a:not(:first-child)]:after:left-[3px] [&>a:not(:first-child)]:after:-top-1/2 [&>a:not(:first-child)]:after:h-full [&>a:not(:first-child)]:after:w-[1px] [&>a:not(:first-child)]:after:bg-brown2';

  return (
    <Container.FlexCol
      className={cn('relative w-fit justify-between', stepLineStyle)}
    >
      {contents.map(({ labelName, routePath }, index) => (
        <StepLink
          key={labelName}
          routePath={routePath}
          labelName={labelName}
          isActive={currentStep === index}
        />
      ))}
    </Container.FlexCol>
  );
}

StepNavigation.defaultProps = {
  currentStep: 0,
};
