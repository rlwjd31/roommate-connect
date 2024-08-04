const queryKeys = {
  housePost: (houseId: string) => ['house', houseId] as const,
  userLifeStyle: (userId: string) => ['lifeStyle', userId] as const,
  userMateStyle: (userId: string) => ['mateStyle', userId] as const,
};

export default queryKeys;
