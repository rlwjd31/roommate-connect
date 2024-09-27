import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';

export default function HouseListTopSection() {
  return (
    <Container className="relative h-[17.3125rem] bg-bg-beige p-[1.6875rem] s-tablet:h-[40rem] s-tablet:px-8 s-tablet:pt-[11.25rem] tablet:h-[45.625rem] laptop:h-[50.8125rem] desktop:h-[52.75rem] monitor:h-[56.25rem]">
      <Container.FlexCol className="mx-auto max-w-[79rem] items-start gap-4">
        <Typography.P1 className="text-[1rem] font-normal leading-[135%] text-list-point tablet:text-[1.75rem] laptop:text-[2rem]">
          HOUSE THE COLLECTION
        </Typography.P1>
        <Container.FlexCol className="text-list-point">
          <Typography.P1 className="text-[2.5rem] s-tablet:text-[6.375rem] laptop:text-[7.8175rem] desktop:text-[8.375rem]">
            HOUSE
          </Typography.P1>
          <Typography.P1 className="text-[2.5rem] s-tablet:text-[6.375rem] laptop:text-[7.8175rem] desktop:text-[8.375rem]">
            -CONNECT
          </Typography.P1>
        </Container.FlexCol>
      </Container.FlexCol>
      <Container.FlexRow className="justify-center">
        <Container.FlexCol className="absolute bottom-[5%] z-30 items-center tablet:gap-[3rem]">
          <IconButton.Ghost
            iconType="down-arrow"
            iconClassName="h-[1.3438rem] w-auto s-tablet:h-[1.6875rem] tablet:h-[2rem] desktop:h-[2.5rem]"
          />
          <Typography.Head3
            className="hidden font-normal text-list-point tablet:block laptop:text-[1.75rem] desktop:text-[2rem]"
            id="list-start"
          >
            Find Your Roommate.
          </Typography.Head3>
        </Container.FlexCol>
        <Icon
          type="character"
          className="absolute bottom-[5%] left-1/2 z-20 h-[7.8125rem] w-auto translate-x-[50%] transition-all s-tablet:h-[13.3125rem] tablet:h-[18.875rem] laptop:h-[22.5rem] laptop:translate-x-[60%] desktop:h-[28.8125rem] desktop:translate-x-[80%]"
        />
      </Container.FlexRow>
      <Container className="absolute inset-x-0  bottom-0 z-0 h-[25%] w-full justify-center bg-bg-orange [clip-path:polygon(50%_0%,0%_100%,100%_100%)] monitor:h-[27%]" />
    </Container>
  );
}
