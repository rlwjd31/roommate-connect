import { supabase } from '@/libs/supabaseClient';
import SupabaseCustomError from '@/libs/supabaseCustomError';

// TODO: react-query 도입 시 'enable: !!userId'
const fetchLastReadDate = async (userId: string, chatRoomId: string) => {
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

// TODO: react-query 도입 시 'enable: !!lastReadDate'
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

export { fetchLastReadDate, fetchUnReadMessagesCount };
