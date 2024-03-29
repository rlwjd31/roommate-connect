import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';

export default function SignUpProfile1_2Template() {
  return (
    <Container.FlexCol className="w-[894px] flex-[0_0_auto]">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-2"
          title="내가 원하는 룸메이트는..."
        />
        <Typography.SubTitle1 className="text-brown">
          상대방에게 어필하고 싶은 3개를 작성해주세요
        </Typography.SubTitle1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
