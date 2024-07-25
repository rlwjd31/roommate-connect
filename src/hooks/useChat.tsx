import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';

/**
 * [queryKey, userId, chatRoomId]
 */
type LastReadDateProps = [string, string, string];
/**
 * [queryKey, chatRoomId, lastReadDate]
 */
type UnReadMessagesProps = [string, string, string];

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

export {
  fetchLastReadDate,
  fetchUnReadMessagesCount,
  useUnReadMessageCount,
};
