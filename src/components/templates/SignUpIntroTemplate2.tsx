import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import TextField from '@/components/molecules/TextField';
import supabase from '@/libs/supabaseClient';

type UserAdditionalType = {
  birth?: number;
  gender?: number;
};
type UserType = UserAdditionalType & {
  avatar: string;
  email: string;
  id: string;
  name: string;
  nickname: string | null;
  status: number;
};

type SignUpIntroTemplate2Props = {
  userData: UserType;
  handleSignUp: (formData: UserFormData) => void;
};

export default function SignUpIntroTemplate2({
  userData,
  handleSignUp,
}: SignUpIntroTemplate2Props) {
  const Form = FormProvider;
  // TODO: resolver를 나중에 만들어서 useForm에 추가
  const form = useForm();
  const navigate = useNavigate();

  const [showVerification, setShowVerification] = useState(false);

  const onSubmit = async formData => {
    if (!showVerification) {
      try {
        await handleSignUp(formData);
        setShowVerification(true);
      } catch (error) {
        console.error('회원가입에 실패했습니다. 👉🏻', error.message);
      }
    } else {
      const { data, error } = await supabase.auth.verifyOtp({
        email: userData.email,
        token: formData.verificationNumber,
        type: 'email',
      });
      if (!error) navigate('/signup-intro');
      else alert('인증번호가 틀렸습니다.');
    }
  };

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
            {/* TODO: UI - Textfield flex does not adjust width -> modification required. */}

            <TextField
              labelName="이메일"
              type="text"
              name="email"
              options={{
                required: '필수 항목 입니다.',
                pattern: {
                  value: /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/,
                  message: '이메일 형식으로 입력해주세요.',
                },
              }}
              placeholder="이메일 입력"
              containerStyle="grow mr-[0.5rem]"
            />
            <TextField
              labelName="비밀번호"
              type="password"
              name="password"
              options={{
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 8,
                  message:
                    '영문, 숫자, 특수기호를 포함하여 8자리 이상 입력해주세요.',
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/,
                  message:
                    '영문, 숫자, 특수기호를 포함하여 8자리 이상 입력해주세요.',
                },
              }}
              placeholder="비밀번호 입력"
            />
            <TextField
              labelName="비밀번호 재입력"
              type="password"
              name="confirmPassword"
              options={{
                required: '비밀번호를 확인해주세요.',
                validate: {
                  confirmPassword: value => {
                    const { password } = form.getValues();
                    return (
                      password === value || '비밀번호가 일치하지 않습니다.'
                    );
                  },
                },
              }}
              placeholder="비밀번호 입력"
            />
          </Container.FlexCol>
          {showVerification && (
            <TextField
              labelName="인증번호"
              type="text"
              name="verificationNumber"
              options={{ required: '인증번호를 입력해주세요.' }}
              placeholder="인증번호 입력"
            />
          )}
          {!showVerification ? (
            <Button.Fill
              type="submit"
              className="mt-[3.25rem] w-full rounded-[10px]"
            >
              <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
                인증 요청
              </Typography.P3>
            </Button.Fill>
          ) : (
            <Button.Fill
              type="submit"
              className="mt-[3.25rem] w-full rounded-[10px]"
            >
              <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
                확인
              </Typography.P3>
            </Button.Fill>
          )}
        </form>
      </Form>
    </Container.FlexCol>
  );
}
