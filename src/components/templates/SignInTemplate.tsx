import { FormProvider, useForm } from 'react-hook-form';
import { MouseEvent } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import TextField from '@/components/molecules/TextField';
import Link from '@/components/atoms/Link';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/molecules/IconButton';
import { useSignInEmail, useSignInSocial } from '@/hooks/useSignIn';
import { EmailAuthType, SocialType } from '@/types/auth.type';

export default function SignInTemplate() {
  const Form = FormProvider;
  const form = useForm<EmailAuthType>();
  const { signInEmail, isSignInEmail } = useSignInEmail();
  const { signInSocial, isSignInSocial } = useSignInSocial();
  const onSubmitEmail = (data: EmailAuthType) => {
    signInEmail(data);
  };

  const onClickSocial = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    signInSocial(id as SocialType);
  };

  return (
    <Container.FlexCol className="gap-[3.75rem]">
      <Container.FlexCol className="w-full">
        <Container.FlexCol className="mb-[4rem] gap-[1.25rem] text-brown">
          <Typography.Head2>House-Connect</Typography.Head2>
          <Typography.SubTitle1>룸메이트 쉽게 찾기</Typography.SubTitle1>
        </Container.FlexCol>
        <Container.FlexCol>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEmail)}>
              <TextField
                text="이메일"
                type="email"
                name="email"
                placeholder="이메일 입력"
                inputStyle="bg-transparent mt-[1rem]"
              />
              <TextField
                text="비밀번호"
                type="password"
                name="password"
                placeholder="비밀번호 입력"
                inputStyle="bg-transparent mt-[1rem]"
                containerStyle="mt-7"
              />
              <div className="mt-4 flex flex-row-reverse gap-2">
                <Link to="/sign/up">회원가입</Link>
                <Divider.Row />
                <Link to="/sign/up">비밀번호 찾기</Link>
              </div>
              <Button.Fill
                type="submit"
                className="mt-[3.25rem] w-full rounded-[10px]"
                disabled={isSignInEmail}
              >
                <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
                  로그인
                </Typography.P3>
              </Button.Fill>
            </form>
          </Form>
        </Container.FlexCol>
      </Container.FlexCol>
      <Container.FlexCol className="gap-[2.25rem]">
        <div className="flex">
          <Divider.Row>SNS 계정으로 로그인</Divider.Row>
        </div>
        <Container.FlexRow className="mx-auto gap-[1rem]">
          <IconButton.Outline
            id="kakao"
            iconType="kakaotalk-logo"
            disabled={isSignInSocial}
            className="rounded-full p-[0.75rem]"
            onClick={onClickSocial}
          />
          <IconButton.Outline
            id="google"
            iconType="google-logo"
            disabled={isSignInSocial}
            className="rounded-full p-[0.75rem]"
            onClick={onClickSocial}
          />
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
