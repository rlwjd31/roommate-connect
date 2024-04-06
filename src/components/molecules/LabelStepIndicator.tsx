import Container from '@/components/atoms/Container';
import Link from '@/components/atoms/Link';
import StepIndicator from '@/components/atoms/StepIndicator';
import Typography from '@/components/atoms/Typography';

type Props = {
  contents: {
    label: string;
    routePath: string;
  }[];
};

export default function LabelStepIndicator({ contents }: Props) {
  return (
    <Container.FlexRow className="gap-7">
      <StepIndicator totalStepCount={3} currentStep={1} direction="vertical" />
      <Container.FlexCol className="justify-between gap-8">
        {contents.map(content => (
          <Link key={content.label} to={content.routePath}>
            <Typography.Span1 className="text-brown">
              {content.label}
            </Typography.Span1>
          </Link>
        ))}
      </Container.FlexCol>
    </Container.FlexRow>
  );
}
