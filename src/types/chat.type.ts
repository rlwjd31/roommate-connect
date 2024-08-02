import { Tables } from '@/types/supabase';

export type MessageType = Tables<'messages'>;
export type UserMessageType = {
  userId: string;
  messages: Tables<'messages'>[];
  lastCreatedAt: Date;
};
