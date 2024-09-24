import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';

export default function HouseListTitle() {
  return (
    <Container className="relative h-[17.3125rem] bg-bg-beige p-[1.6875rem] s-tablet:h-[40rem] s-tablet:px-8 s-tablet:pt-[11.25rem] tablet:h-[45.625rem] laptop:h-[50.8125rem] desktop:h-[52.75rem] monitor:h-[56.25rem]">
      <Container.FlexCol className="mx-auto max-w-[79rem] items-start gap-4">
        <Typography.P1 className="text-[1rem] font-normal leading-[135%] text-[#FF5F3C] tablet:text-[1.75rem] laptop:text-[2rem]">
          HOUSE THE COLLECTION
        </Typography.P1>
        <Container.FlexCol className="text-[#FF5F3C]">
          <Typography.P1 className="text-[2.5rem] s-tablet:text-[6.375rem] laptop:text-[7.8175rem] desktop:text-[8.375rem]">
            HOUSE
          </Typography.P1>
          <Typography.P1 className="text-[2.5rem] s-tablet:text-[6.375rem] laptop:text-[7.8175rem] desktop:text-[8.375rem]">
            -CONNECT
          </Typography.P1>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container>
  );
}
