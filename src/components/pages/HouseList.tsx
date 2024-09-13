import HouseListTemplate from '@/components/templates/House/HouseList/HouseList.template';
import { useInfiniteHouseList } from '@/hooks/useHouse';

export default function HouseList() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteHouseList();
  return (
    <HouseListTemplate
      houseList={data?.pages.flatMap(page => page.data) || []}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  );
}
