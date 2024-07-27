import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import { Tables } from '@/types/supabase';

// TODO: suspense와 ErrorBoundary사용을 위해 throwOnError & suspense option활성화
const fetchLastReadDate = async (userId: string, chatRoomId: string) => {
  const { data, error, status } = await supabase
    .from('user_chat')
    .select('last_read')
    .eq('user_id', userId)
    .eq('chat_room_id', chatRoomId)
    .single();

  if (error) {
    throw new SupabaseCustomError(error, status);
  }

  const userLastRead = data.last_read;

  return userLastRead;
};

// db join이 table구성 상 되지 않는 관계로 dependent fetch로 구성(chatRoomListPageData 내부 참조)
// TODO: 추후 db 바꿀 시 join으로 수정
const fetchUnReadMessagesCount = async (
  chatRoomId: string,
  lastReadDate: string,
) => {
  const { data, error, status } = await supabase
    .from('messages')
    .select('id', { count: 'exact' })
    .eq('chat_room_id', chatRoomId) // TODO: alternate chatRoomId
    .gt('created_at', lastReadDate);

  if (error) {
    throw new SupabaseCustomError(error, status);
  }

  return data.length;
};

const fetchChatRoomList = async (userId: string) => {
  const { data, error, status } = await supabase
    .from('chat_room')
    .select('*')
    .contains('users', [userId])
    .order('last_message_date', { ascending: false });

  // * chatRoomList가 없을 때는 null로 들어옴
  if (error && !data) {
    throw new SupabaseCustomError(error, status);
  }

  return data;
};

const fetchChatPartnerInfo = async (chatPartnerId: string) => {
  const { data, error, status } = await supabase
    .from('user')
    .select('*')
    .eq('id', chatPartnerId)
    .single();

  if (!data && error) throw new SupabaseCustomError(error, status);

  return data;
};

const updateLastRead = async (userId: string, chatRoomId: string) => {
  const { data, error, status } = await supabase
    .from('user_chat')
    .update({ last_read: JSON.stringify(new Date()) })
    .eq('user_id', userId)
    .eq('chat_room_id', chatRoomId);

  if (!data && error) {
    error.message = `${error?.message}\nfail to update last_read`;
    throw new SupabaseCustomError(error, status);
  }

  return data;
};

const useUnReadMessageCount = (userId: string, chatRoomId: string) => {
  const { data: lastReadDate } = useQuery({
    queryKey: ['lastReadDate', userId, chatRoomId],
    queryFn: () => fetchLastReadDate(userId, chatRoomId),
    enabled: !!userId,
  });

  const { data: unReadMessagesCount } = useQuery({
    queryKey: ['unReadMessagesCount', chatRoomId, lastReadDate!],
    queryFn: () => fetchUnReadMessagesCount(chatRoomId, lastReadDate!),
    enabled: !!lastReadDate,
  });

  return unReadMessagesCount;
};

const useChatRoomListPageData = (userId: string) => {
  const { data: chatRoomList } = useQuery({
    queryKey: ['chatRoomList', userId],
    queryFn: () => fetchChatRoomList(userId),
    enabled: !!userId,
  });

  const { data: chatRoomListPageData } = useQueries({
    queries: chatRoomList
      ? chatRoomList.map(chatRoomInfo => {
          const {
            id: chatRoomId,
            last_message: lastMessage,
            last_message_date: lastMessageDate,
            users: userIds,
          } = chatRoomInfo;

          const chatPartnerId = userIds?.filter(
            eachUserId => eachUserId !== userId,
          )[0];

          if (!chatPartnerId) throw new Error(`couldn't find chat partner id`);

          return {
            queryKey: ['chatPartnerInfo', userId, chatRoomId, chatPartnerId],
            queryFn: async () => {
              const lastReadDate = await fetchLastReadDate(userId, chatRoomId);
              const newChatCount = await fetchUnReadMessagesCount(
                chatRoomId,
                lastReadDate!,
              );
              const chatPartnerInfo = await fetchChatPartnerInfo(chatPartnerId);

              return {
                newChatCount,
                chatPartnerInfo,
              };
            },
            // * combine에서 하려 했지만, chatId, lastMessage 등 값을 scope 때문에 참조할 수 없어 select를 사용
            select: (data: {
              newChatCount: number;
              chatPartnerInfo: Tables<'user'>;
            }) => ({
              chatRoomId,
              lastMessage,
              lastMessageDate,
              userIds,
              newChatCount: data.newChatCount,
              chatPartnerInfo: { ...data.chatPartnerInfo },
            }),
            enabled: !!chatPartnerId,
          };
        })
      : [],
    // ? useQueries의 반환값이 각 배열 요소에 useQuery의 return 값이므로 combine을 통해 필요한 data로만 치환함.
    combine: results => ({
      // ! chatListPageData가 undefined[]와 같은 type으로도 추론되어 filter를 적용
      data: results
        .map(result => result.data)
        .filter(data => data !== undefined),
    }),
  });

  return {
    chatRoomListPageData,
    totalNewChatsCount: chatRoomListPageData?.reduce(
      (acc, cur) => acc + (cur.newChatCount || 0),
      0,
    ),
  };
};

const useUpdateLastRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      chatRoomId,
    }: {
      userId: string;
      chatRoomId: string;
    }) => updateLastRead(userId, chatRoomId),
    onMutate: () => console.log('mutating'),
    onError: () => console.error('error 발생'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatRoomList'] });
      queryClient.invalidateQueries({ queryKey: ['chatPartnerInfo'] });
    },
  });
};

export { useUnReadMessageCount, useChatRoomListPageData, useUpdateLastRead };
