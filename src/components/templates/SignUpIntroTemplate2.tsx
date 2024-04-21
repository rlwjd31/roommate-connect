import { useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import TextField from '@/components/molecules/TextField';
import supabase from '@/libs/supabaseClient';

type PrevData = {
  name: string;
  identificationNumber: string;
};

type VerifyFormData = {
  email: string;
  password: string;
  otp: string;
};

type SignUpIntroTemplate2Props = {
  prevData: PrevData;
};

export default function SignUpIntroTemplate2({
  prevData,
}: SignUpIntroTemplate2Props) {
  const Form = FormProvider;
  // TODO: resolver를 나중에 만들어서 useForm에 추가
  const form = useForm<VerifyFormData>();
  const navigate = useNavigate();

  const [showVerification, setShowVerification] = useState(false);

  const onSubmitSignUp = async (formData: VerifyFormData) => {
    const userData = { ...formData, ...prevData };
    const birth = userData.identificationNumber.slice(0, 6);
    const gender = userData.identificationNumber.slice(6);

    try {
      const { error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            token: true,
            name: userData.name,
            birth,
            gender: gender === '1' || gender === '3' ? 1 : 2,
            nickName: userData.name,
            status: 0,
          },
        },
      });
      if (error) {
        console.error('🚨SignUp Error', error.message);
        return;
      }
      setShowVerification(true);
    } catch (error) {
      console.error('🚨SignUpSubmit Error', error.message);
    }
  };

  const onSubmitVerify = async (formData: VerifyFormData) => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: formData.otp,
        type: 'email',
      });
      if (error) {
        console.error('🚨OTP인증오류!👉🏻', error.message);
        return;
      }
      console.log('🎉회원가입 성공!');
      navigate('/signup-intro');
    } catch (error) {
      console.error('🚨VerifySubmit Error', error.message);
    }
  };

  const onSubmit: SubmitHandler<VerifyFormData> = !showVerification
    ? onSubmitSignUp
    : onSubmitVerify;

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
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
          {showVerification ? (
            <>
              <TextField
                labelName="인증번호"
                type="text"
                name="otp"
                options={{ required: '인증번호를 입력해주세요.' }}
                placeholder="인증번호 입력"
                containerStyle="mt-[1.625rem]"
              />
              <Button.Fill
                type="submit"
                className="mt-[3.25rem] w-full rounded-[10px]"
              >
                <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
                  인증 요청
                </Typography.P3>
              </Button.Fill>
            </>
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
