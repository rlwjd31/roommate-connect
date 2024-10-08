import HouseListTemplate from '@/components/templates/House/HouseList/HouseList.template';
import { useInfiniteHouseList } from '@/hooks/useHouse';

export default function HouseList() {
  const infiniteHouseListResult = useInfiniteHouseList();

  return (
    <HouseListTemplate
      houseList={
        infiniteHouseListResult.data?.pages.flatMap(page => page.data) || []
      }
      {...infiniteHouseListResult}
    />
  );
}
