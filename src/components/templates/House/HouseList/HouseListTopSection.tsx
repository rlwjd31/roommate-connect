import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';

export default function HouseListTopSection() {
  return (
    <Container.FlexCol className="relative w-[79rem] px-8 pt-[12.375rem]">
      <Container.FlexCol className=" gap-6 pb-[4.375rem]">
        <Typography.Head2 className="font-normal leading-[135%] text-[#FF5F3C]">
          HOUSE THE COLLECTION
        </Typography.Head2>
        <Container.FlexCol className="font-bold text-[#FF5F3C]">
          <Typography.P1 className="text-[8.25rem]">HOUSE</Typography.P1>
          <Typography.P1 className="text-[8.25rem]">-CONNECT</Typography.P1>
        </Container.FlexCol>
      </Container.FlexCol>
      <Container.FlexRow className="z-[10] w-[79rem] justify-center">
        <Container.FlexCol className="items-center gap-[3rem]">
          <IconButton.Ghost iconType="down-arrow" />
          <Typography.P1 className="text-[2rem] text-[#FF5F3C]">
            Find your roommate.
          </Typography.P1>
        </Container.FlexCol>
        <Icon
          type="character"
          className="absolute bottom-10 right-[-155px] h-[10.1875rem] w-[8rem] -translate-x-1/2 mobile:h-[25.6875rem] mobile:w-[20.25rem] laptop:h-[28.8125rem] laptop:w-[22.625rem]"
        />
      </Container.FlexRow>
    </Container.FlexCol>
  );
}
