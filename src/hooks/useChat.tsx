import {
  QueryFunctionContext,
  useQueries,
  useQuery,
} from '@tanstack/react-query';

import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';
import { Tables } from '@/types/supabase';

/**
 * [queryKey, userId, chatRoomId]
 */
type LastReadDateProps = [string, string, string];
/**
 * [queryKey, chatRoomId, lastReadDate]
 */
type UnReadMessagesProps = [string, string, string];
/**
 * [queryKey, userId]
 */
type ChatRoomListProps = [string, string];
/**
 * [queryKey, chatPartnerId]
 */
type ChatPartnerInfoProps = [string, string];

// TODO: suspense와 ErrorBoundary사용을 위해 throwOnError & suspense option활성화
const fetchLastReadDate = async ({
  queryKey,
}: QueryFunctionContext<LastReadDateProps>) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, userId, chatRoomId] = queryKey;
  const { data, error, status } = await supabase
    .from('user_chat')
    .select('last_read')
    .eq('id', userId)
    .eq('chat_room_id', chatRoomId)
    .single();

  if (error) {
    throw new SupabaseCustomError(error, status);
  }

  const userLastRead = data.last_read;

  return userLastRead;
};

const fetchUnReadMessagesCount = async ({
  queryKey,
}: QueryFunctionContext<UnReadMessagesProps>) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, chatRoomId, lastReadDate] = queryKey;
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

const fetchChatRoomList = async ({
  queryKey,
}: QueryFunctionContext<ChatRoomListProps>) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, userId] = queryKey;
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

const fetchChatPartnerInfo = async ({
  queryKey,
}: QueryFunctionContext<ChatPartnerInfoProps>) => {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [_, chatPartnerId] = queryKey;
  const { data, error, status } = await supabase
    .from('user')
    .select('*')
    .eq('id', chatPartnerId)
    .single();

  if (!data && error) throw new SupabaseCustomError(error, status);

  return data;
};

// db join이 table구성 상 되지 않는 관계로 dependent query로 구성
// TODO: 추후 db 바꿀 시 join으로 수정
const useUnReadMessageCount = (userId: string, chatRoomId: string) => {
  const { data: lastReadDate } = useQuery({
    queryKey: ['lastReadDate', userId, chatRoomId],
    queryFn: fetchLastReadDate,
    enabled: !!userId,
  });

  const { data: unReadMessagesCount } = useQuery({
    queryKey: ['unReadMessagesCount', chatRoomId, lastReadDate!],
    queryFn: fetchUnReadMessagesCount,
    enabled: !!lastReadDate,
  });

  return unReadMessagesCount;
};

const useChatRoomListPageData = (userId: string) => {
  const { data: chatRoomList } = useQuery({
    queryKey: ['chatRoomList', userId],
    queryFn: fetchChatRoomList,
    enabled: !!userId,
  });

  const chatRoomListPageData = useQueries({
    queries: chatRoomList
      ? chatRoomList.map(chatRoomInfo => {
          const {
            id: chatId,
            last_message: lastMessage,
            last_message_date: lastMessageDate,
            users: userIds,
          } = chatRoomInfo;

          const chatPartnerId = userIds?.filter(
            eachUserId => eachUserId !== userId,
          )[0];

          if (!chatPartnerId) throw new Error(`couldn't find chat partner id`);

          return {
            queryKey: ['chatPartnerInfo', chatPartnerId] as [string, string],
            queryFn: fetchChatPartnerInfo,
            // * combine에서 하려 했지만, chatId, lastMessage 등 값을 scope 때문에 참조할 수 없어 select를 사용
            select: (data: Tables<'user'>) => ({
              chatId,
              lastMessage,
              lastMessageDate,
              userIds,
              chatPartnerInfo: { ...data },
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

  return chatRoomListPageData.data;
};

export { useUnReadMessageCount, useChatRoomListPageData };
