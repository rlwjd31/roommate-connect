import { SelectorItemValueType } from '@/types/regionDistrict.type';

export type SignUpType = {
  /**
   * ### 찾는 집 유형
   * - 0: 원룸/오피스텔
   * - 1: 빌라/연립
   * - 2: 아파트
   * - 3: 단독주택
   * - undefined: 지정되지 않음(초기값)
   */
  type: 0 | 1 | 2 | 3 | undefined;
  /**
   * ### 집 대여 유형
   * - 0: 상관없음
   * - 1: 월세
   * - 2: 전세
   * - 3: 반 전세
   * - undefined: 지정되지 않음(초기값)
   */
  rental_type: 0 | 1 | 2 | 3 | undefined;
  /**
   * ### 유저가 찾는 지역
   * - `${region} ${district}`의 배열형태
   *
   * [
   *  `${region} ${district}`,
   *  `${region} ${district}`,
   * ]
   * ```
   */
  regions: `${SelectorItemValueType<'지역'>} ${SelectorItemValueType<'시, 구'>}`[];
  /**
   * ### 유저가 살 기간
   * - tuple => [number, number]
   * ```
   * [
   *  minTerm, // 최소 기간(0 ~ 24)
   *  maxTerm, // 최대 기간(0 ~ 24)
   * ]
   * ```
   */
  term: [number, number];
  /**
   * ### 보증금 (전세 혹은 월세) 범위
   * - tuple => [number, number]
   * ```
   * [
   *  minPrice, // 최소 금액(0만원 ~ 10000만원)
   *  maxPrice, // 최대 금액(0만원 ~ 10000만원),
   * ]
   * ```
   */
  deposit_price: [number, number];
  /**
   * ### 월세
   * - tuple => [number, number]
   * ```
   * [
   *  minPrice, // 최소 금액(0만원 ~ 500만원)
   *  maxPrice, // 최대 금액(0만원 ~ 500만원),
   * ]
   * ```
   */
  monthly_price: [number, number];
  /**
   * ### 흡연 여부
   * - true: 흡연함
   * - false: 흡연하지 않음
   * - undefined: 지정되지 않음(초기값)
   */
  smoking: boolean | undefined;
  /**
   * ### 반려동물 여부
   * - 0: 상관없음
   * - 1: 좋음
   * - 2: 싫음
   * - undefined: 지정되지 않음(초기값)
   */
  pet: 0 | 1 | 2 | undefined;
  /**
   * ### 유저가 상대방에게 어필하고 싶은 내용
   * ```
   * [
   *  '어필 내용1',
   *  '어필 내용2',
   *   ...
   * ]
   * ```
   */
  appeals: string[];
  /**
   * ### 원하는 상대방의 성별
   * - 0: 상관없음
   * - 1: 남성
   * - 2: 여성
   * - undefined: 지정되지 않음(초기값)
   */
  gender: 0 | 1 | 2 | undefined;
  /**
   * ### 원하는 메이트 인원 수
   * - 0: 상관없음
   * - 1: 1명
   * - 2: 2명
   * - 3: 3명이상
   * - undefined: 지정되지 않음(초기값)
   */
  mates_number: 0 | 1 | 2 | 3 | undefined;
  /**
   * ### 유저가 상대방에게 원하는 조건 내용
   * ```
   * [
   *  '원하는 조건1',
   *  '원하는 조건2',
   *   ...
   * ]
   * ```
   */
  mate_appeals: string[];
};
