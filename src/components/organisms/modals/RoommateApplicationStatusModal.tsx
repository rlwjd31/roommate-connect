import ModalBackdrop from './ModalBackdrop';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';
import Icon from '@/components/atoms/Icon';

export default function RoomMateApplicationStatus() {
  return (
    <ModalBackdrop modalType="RoomMateApplication">
      <Container.FlexCol className="max-h-[566px] w-full max-w-[874px] bg-bg p-8 text-brown">
        <Container.FlexRow className="justify-between border-b-[0.5px] border-brown pb-7">
          <Typography.Head3 className="">신청 현황</Typography.Head3>
          <IconButton className="size-6" iconType="close" button="Ghost" />
        </Container.FlexRow>
        <Container.FlexCol className="pt-6">
          <Typography.SubTitle2 className="mb-6">
            신청한 인원 1명
          </Typography.SubTitle2>
          <Container.FlexCol className="max-h-96 w-full items-start gap-8 rounded-lg bg-brown6 p-6">
            <Container.FlexRow className="max-w-xl gap-7">
              {/* <Container.FlexRow className="size-[70px] rounded-full bg-brown" /> */}
              <Icon className="[&>svg]:size-16 " type="avartar" />
              <Container.FlexCol className="gap-7">
                <Typography.Head3>user123</Typography.Head3>
                <Container.FlexRow className="flex flex-wrap gap-2.5">
                  <Badge.Outline className="rounded-3xl px-[20px] py-[10px]">
                    1명
                  </Badge.Outline>
                  <Badge.Outline className="rounded-3xl px-[20px] py-[10px]">
                    남성
                  </Badge.Outline>
                  <div className="w-full" />
                  <Badge.Outline className="rounded-3xl px-[20px] py-[10px]">
                    잠귀 어두운 분
                  </Badge.Outline>
                  <Badge.Outline className="rounded-3xl px-[20px] py-[10px]">
                    청소 자주해요
                  </Badge.Outline>
                  <Badge.Outline className="rounded-3xl px-[20px] py-[10px]">
                    늦게 자요
                  </Badge.Outline>
                </Container.FlexRow>
                <Typography.P3 className="text-base">
                  안녕하세요! 1년 6개월 동안 사는 것을 희망하고 조용히 지낼 수
                  있습니다. <br /> 집이 좋아보여서 신청해봅니다!
                </Typography.P3>
              </Container.FlexCol>
            </Container.FlexRow>
            <Container.FlexRow className="w-full flex-wrap items-start justify-between gap-2 border-t-[0.5px] border-brown pt-7">
              <Button.Outline className="rounded-3xl bg-brown6 px-11 py-3">
                1:1 대화
              </Button.Outline>
              <Container.FlexRow className="gap-3">
                <Button.Outline className="rounded-3xl bg-brown6 px-11 py-3">
                  거절
                </Button.Outline>
                <Button.Fill className="rounded-3xl px-11 py-3 text-brown3">
                  수락
                </Button.Fill>
              </Container.FlexRow>
            </Container.FlexRow>
          </Container.FlexCol>
        </Container.FlexCol>
      </Container.FlexCol>
    </ModalBackdrop>
  );
}
