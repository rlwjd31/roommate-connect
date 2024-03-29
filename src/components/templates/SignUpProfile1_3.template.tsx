import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';

export default function SignUpProfile1_2Template() {
  return (
    <Container.FlexCol className="w-[894px] flex-[0_0_auto]">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-3" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">
          가격대는 이 정도가 적당해요
        </Typography.SubTitle1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
