import Container from '@/components/atoms/Container';
import HouseCard from '@/components/organisms/HouseCard';
import HouseListFilter from '@/components/templates/House/HouseList/HouseListFilter';
import { HouseCardType } from '@/types/house.type';

export type HouseListTemplateProps = {
  houseList: HouseCardType[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export default function HouseListTemplate(props: HouseListTemplateProps) {
  const { houseList, hasNextPage, fetchNextPage } = props;

  return (
    <Container.FlexCol>
      <HouseListFilter />
      <Container.Grid className="grid-cols-1 gap-x-6 gap-y-10 px-8 tablet:grid-cols-[1fr_1fr] laptop:grid-cols-[1fr_1fr_1fr] desktop:grid-cols-[1fr_1fr_1fr_1fr] monitor:px-0 [&>img]:object-contain">
        {houseList.map(item => item && <HouseCard key={item.id} {...item} />)}
      </Container.Grid>
    </Container.FlexCol>
  );
}
