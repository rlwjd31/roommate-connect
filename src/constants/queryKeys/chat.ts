const CHAT_KEYS = {
  ALL: ['chat'] as const,
  LIST: (userId: string) => [...CHAT_KEYS.ALL, 'list', { userId }],
  LIST_INFO: ({
    userId,
    chatPartnerId,
  }: {
    userId: string;
    chatPartnerId: string;
  }) => [...CHAT_KEYS.ALL, 'listInfo', { userId, chatPartnerId }],
};

export { CHAT_KEYS };

// * queryKeys
// * ['chatRoomList', userId]
// * ['chatRoomInfo', userId, chatPartnerId],
// * ['MessagesGroupByDate', chatRoomId]
// * - chatRoomList
// * - chatRoomInfo
