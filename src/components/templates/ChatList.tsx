import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';

type PointAlertType = {
  content: string | number;
  containerStyle?: string;
  typoStyle?: string;
};

function PointAlert({ content, containerStyle, typoStyle }: PointAlertType) {
  return (
    <Container.FlexRow
      className={cn(
        'w-fit items-center justify-center rounded-full bg-point px-2 pt-[6px] pb-[4px]',
        containerStyle,
      )}
    >
      <Typography.Span2 className={cn('font-semibold text-bg', typoStyle)}>
        {content}
      </Typography.Span2>
    </Container.FlexRow>
  );
}

PointAlert.defaultProps = {
  containerStyle: '',
  typoStyle: '',
};

export default function ChatList() {
  return (
    <Container.FlexCol className="w-full max-w-[21.75rem] bg-brown6">
      <Container.FlexRow className="items-center gap-2 p-6">
        <Typography.SubTitle1 className="translate-y-[1px] text-brown">
          채팅
        </Typography.SubTitle1>
        <PointAlert content={12} containerStyle="self-center" />
      </Container.FlexRow>
      {/* 친구 대화 목록 전체 container */}
      <Container.FlexCol className="gap-2 bg-bg p-2">
        {/* 대화 목록 1개 row */}
        <Container.FlexRow className="items-start gap-4 rounded-xl p-3">
          {/* shrink를 0으로 설정하지 않으면 이미지가 깨짐 */}
          <Img
            className="size-12 shrink-0 rounded-full"
            src="https://lh3.googleusercontent.com/a/ACg8ocK7V1m2Nt7hS2fsu-YLZgNuq1Mw-Xuree9Gyfnr47mupV9pgA=s96-c"
          />
          <Container.FlexCol className="w-full">
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span1 className="font-bold leading-150 text-brown">
                User1234
              </Typography.Span1>
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                오후 9:48
              </Typography.Span2>
            </Container.FlexRow>
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                안녕하세요
              </Typography.Span2>
              <PointAlert content={2} />
            </Container.FlexRow>
          </Container.FlexCol>
        </Container.FlexRow>
        {/* 대화 목록 1개 row */}
        <Container.FlexRow className="items-start gap-4 rounded-xl bg-brown6 p-3">
          {/* shrink를 0으로 설정하지 않으면 이미지가 깨짐 */}
          <Img
            className="size-12 shrink-0 rounded-full"
            src="https://lh3.googleusercontent.com/a/ACg8ocK7V1m2Nt7hS2fsu-YLZgNuq1Mw-Xuree9Gyfnr47mupV9pgA=s96-c"
          />
          <Container.FlexCol className="w-full">
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span1 className="font-bold leading-150 text-brown">
                User1234
              </Typography.Span1>
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                오후 9:48
              </Typography.Span2>
            </Container.FlexRow>
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                안녕하세요
              </Typography.Span2>
              <PointAlert content={2} />
            </Container.FlexRow>
          </Container.FlexCol>
        </Container.FlexRow>
        {/* 대화 목록 1개 row */}
        <Container.FlexRow className="items-start gap-4 rounded-xl p-3">
          {/* shrink를 0으로 설정하지 않으면 이미지가 깨짐 */}
          <Img
            className="size-12 shrink-0 rounded-full"
            src="https://lh3.googleusercontent.com/a/ACg8ocK7V1m2Nt7hS2fsu-YLZgNuq1Mw-Xuree9Gyfnr47mupV9pgA=s96-c"
          />
          <Container.FlexCol className="w-full">
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span1 className="font-bold leading-150 text-brown">
                User1234
              </Typography.Span1>
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                오후 9:48
              </Typography.Span2>
            </Container.FlexRow>
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                안녕하세요
              </Typography.Span2>
              <PointAlert content={2} />
            </Container.FlexRow>
          </Container.FlexCol>
        </Container.FlexRow>
        {/* 대화 목록 1개 row */}
        <Container.FlexRow className="items-start gap-4 rounded-xl p-3">
          {/* shrink를 0으로 설정하지 않으면 이미지가 깨짐 */}
          <Img
            className="size-12 shrink-0 rounded-full"
            src="https://lh3.googleusercontent.com/a/ACg8ocK7V1m2Nt7hS2fsu-YLZgNuq1Mw-Xuree9Gyfnr47mupV9pgA=s96-c"
          />
          <Container.FlexCol className="w-full">
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span1 className="font-bold leading-150 text-brown">
                User1234
              </Typography.Span1>
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                오후 9:48
              </Typography.Span2>
            </Container.FlexRow>
            <Container.FlexRow className="items-center justify-between">
              <Typography.Span2 className="font-semibold leading-150 text-brown2">
                안녕하세요
              </Typography.Span2>
              <PointAlert content={2} />
            </Container.FlexRow>
          </Container.FlexCol>
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
