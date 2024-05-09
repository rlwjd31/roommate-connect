import { FormProvider, useForm } from 'react-hook-form';
import { MouseEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Link from '@/components/atoms/Link';
import Divider from '@/components/atoms/Divider';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/molecules/IconButton';
import {
  useSignInEmail,
  useSignInSocial,
  useVerifyEmail,
} from '@/hooks/useSignIn';
import { EmailAuthType, SocialType, VerifyEmailType } from '@/types/auth.type';
import { IsNotVerifiedAtom } from '@/stores/auth.store';
import FormItem from '@/components/molecules/FormItem';
import { supabase } from '@/libs/supabaseClient';
import { createToast } from '@/libs/toast';
import { FormValidationType } from '@/types/form.type';

export default function SignInTemplate() {
  const Form = FormProvider;
  const form = useForm<EmailAuthType>();
  const [isReSendVerifyEmail, setIsReSendVerifyEmail] = useState(false);
  const isNotVerified = useRecoilValue(IsNotVerifiedAtom);
  const { signInEmail, isSignInEmail } = useSignInEmail();
  const { verifyEmail, isVerifyEmail } = useVerifyEmail();
  const { signInSocial, isSignInSocial } = useSignInSocial();
  const onSubmitEmail = (data: EmailAuthType) => {
    signInEmail(data);
  };

  const isPending = isSignInEmail || isSignInSocial || isVerifyEmail;

  // * 회원가입에서 Email 인증을 거치지 않고 로그인 시 다시 인증번호를 전송하는 기능
  const onReSendVerifyEmail = async () => {
    setIsReSendVerifyEmail(true);
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: form.getValues('email'),
    });
    if (error)
      createToast(
        'verifyEmail',
        '너무 많은 요청을 보냈습니다. 나중에 다시 시도하세요.',
        {
          autoClose: 1000,
          type: 'error',
          isLoading: false,
        },
      );
    else
      createToast(
        'verifyEmail',
        '인증번호를 전송했습니다. 이메일을 확인해주세요',
        { autoClose: 1000, type: 'info', isLoading: false },
      );
    setIsReSendVerifyEmail(false);
  };

  // * 미인증 로그인 시 인증하는 기능
  const onVerifyEmail = (data: VerifyEmailType) => {
    verifyEmail(data);
  };

  const onClickSocial = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    signInSocial(id as SocialType);
  };

  const validationOptions: FormValidationType<EmailAuthType> = {
    email: {
      required: { value: true, message: '이메일을 입력해주세요' },
      pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: '올바른 이메일 형식이 아닙니다',
      },
    },
    password: {
      required: { value: true, message: '비밀번호를 입력해주세요' },
      min: { value: 8, message: '비밀번호는 8자 이상이어야 합니다' },
    },
    token: {
      required: { value: true, message: '인증번호를 입력해주세요' },
      maxLength: { value: 6, message: '인증번호는 6자 입니다' },
      minLength: { value: 6, message: '인증번호는 6자 입니다' },
    },
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
            <form
              onSubmit={form.handleSubmit(
                isNotVerified ? onVerifyEmail : onSubmitEmail,
              )}
            >
              <FormItem.TextField
                text="이메일"
                name="email"
                options={validationOptions.email}
                placeholder="이메일 입력"
                inputStyle="bg-transparent mt-[1rem]"
              />
              <FormItem.TextField
                text="비밀번호"
                type="password"
                name="password"
                options={validationOptions.password}
                placeholder="비밀번호 입력"
                inputStyle="bg-transparent mt-[1rem]"
                containerStyle="mt-7"
              />
              {isNotVerified && (
                <Container.FlexRow className="mt-7 gap-x-2">
                  <FormItem.TextField
                    containerStyle="flex-1"
                    text="인증번호"
                    type="number"
                    options={validationOptions.token}
                    placeholder="000000"
                    inputStyle="bg-transparent mt-[1rem]"
                    name="token"
                  />
                  <Button.Outline
                    className={`${form.formState.errors.token ? 'mb-5' : 'mb-2'} mt-8 rounded-[0.625rem] px-[0.6875rem]`}
                    disabled={isReSendVerifyEmail}
                    onClick={onReSendVerifyEmail}
                  >
                    <Typography.P3 className="text-brown">
                      인증요청
                    </Typography.P3>
                  </Button.Outline>
                </Container.FlexRow>
              )}
              <div className="mt-4 flex flex-row-reverse gap-2">
                <Link to="/sign/up">회원가입</Link>
                <Divider.Row />
                <Link to="/sign/up">비밀번호 찾기</Link>
              </div>
              <Button.Fill
                type="submit"
                className="mt-[3.25rem] w-full rounded-[10px]"
                disabled={isPending}
              >
                <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
                  {isNotVerified ? '인증 후 로그인' : '로그인'}
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
        <Container.FlexCol className="gap-y-5">
          <IconButton.Ghost
            id="kakao"
            iconType="kakaotalk-logo"
            disabled={isPending}
            onClick={onClickSocial}
          />
          <IconButton.Ghost
            id="google"
            iconType="google-logo"
            disabled={isPending}
            onClick={onClickSocial}
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
