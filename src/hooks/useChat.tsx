/* eslint-disable no-restricted-syntax */
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

const fetchMessagesGroupByDate = async (chatRoomId: string) => {
  const { data, error, status } = await supabase.rpc(
    'get_messages_group_by_date',
    {
      input_chat_room_id: chatRoomId!,
    },
  );

  if (error) {
    throw new SupabaseCustomError(error, status);
  }

  return data as { date: string; messages: Tables<'messages'>[] }[];
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

  const { data: chatRoomListPageData, isLoading } = useQueries({
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
            queryKey: ['chatPartnerInfo', userId, chatPartnerId],
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
      isLoading: results.some(result => result.isLoading),
    }),
  });

  return {
    chatRoomListPageData,
    isLoading,
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
      // * refetch chatListPageData
      queryClient.invalidateQueries({ queryKey: ['chatRoomList'] });
      queryClient.invalidateQueries({ queryKey: ['chatPartnerInfo'] });
    },
  });
};

const useGetMessagesGroupByDate = (chatRoomId: string | undefined) => {
  const { data } = useQuery({
    queryKey: ['MessagesGroupByDate', chatRoomId],
    queryFn: () => fetchMessagesGroupByDate(chatRoomId!),
    enabled: !!chatRoomId,
    select: messagesGroupByDate => {
      // * 시간 복잡도 O(N), N => messages database row의 개수
      /**
       * 
        type ASIS = {
          date: string;
          messages: Tables<'messages'>
        }[] 

        type TOBE = {
          date: string; 
          userMessages: {
            userId: string;
            messages: Tables<'messages'>
          }
        }

        - ASIS에서 TOBE형태로 parsing하는 로직이며 같은 date내 user가 연달아 보낸 메세지들을 구하는 로직.
        - created_at기준으로 오름차순 정렬이 되어 들어와 순서는 이미 정렬되어 있는 상태
      */
      const parsedMessages = [];
      for (const dateMessages of messagesGroupByDate) {
        const tempUserMessages = [];
        let tempUserMessageObj = { userId: '', messages: [] } as {
          userId: string;
          messages: Tables<'messages'>[];
        };
        let currentUserId = null;
        for (const message of dateMessages.messages) {
          if (message.send_by !== currentUserId) {
            if (tempUserMessageObj?.messages?.length > 0) {
              tempUserMessages.push({ ...tempUserMessageObj });
              tempUserMessageObj.userId = '';
              tempUserMessageObj.messages = [];
            }
            currentUserId = message.send_by;
            tempUserMessageObj = { userId: currentUserId, messages: [] };
          }

          tempUserMessageObj.messages.push(message);
        }

        // 마지막 남은 값 처리
        if (tempUserMessageObj?.messages?.length > 0) {
          tempUserMessages.push(tempUserMessageObj);
        }

        parsedMessages.push({
          date: new Date(dateMessages.date),
          userMessages: tempUserMessages,
        });
      }

      return parsedMessages;
    },
  });

  return data;
};

export {
  useUnReadMessageCount,
  useChatRoomListPageData,
  useUpdateLastRead,
  useGetMessagesGroupByDate,
};
