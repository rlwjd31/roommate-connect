import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import { supabase } from '@/libs/supabaseClient';
import { CommentType } from '@/types/houseComment.type';
import CommentReplyList from '@/components/organisms/CommentReplyList';
import CommentRegister from '@/components/molecules/CommentRegister';

function CommentTemplate() {
  const { houseId } = useParams();
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const [countComment, setCountComment] = useState<number>(0);
  const fetchData = async () => {
    const {
      data: comment,
      error,
      count,
    } = await supabase
      .from('house_comment')
      .select('*, house_reply(*,user(nickname,avatar)),user(nickname,avatar)', {
        count: 'exact',
      })
      .eq('house_id', houseId ?? '');

    console.log('comment', comment);
    if (error) {
      console.log(error.message);
    }
    return { comment, count };
  };

  useEffect(() => {
    (async () => {
      const houseComment = await fetchData();
      setComments(houseComment.comment);
      setCountComment(houseComment.count as number);
      console.log('a', houseComment);
    })();
  }, [houseId]);

  if (!comments) return <h1>?</h1>;
  return (
    <Container.FlexCol>
      <Container.FlexCol className="gap-8 py-8">
        <Typography.SubTitle1 className="text-brown">
          댓글 {countComment}개
        </Typography.SubTitle1>
        <CommentRegister />
      </Container.FlexCol>

      {comments &&
        comments.map(comment => (
          <CommentReplyList key={comment.id} comment={comment} />
        ))}
    </Container.FlexCol>
  );
}

export default CommentTemplate;
