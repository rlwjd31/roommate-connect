import Container from '@/components/atoms/Container';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import cn from '@/libs/cn';

export default function HouseListFilter() {
  const filterBtnStyle =
    'cursor-pointer items-center gap-3 rounded-[1.875rem] bg-white  shadow-[0_3px_8px_0_rgba(0,0,0,16%)] text-brown hover:bg-bg-beige active:bg-list-point active:text-white';
  return (
    <Container.FlexRow className="mb-[3.75rem] justify-center">
      <Container.FlexRow className="gap-x-4">
        <IconButton.Ghost
          iconType="filter"
          direction="left"
          className={cn('h-[63px] px-[1.5625rem]', filterBtnStyle)}
        >
          <Typography.P3 className="leading-150">필터</Typography.P3>
        </IconButton.Ghost>
        <Link to="/house/regist">
          <IconButton.Ghost
            iconType="add"
            direction="left"
            className={cn('h-[63px] px-[1.5625rem]', filterBtnStyle)}
          >
            <Typography.P3 className="leading-150">하우스 등록</Typography.P3>
          </IconButton.Ghost>
        </Link>
      </Container.FlexRow>
    </Container.FlexRow>
  );
}
