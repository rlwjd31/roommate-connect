import Container from '@/components/atoms/Container.tsx';
import Typography from '@/components/atoms/Typography.tsx';
import IconButton from '@/components/molecules/IconButton.tsx';
import Link from '@/components/atoms/Link.tsx';

type SignUpProfileIntroTemplateProps = {
  name: string;
};

export default function SignUpProfileIntroTemplate(
  props: Readonly<SignUpProfileIntroTemplateProps>,
) {
  const { name } = props;
  return (
    <Container.FlexCol className="items-center gap-y-[60px]">
      <Container.FlexCol className="items-center gap-y-[76px]">
        <Container.FlexCol>
          <Container.FlexCol className="items-center gap-y-7">
            <Typography.Head2 className="text-brown">{`${name}님, 반가워요!`}</Typography.Head2>
            <Typography.P1 className="text-brown">
              다음 항목들을 선택하면 딱 맞는 정보를 추천해드릴게요.
            </Typography.P1>
          </Container.FlexCol>
        </Container.FlexCol>
        <Container.FlexCol className="items-center gap-y-8">
          <IconButton.Fill
            className="mx-auto gap-x-2 rounded-full px-[30px] py-[15px]"
            iconType="right-arrow"
            stroke="bg"
          >
            <Typography.P1 className="text-bg">다음</Typography.P1>
          </IconButton.Fill>
          <Link className="text-brown1 hover:underline" to="/house">
            <Typography.P1>다음에 할게요</Typography.P1>
          </Link>
        </Container.FlexCol>
      </Container.FlexCol>
      {/*  TODO SVG 추가  */}
    </Container.FlexCol>
  );
}
