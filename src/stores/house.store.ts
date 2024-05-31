import { RecoilState, atom, selectorFamily } from 'recoil';

import { HouseType } from '@/types/house.type';

export const HouseState: RecoilState<HouseType> = atom<HouseType>({
  key: 'houseState',
  default: {
    id: undefined,
    created_at: undefined,
    updated_at: undefined,
    house_img: [],
    post_title: '',
    region: '',
    district: '',
    house_type: 0,
    rental_type: 0,
    house_size: 0,
    room_num: 1,
    deposit_price: 0,
    monthly_price: 0,
    house_appeal: [],
    mates_num: 0,
    term: [0, 24],
    describe: '',
    bookmark: 0,
    visible: undefined,
    user_id: undefined,
  },
});

export const HouseStateSelector = selectorFamily({
  key: 'houseStateSelector',
  get:
    <K extends keyof HouseType>(param: K) =>
    ({ get }) =>
      get(HouseState)[param],
  set:
    <K extends keyof HouseType>(param: K) =>
    ({ set }, newValue) =>
      set(HouseState, prevState => ({
        ...prevState,
        [param]: newValue,
      })),
});
