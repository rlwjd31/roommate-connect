import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import CommentReplyList from '@/components/organisms/CommentReplyList';
import CommentRegister from '@/components/molecules/CommentRegister';
import { houseCommentQuery } from '@/hooks/useCommentReply';
import { CommentType } from '@/types/houseComment.type';

function CommentTemplate() {
  const { houseId } = useParams();
  const { data: comments } = useQuery(houseCommentQuery(houseId));

  return (
    <Container.FlexCol>
      <Container.FlexCol className="gap-8 py-8">
        <Typography.SubTitle1 className="text-brown">
          댓글 {comments?.count}개
        </Typography.SubTitle1>
        <CommentRegister
          topId={houseId as string}
          methodType="insert"
          isReply={false}
        />
      </Container.FlexCol>

      {comments &&
        comments?.data?.map(comment => (
          <CommentReplyList
            key={comment?.id}
            comment={comment as unknown as CommentType}
          />
        ))}
    </Container.FlexCol>
  );
}

export default CommentTemplate;
