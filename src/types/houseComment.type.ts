export type CommentType = {
  content: string;
  created_at: string;
  house_id: string;
  id: string;
  updated_at: string;
  user_id: string;
  house_reply: {
    comment_id: string;
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    user_id: string;
    user: {
      id: string;
      avatar: string;
      nickname: string;
    };
  }[];
  user: {
    id: string;
    avatar: string;
    nickname: string;
  };
};
