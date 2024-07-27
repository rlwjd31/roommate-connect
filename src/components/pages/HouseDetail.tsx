import { useQueries } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import HouseDetailTemplate, {
  HouseData,
} from '@/components/templates/HouseDetailTemplate';
import { useHouseBookMark, useHouseDetail } from '@/hooks/useHouseDetail';
import { UserAtom } from '@/stores/auth.store';

function HouseDetail() {
  const { houseId } = useParams();
  const user = useRecoilValue(UserAtom);
  const data = useQueries({
    queries: [useHouseDetail(houseId), useHouseBookMark(user, houseId)],
  });
  const [houseDetail, houseBookmark] = data;
  const { data: houseData } = houseDetail;
  const { data: bookmark } = houseBookmark;

  return (
    <HouseDetailTemplate
      houseData={houseData?.data as unknown as HouseData}
      bookmark={bookmark?.data as unknown as boolean}
      houseId={houseId as string}
    />
  );
}

export default HouseDetail;
