const HOUSE_KEYS = {
  ALL: ['house'] as const, // 임시저장, 완전저장된 모든 house게시글
  HOUSE_POST: (houseId: string) =>
    [...HOUSE_KEYS.ALL, 'post', { id: houseId }] as const,
};

export default HOUSE_KEYS;
