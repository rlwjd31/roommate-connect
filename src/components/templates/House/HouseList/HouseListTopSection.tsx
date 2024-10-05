import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import cn from '@/libs/cn';

type HouseListTopSectionProps = {
  className?: string;
};

export default function HouseListTopSection({
  className,
}: HouseListTopSectionProps) {
  return (
    // <Container className="relative h-screen s-tablet:h-[40rem] s-tablet:px-8 s-tablet:pt-[11.25rem] tablet:h-[45.625rem] laptop:h-[50.8125rem] desktop:h-[52.75rem] monitor:h-[56.25rem]">
    <Container.FlexCol
      className={cn(
        // 5.2rem
        'h-[calc(100vh-12rem)] justify-between relative bg-bg-beige pt-20 overflow-hidden',
        's-tablet:pt-[8rem]',
        className,
      )}
    >
      {/* text 부분 */}
      <Container.FlexCol className="max-w-[79rem] items-start gap-4 px-8 pt-12">
        <Typography.P1
          lang="en"
          className="text-xl font-medium text-point1 tablet:text-[1.75rem] laptop:text-[2rem]"
        >
          HOUSE THE COLLECTION
        </Typography.P1>
        <Container.FlexCol className="text-point1">
          <Typography.P1
            lang="en"
            className="mb-1 text-[3rem] font-medium s-tablet:text-[6.375rem] laptop:text-[7.8175rem] desktop:text-[8.375rem]"
          >
            HOUSE
          </Typography.P1>
          <Typography.P1
            lang="en"
            className="text-[3rem] font-medium s-tablet:text-[6.375rem] laptop:text-[7.8175rem] desktop:text-[8.375rem]"
          >
            -CONNECT
          </Typography.P1>
        </Container.FlexCol>
      </Container.FlexCol>
      <Container.FlexRow className="h-[8rem] w-full items-end justify-center bg-bg-orange [clip-path:polygon(50%_0%,100%_42%,100%_100%,0_100%,0%_42%)] monitor:h-[27%]">
        <Container.FlexCol className="mb-4 items-center gap-8">
          <IconButton.Ghost
            iconType="down-arrow"
            iconClassName="h-7 w-auto s-tablet:h-[1.6875rem] tablet:h-[2rem] desktop:h-[2.5rem]"
          />
          <Typography.SubTitle3
            lang="en"
            className="text-[1rem] font-normal text-point1 "
          >
            Find Your Roommate.
          </Typography.SubTitle3>
        </Container.FlexCol>
      </Container.FlexRow>
      <Icon
        type="character"
        className={cn(
          'absolute bottom-[4rem] right-[1rem] z-20 h-[10rem] w-[8rem] transition-all',
          'mobile:h-[12rem] mobile:w-[10rem] mobile:right-[2rem]',
        )}
      />
    </Container.FlexCol>
  );
}

HouseListTopSection.defaultProps = {
  className: '',
};
