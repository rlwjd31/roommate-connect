import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Icon from '@/components/atoms/Icon';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import IconButton from '@/components/molecules/IconButton';

export default function HouseDetailTemplate() {
  return (
    <Container.FlexCol className="gap-8 ">
      <Container.Grid className="max-h-[590px] grid-cols-4 grid-rows-2 gap-5">
        <Img
          src="https://source.unsplash.com/random/300×300"
          alt="house image"
          className="col-span-2 row-span-2"
        />
        <Img
          src="https://source.unsplash.com/random/300×300"
          alt="house image"
          className=""
        />
        <Img
          src="https://source.unsplash.com/random/300×300"
          alt="house image"
          className=""
        />
        <Img
          src="https://source.unsplash.com/random/300×300"
          alt="house image"
          className=""
        />
        <Img
          src="https://source.unsplash.com/random/300×300"
          alt="house image"
          className=""
        />
      </Container.Grid>
      <Container.FlexCol>
        <Container.FlexCol className="gap-14 border-b	border-brown pb-8">
          <Container.FlexCol className="gap-4">
            <Typography.Head2 className="text-brown">
              반포동 근처 룸메이트 구합니다
            </Typography.Head2>
            <Container.FlexRow className="gap-3">
              <Typography.Span1 className="text-brown1">
                최근 등록일 2024.05.01
              </Typography.Span1>
              <Divider.Row />
              <Typography.Span1 className="text-brown1">
                최근 수정일 2024.05.02
              </Typography.Span1>
            </Container.FlexRow>
          </Container.FlexCol>
          <Container.FlexRow className="justify-between	">
            <Container.FlexRow className="gap-5">
              <Button.Fill className="rounded-lg px-7 py-5 text-white">
                <Typography.P1>룸메이트 신청</Typography.P1>
              </Button.Fill>
              <Button.Outline className="rounded-lg bg-white px-7 py-5 text-brown ">
                <Typography.P1>메시지 보내기</Typography.P1>
              </Button.Outline>
            </Container.FlexRow>
            <Container.FlexRow className="gap-10">
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost iconType="heart" />
                <Typography.Span1 className="text-brown1">43</Typography.Span1>
              </Container.FlexCol>
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost iconType="share" />
                <Typography.Span1 className="text-brown1">
                  공유
                </Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
          </Container.FlexRow>
        </Container.FlexCol>
        <Container.FlexRow className="mt-14 justify-between gap-7">
          <Container.FlexCol className="gap-11 text-brown">
            <Container.FlexRow className="items-center gap-4 ">
              <Icon className="[&>svg]:size-16 " type="avatar" />
              <Typography.Head3>user123</Typography.Head3>
            </Container.FlexRow>
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>자기소개</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                <Button.Outline className="rounded-3xl px-5 py-2">
                  남성
                </Button.Outline>
                <Button.Outline className="rounded-3xl px-5 py-2">
                  흡연자
                </Button.Outline>
                <Button.Outline className="rounded-3xl px-5 py-2">
                  반려동물 NO
                </Button.Outline>
              </Container.FlexRow>
            </Container.FlexCol>
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>라이프 스타일</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                <Button.Outline className="rounded-3xl px-5 py-2">
                  늦게 자요
                </Button.Outline>
                <Button.Outline className="rounded-3xl px-5 py-2">
                  청소 자주해요
                </Button.Outline>
                <Button.Outline className="rounded-3xl px-5 py-2">
                  코골이 해요
                </Button.Outline>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexCol>
          <Container.FlexCol className="gap-12 p-8 text-brown">
            <Container.FlexCol className="gap-5">
              <Container.FlexRow className="gap-4">
                <Typography.Head3>월세 500/70</Typography.Head3>
                <Divider.Col />
                <Typography.P1 className="leading-6">
                  관리비 20만원
                </Typography.P1>
              </Container.FlexRow>
              <Typography.P2>서울시 서초구 반포동</Typography.P2>
            </Container.FlexCol>
            <Container.FlexCol className="gap-5">
              <Typography.SubTitle1>하우스 소개</Typography.SubTitle1>
              <Container.FlexRow className="items-center">
                <Icon type="apartment" />
                <BadgeButton.Fill className="rounded-3xl px-5 py-2 text-white">
                  원룸/오피스텔
                </BadgeButton.Fill>
              </Container.FlexRow>
            </Container.FlexCol>
            <Container.FlexCol className="gap-5">
              <Typography.SubTitle1>이런 특징이 있어요</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                <BadgeButton.Fill className="rounded-3xl px-5 py-2 text-white">
                  역 도보 5분
                </BadgeButton.Fill>
                <BadgeButton.Fill className="rounded-3xl px-5 py-2 text-white">
                  정류장 3분
                </BadgeButton.Fill>
                <BadgeButton.Fill className="rounded-3xl px-5 py-2 text-white">
                  햇빛 잘 들어요
                </BadgeButton.Fill>
              </Container.FlexRow>
            </Container.FlexCol>
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>원하는 룸메이트</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                <BadgeButton.Outline className="rounded-3xl px-5 py-2">
                  1명
                </BadgeButton.Outline>
                <BadgeButton.Outline className="rounded-3xl px-5 py-2">
                  최소 1년 6개월 이상
                </BadgeButton.Outline>
                <BadgeButton.Outline className="rounded-3xl px-5 py-2">
                  반려동물 NO
                </BadgeButton.Outline>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexCol>
        </Container.FlexRow>

        <Container.FlexCol className="gap-7 pb-16 text-brown ">
          <Typography.SubTitle1>상세설명</Typography.SubTitle1>
          <Container.FlexCol className="rounded-lg bg-brown3 p-8">
            <p className="leading-6">
              안녕하세요 반포동 원룸에서 룸메이트를 구하고 있습니다. <br />
              <br />
              🌟 이 집의 특징 🌟 <br />- 주방 분리형 원룸으로 공간 활용이
              좋습니다. <br />- 싱크대, 에어컨, 냉장고, 세탁기 등의 옵션이
              구비되어 있습니다. <br /> - 깔끔하고 깨끗한 상태로 관리되어
              있어요. <br />
              - 채광이 좋아 밝고 편안한 분위기를 자랑합니다. <br /> - 즉시
              입주가 가능하여 빠르게 이사를 원하시는 분들에게 좋습니다.
            </p>
          </Container.FlexCol>
        </Container.FlexCol>
        <Divider.Row />
        <Container.FlexCol className="gap-9 pt-8">
          <Typography.SubTitle1 className="text-brown">
            댓글 2개
          </Typography.SubTitle1>
          <Container.FlexCol className="items-end gap-8	">
            <Input
              type="text"
              name="comment"
              placeholder="댓글을 남겨보세요."
            />
            <Button.Fill className="h-12 w-16 items-center justify-center rounded-lg text-white	">
              등록
            </Button.Fill>
          </Container.FlexCol>
        </Container.FlexCol>
      </Container.FlexCol>
      <Container.FlexCol>
        <Container.FlexCol className="gap-7 py-8">
          <Container.FlexRow className="justify-between">
            <Container.FlexRow className="gap-4 ">
              <Icon type="avatar" />
              <Container.FlexCol className="gap-3 text-brown">
                <Typography.P1>user123</Typography.P1>
                <Typography.Span1>1시간 전</Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
            <Container.FlexRow className="gap-2">
              <Button.Ghost>답변</Button.Ghost>
              <Button.Ghost>수정</Button.Ghost>
              <Button.Ghost>삭제</Button.Ghost>
            </Container.FlexRow>
          </Container.FlexRow>
          <Typography.P2 className="text-brown">신청 보내봅니다!</Typography.P2>
        </Container.FlexCol>
        <Divider.Col />
        <Container.FlexCol className="gap-7 py-7">
          <Container.FlexRow className="justify-between">
            <Container.FlexRow className="gap-4 ">
              <Icon type="avatar" />
              <Container.FlexCol className="gap-3 text-brown">
                <Typography.P1>user1234</Typography.P1>
                <Typography.Span1>1시간 전</Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
            <Container.FlexRow className="gap-2">
              <Button.Ghost>답변</Button.Ghost>
              <Button.Ghost>수정</Button.Ghost>
              <Button.Ghost>삭제</Button.Ghost>
            </Container.FlexRow>
          </Container.FlexRow>
          <Typography.P2 className="text-brown">
            보증금 올리고 월세 낮춰도 될까요?
          </Typography.P2>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
