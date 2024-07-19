//! TODO: default value 로 변수명 변경
export const defaultRentalTypes = {
  0: '상관없음',
  1: '월세',
  2: '전세',
  3: '반전세',
} as const;

export const defaultHouseTypes = {
  0: {
    icon: 'studio-officetel',
    houseInfo: '원룸/오피스텔',
  },
  1: {
    icon: 'villa-townhouse',
    houseInfo: '빌라/연립',
  },
  2: {
    icon: 'apartment',
    houseInfo: '아파트',
  },
  3: {
    icon: 'single-family-house',
    houseInfo: '단독주택',
  },
};

export const defaultGenderTypes = {
  0: {
    icon: 'mini-gender-intersex',
    sex: '상관없음',
  },
  1: {
    icon: 'mini-male',
    sex: '남성',
  },
  2: {
    icon: 'mini-female',
    sex: '여성',
  },
} as const;

export const defaultSmokingTypes = {
  true: {
    icon: 'mini-smoke',
    smokeInfo: '흡연자',
  },
  false: {
    icon: 'mini-none-smoke',
    smokeInfo: '비흡연자',
  },
} as const;

export const defaultPetTypes = {
  0: {
    icon: 'mini-dont-mind-pet',
    petInfo: '반려동물 상관없어요',
  },
  1: {
    icon: 'mini-pet-lover',
    petInfo: '반려동물 키워요',
  },
  2: {
    icon: 'mini-none-pet-lover',
    perInfo: '반려동물 NO',
  },
} as const;

export const defaultFloorTypes = {
  0: '지하',
  1: '반지하',
  2: '지상',
} as const;
