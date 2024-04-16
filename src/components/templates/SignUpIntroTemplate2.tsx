import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import TextField from '@/components/molecules/TextField';

export default function SignUpIntroTemplate2() {
  const Form = FormProvider;
  // TODO: resolver를 나중에 만들어서 useForm에 추가
  const form = useForm();
  const navigate = useNavigate();

  const [showVerification, setShowVerification] = useState(false);

  const onRequest = () => {
    setShowVerification(true);
  };

  const onSubmit = data => {
    console.log(data);
    navigate('/signup-intro');
  };

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
            <Container.FlexRow className="w-full items-center">
              {/* TODO: Textfield flex does not adjust width -> modification required. */}
              {/* TODO: Input - Button should be same line */}
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
                inputStyle="w-[380px] flex-initial mr-[0.5rem]"
              />
              <Button.Outline
                className="h-14 grow-0 rounded-lg px-[20px] text-brown"
                onClick={onRequest}
              >
                인증요청
              </Button.Outline>
            </Container.FlexRow>
            {showVerification && (
              <TextField
                labelName="인증번호"
                type="text"
                name="verificationNumber"
                options={{ required: '인증번호를 입력해주세요.' }}
                placeholder="인증번호 입력"
              />
            )}
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
                  matchesPreviousPassword: value => {
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
          <Button.Fill
            type="submit"
            className="mt-[3.25rem] w-full rounded-[10px]"
          >
            <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
              완료
            </Typography.P3>
          </Button.Fill>
        </form>
      </Form>
    </Container.FlexCol>
  );
}
