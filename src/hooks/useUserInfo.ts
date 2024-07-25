import { queryOptions } from '@tanstack/react-query';

import { supabase } from '@/libs/supabaseClient';
import { UserType } from '@/types/auth.type';

export type UserInfoType = {
  avatar: string;
  name: string;
  nickname: string;
  gender: 1 | 2;
  user_lifestyle: UserLifeStyleType;
  user_looking_house: UserLookingHouseType;
  user_mate_style: UserMateStyleType;
};

type UserLifeStyleType = {
  pet: 0 | 1 | 2;
  appeals: string[];
  smoking: 'true' | 'false';
};

type UserLookingHouseType = {
  term: [number, number];
  type: 0 | 1 | 2 | 3;
  rental_type: 0 | 1 | 2;
  deposit_price: [number, number];
  monthly_rental_price: [number, number];
  regions: string[];
};

type UserMateStyleType = {
  mate_gender: 0 | 1 | 2;
  mate_number: 0 | 1 | 2 | 3;
  mate_appeals: string[];
  prefer_mate_age: [number, number];
};

export const userInfoQuery = (user: UserType | null) =>
  queryOptions({
    queryKey: ['user', 'info', user?.id],
    queryFn: async () =>
      supabase
        .from('user')
        .select(
          'avatar, name, nickname,gender, user_lifestyle(appeals, pet, smoking), user_looking_house(deposit_price, monthly_rental_price, regions, rental_type, term, type), user_mate_style(mate_gender, mate_number, mate_appeals, prefer_mate_age)',
        )
        .eq('id', user?.id ?? '')
        .single(),
    enabled: !!user,
  });
