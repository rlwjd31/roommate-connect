import { FormProvider, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import TextField from '@/components/molecules/TextField';

type SignUpFormData1 = {
  name: string;
  identificationNumber: string;
};

export default function SignUpIntroTemplate1({
  step,
  setPrevData,
}: {
  step: Dispatch<SetStateAction<number>>;
  setPrevData: (data) => void;
}) {
  const Form = FormProvider;
  const form = useForm<SignUpFormData1>();

  const onSubmit = (data: SignUpFormData1) => {
    console.log(data);
    setPrevData(data);
    step(1);
  };

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
            <TextField
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
            <TextField
              labelName="주민등록번호"
              type="text"
              name="identificationNumber"
              options={{
                required: '필수 입력 사항입니다.',
                minLength: { value: 7, message: '7자리 모두 입력해주세요.' },
                maxLength: { value: 7, message: '7자리만 입력해주세요.' },
                pattern: {
                  value: /^[0-9]{6}[-\s.]?[1-4]{1}$/,
                  message: '숫자만 입력 가능합니다.',
                },
              }}
              placeholder="7자리 ex) 990101-1******"
              inputStyle="mt-[1rem]"
            />
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
