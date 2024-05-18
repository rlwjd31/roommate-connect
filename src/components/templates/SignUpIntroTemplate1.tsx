import { FormProvider, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { SignUpEmailUserAtom } from '@/stores/sign.store';
import FormItem from '@/components/molecules/FormItem';

type SignUpFormData1 = {
  name: string;
  birth: string;
  gender: string;
};

export default function SignUpIntroTemplate1({
  step,
}: {
  step: Dispatch<SetStateAction<number>>;
}) {
  const Form = FormProvider;
  const form = useForm<SignUpFormData1>();
  const setSignUpEmailUser = useSetRecoilState(SignUpEmailUserAtom);

  const onSubmit = (data: SignUpFormData1) => {
    console.log(data);

    setSignUpEmailUser(prev => ({
      ...prev,
      name: data.name,
      birth: Number(data.birth),
      gender: data.gender === '1' || data.gender === '3' ? 1 : 2,
    }));

    step(1);
  };

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
            <FormItem.TextField
              labelName="이름"
              type="text"
              name="name"
              options={{
                required: '필수 입력 사항입니다.',
                minLength: {
                  value: 2,
                  message: '최소 2글자 이상 입력해주세요.',
                },
              }}
              placeholder="이름 입력"
              inputStyle="mt-[1rem]"
            />
            <Container.FlexRow className="gap-[1rem]">
              <FormItem.TextField
                labelName="주민등록번호"
                type="text"
                name="birth"
                options={{
                  required: '필수 입력 사항입니다.',
                  minLength: {
                    value: 6,
                    message: '주민등록번호 앞 6자리를 입력해주세요.',
                  },
                  maxLength: {
                    value: 6,
                    message: '주민등록번호 앞 6자리를 입력해주세요.',
                  },
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
                placeholder="990101"
                inputStyle="mt-[1rem]"
              />
              <p className="mt-[3.5rem]">-</p>
              <FormItem.TextField
                type="text"
                name="gender"
                options={{
                  required: '필수 입력 사항입니다.',
                  minLength: {
                    value: 1,
                    message:
                      '주민등록번호 뒷자리의 첫번째 숫자를 입력해주세요.',
                  },
                  maxLength: {
                    value: 1,
                    message:
                      '주민등록번호 뒷자리의 첫번째 숫자를 입력해주세요.',
                  },
                  pattern: {
                    value: /^[1-4]{1}$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                }}
                inputStyle="mt-[2rem] w-[2.75rem]"
              />
              <p className="mt-[3.5rem]">* * * * * *</p>
            </Container.FlexRow>
          </Container.FlexCol>
          <Button.Fill
            type="submit"
            className=" mt-[3.25rem] w-full rounded-[10px]"
          >
            <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
              다음
            </Typography.P3>
          </Button.Fill>
        </form>
      </Form>
    </Container.FlexCol>
  );
}
