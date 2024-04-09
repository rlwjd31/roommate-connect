import Container from '@/components/atoms/Container';
import StepLink from '@/components/atoms/StepLink';
import cn from '@/libs/cn';

type Props = {
  contents: {
    labelName: string;
    isActive: boolean;
  }[];
};

export default function StepNavigation({ contents }: Props) {
  const stepLineStyle =
    '[&>button:not(:first-child)]:after:absolute [&>button:not(:first-child)]:after:left-[3px] [&>button:not(:first-child)]:after:-top-1/2 [&>button:not(:first-child)]:after:h-full [&>button:not(:first-child)]:after:w-[1px] [&>button:not(:first-child)]:after:bg-brown2';

  return (
    <Container.FlexCol
      className={cn('relative w-fit justify-between', stepLineStyle)}
    >
      {contents.map(({ labelName, isActive }) => (
        <StepLink key={labelName} labelName={labelName} isActive={isActive} />
      ))}
    </Container.FlexCol>
  );
}
