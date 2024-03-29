import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/molecules/IconButton';

export default function SignUpProfile1_1Template() {
  return (
    <Container.FlexCol className="min-w-full">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-1" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">
          집 유형
        </Typography.SubTitle1>
        {/* TODO ICON 변경 */}
        <Container.FlexRow className="mb-[4.25rem] mt-11 gap-x-6">
          <IconButton.Outline
            className="flex-1 gap-y-5 rounded-lg py-5"
            iconType="right-arrow"
            direction="top"
          >
            <Typography.P2 className="text-brown">원룸/오피스텔</Typography.P2>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex-1 gap-y-5 rounded-lg py-5"
            iconType="right-arrow"
            direction="top"
          >
            <Typography.P2 className="text-brown">빌라/연립</Typography.P2>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex-1 gap-y-5 rounded-lg py-5"
            iconType="right-arrow"
            direction="top"
          >
            <Typography.P2 className="text-brown">아파트</Typography.P2>
          </IconButton.Outline>
          <IconButton.Outline
            className="flex-1 gap-y-5 rounded-lg py-5"
            iconType="right-arrow"
            direction="top"
          >
            <Typography.P2 className="text-brown">단독주택</Typography.P2>
          </IconButton.Outline>
        </Container.FlexRow>
        <Typography.SubTitle1 className="text-brown">
          매물 종류
        </Typography.SubTitle1>
        <Container.FlexRow className="mt-11 gap-x-6">
          <Button.Outline className="flex-1 rounded-lg py-5">
            <Typography.P2 className="flex-1 text-brown">
              원룸/오피스텔
            </Typography.P2>
          </Button.Outline>
          <Button.Outline className="flex-1 rounded-lg py-5">
            <Typography.P2 className="flex-1 text-brown">
              빌라/연립
            </Typography.P2>
          </Button.Outline>
          <Button.Outline className="flex-1 rounded-lg py-5">
            <Typography.P2 className="flex-1 text-brown">아파트</Typography.P2>
          </Button.Outline>
          <Button.Outline className="flex-1 rounded-lg py-5">
            <Typography.P2 className="flex-1 text-brown">
              단독주택
            </Typography.P2>
          </Button.Outline>
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
