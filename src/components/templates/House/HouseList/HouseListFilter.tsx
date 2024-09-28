import Container from '@/components/atoms/Container';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import cn from '@/libs/cn';

export default function HouseListFilter() {
  const filterBtnStyle =
    'cursor-pointer items-center gap-3 rounded-full bg-white shadow-[0_3px_8px_0_rgba(0,0,0,16%)] text-brown hover:ring hover:ring-point active:bg-list-point active:text-white';
  return (
    <Container.FlexCol className="mb-[3.75rem] gap-5">
      <Container.FlexRow className="justify-center">
        <Container.FlexRow className="gap-x-4">
          <IconButton.Ghost
            iconType="filter"
            direction="left"
            className={cn(
              'h-[2.6875rem] px-[0.9063rem] tablet:h-[3.9375rem] tablet:px-[1.5625rem]',
              filterBtnStyle,
            )}
          >
            <Typography.SpanMid2 className="leading-150 tablet:text-[1rem]">
              필터
            </Typography.SpanMid2>
          </IconButton.Ghost>
          <Link to="/house/regist">
            <IconButton.Ghost
              iconType="add"
              direction="left"
              className={cn(
                'h-[2.6875rem] px-[0.9063rem] tablet:h-[3.9375rem] tablet:px-[1.5625rem]',
                filterBtnStyle,
              )}
            >
              <Typography.SpanMid2 className="leading-150 tablet:text-[1rem]">
                하우스 등록
              </Typography.SpanMid2>
            </IconButton.Ghost>
          </Link>
        </Container.FlexRow>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
