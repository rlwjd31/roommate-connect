import { FormProvider, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import TextField from '@/components/molecules/TextField';

export default function SignUpIntroTemplate1({
  step,
}: {
  step: Dispatch<SetStateAction<number>>;
}) {
  const Form = FormProvider;
  const form = useForm();
  const onSubmit = data => {
    console.log(data);
    step(1);
  };

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
            <TextField
              text="이메일"
              type="email"
              name="email"
              options={{ required: {value : true, message: '써라.'} }}
              placeholder="이메일 입력"
              inputStyle="bg-transparent mt-[1rem]"
            />
            <TextField
              text="비밀번호"
              type="password"
              name="password"
              options={{ required: true }}
              placeholder="비밀번호 입력"
              inputStyle="bg-transparent mt-[1rem]"
            />
            <TextField
              text="비밀번호 재입력"
              type="password"
              name="verifyPassword"
              options={{ required: true }}
              placeholder="비밀번호 재입력"
              inputStyle="bg-transparent mt-[1rem]"
            />
          </Container.FlexCol>
          <Button.Fill type="submit" className=" w-full rounded-[10px]">
            <Typography.P3 className="mx-auto my-[1rem] text-[#F4E7DB]">
              다음
            </Typography.P3>
          </Button.Fill>
        </form>
      </Form>
    </Container.FlexCol>
  );
}
