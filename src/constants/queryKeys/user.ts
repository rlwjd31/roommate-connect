const USER_KEYS = {
  ALL: ['user'] as const,
  USER_LIFESTYLE: (userId: string) =>
    [...USER_KEYS.ALL, 'lifeSTyle', { id: userId }] as const,
  USER_MATE_STYLE: (userId: string) =>
    [...USER_KEYS.ALL, 'mateStyle', { id: userId }] as const,
};

export default USER_KEYS;
