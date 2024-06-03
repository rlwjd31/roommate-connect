import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useRecoilState, useRecoilValue} from 'recoil';

import { SignUpEmailUserAtom, ShowVerificationAtom } from '@/stores/sign.store';
import { EmailAuthType } from '@/types/auth.type';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import FormItem from '@/components/molecules/FormItem';
import { useSignUpEmail, useVerifyEmail } from '@/hooks/useSign';

export default function SignUpIntroTemplate2() {
  const Form = FormProvider;
  // TODO: resolver를 나중에 만들어서 useForm에 추가
  const form = useForm<EmailAuthType>();
  const showVerification = useRecoilValue(ShowVerificationAtom);
  const [signUpEmailUser, setSignUpEmailUser] =
    useRecoilState(SignUpEmailUserAtom);

  const { signUpEmail, isSignUpEmail } = useSignUpEmail();
  const { verifyEmail, isVerifyEmail } = useVerifyEmail({
    mutateMessage: '인증 중입니다.',
    successMessage: '🎉인증성공! 회원가입 되셨습니다!',
  });

  const isPending = isSignUpEmail || isVerifyEmail;

  const onSubmitSignUp = async (formData: EmailAuthType) => {
    console.log(formData);
    if (signUpEmailUser.birth !== 0 && signUpEmailUser.gender !== 0) {
      setSignUpEmailUser(prev => ({
        ...prev,
        email: formData.email,
        password: formData.password,
      }))
	signUpEmail();
    }
  };

  const onSubmitVerify = async (formData: EmailAuthType) => {
    verifyEmail(formData);
  };

  const onSubmit: SubmitHandler<EmailAuthType> = !showVerification
    ? onSubmitSignUp
    : onSubmitVerify;

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
            <FormItem.TextField
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
            <FormItem.TextField
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
            <FormItem.TextField
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
              <FormItem.TextField
                labelName="인증번호"
                type="text"
                name="token"
                options={{ required: '인증번호를 입력해주세요.' }}
                placeholder="인증번호 입력"
                containerStyle="mt-[1.625rem]"
              />
              <Button.Fill
                type="submit"
                className="mt-[3.25rem] w-full rounded-[10px]"
                disabled={isPending}
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
              disabled={isPending}
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
