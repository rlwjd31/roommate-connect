import Container from '@/components/atoms/Container';
import StepLink from '@/components/atoms/StepLink';

type Props = {
  contents: {
    labelName: string;
    isActive: boolean;
  }[];
};

export default function StepNavigation({ contents }: Props) {
  return (
    <Container.FlexCol className="relative w-fit justify-between">
      {contents.map(({ labelName, isActive }) => (
        <StepLink key={labelName} labelName={labelName} isActive={isActive} />
      ))}
    </Container.FlexCol>
  );
}
