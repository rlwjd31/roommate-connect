import Container from '@/components/atoms/Container';
import HouseCard from '@/components/organisms/HouseCard';
import { HouseCardType } from '@/types/house.type';

export type HouseListTemplateProps = {
  houseList: HouseCardType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export default function HouseListTemplate(props: HouseListTemplateProps) {
  const { houseList, hasNextPage, fetchNextPage } = props;

  return (
		<>
		<Container.FlexRow className='h-[15.625rem]'>필터</Container.FlexRow>
    <Container.Grid className="grid-cols-[1fr_1fr_1fr_1fr] gap-x-6 gap-y-10 overflow-x-auto px-16 monitor:px-0 [&>img]:object-contain">
      {houseList.map(item => item && <HouseCard key={item.id} {...item} />)}
    </Container.Grid>
		</>
  );
}
