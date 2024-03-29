import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';

export default function SignUpProfile1_2Template() {
  return (
    <Container.FlexCol className="w-[894px] flex-[0_0_auto]">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="2-1"
          title="나의 라이프스타일은..."
        />
        <Typography.SubTitle1 className="text-brown">
          흡연 여부
        </Typography.SubTitle1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
