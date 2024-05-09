import ModalBackdrop from './ModalBackdrop';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Button from '@/components/atoms/Button';

export default function RoomMateApplicationStatus() {
  return (
    <ModalBackdrop modalType="RoomMateApplication">
      <Container.FlexCol className="max-h-[566px] w-full max-w-[874px] bg-bg p-8 text-brown">
        <Container.FlexRow className="justify-between">
          <Typography.Head3>신청 현황</Typography.Head3>
          <IconButton iconType="close" button="Outline" />
        </Container.FlexRow>
        <Container.FlexCol className="pt-6">
          <Typography.SubTitle2>신청한 인원 1명</Typography.SubTitle2>
          <Container.FlexCol className="gap-6">
            <div className="">user data</div>
            <Container.FlexRow>
              <Button.Outline>1:1 대화</Button.Outline>
              <Button.Outline>거절</Button.Outline>
              <button type="button">수락</button>
            </Container.FlexRow>
          </Container.FlexCol>
        </Container.FlexCol>
      </Container.FlexCol>
    </ModalBackdrop>
  );
}
