import { atom, RecoilState } from 'recoil';

import { HouseListFilterType } from '@/types/house.type';

const HouseListFilterAtomState: RecoilState<HouseListFilterType> =
  atom<HouseListFilterType>({
    key: 'HouseListFilterAtomState',
    default: {
      house_type: undefined,
      rental_type: undefined,
      term: [0, 25],
      deposit_price: [0, 10000],
      monthly_rental_price: [0, 500],
      mate_number: undefined,
      mate_gender: undefined,
      regions: undefined,
    },
  });

export default HouseListFilterAtomState;
