import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import TextArea from '@/components/atoms/TextArea';
import Typography from '@/components/atoms/Typography';

type CommentRegisterProps = {
  nickName?: string;
  content?: string;
};

function CommentRegister(props: CommentRegisterProps) {
  const { nickName, content } = props;
  return (
    <Container.FlexCol
      className={`relative items-center gap-8 laptop:items-end  ${nickName ? 'bg-brown4 p-6' : ''}`}
    >
      <TextArea
        type="text"
        name="comment"
        className={`min-h-[11.5625rem] overflow-scroll p-6 placeholder:text-P2 placeholder:text-brown3 ${nickName ? 'pt-[3.875rem]' : ''}`}
        placeholder={nickName ? '답글을 작성해주세요.' : '댓글을 남겨보세요.'}
        rows={5}
        defaultValue={content ?? ''}
      />
      {nickName && (
        <Typography.SubTitle2 className="absolute left-12 top-12 text-brown">
          {nickName}
        </Typography.SubTitle2>
      )}
      <Button.Fill className="w-full justify-center rounded-lg py-4 text-white laptop:w-auto laptop:px-10 laptop:py-[1.125rem]">
        <Typography.SubTitle3>등록</Typography.SubTitle3>
      </Button.Fill>
    </Container.FlexCol>
  );
}

CommentRegister.defaultProps = {
  nickName: '',
  content: '',
};

export default CommentRegister;
