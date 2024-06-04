import { FormProvider, useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';
import { zodResolver } from '@hookform/resolvers/zod';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { SignUpEmailUserAtom } from '@/stores/sign.store';
import FormItem from '@/components/molecules/FormItem';
import { SignUpFormData1, SignUpFormData1Type } from '@/types/auth.type';

export default function SignUpIntroTemplate1({
  step,
}: {
  step: Dispatch<SetStateAction<number>>;
}) {
  const Form = FormProvider;
  const form = useForm<SignUpFormData1Type>({
    resolver: zodResolver(SignUpFormData1),
  });
  const setSignUpEmailUser = useSetRecoilState(SignUpEmailUserAtom);

  const onSubmit = (data: SignUpFormData1Type) => {
    setSignUpEmailUser(prev => ({
      ...prev,
      name: data.name,
      birth: Number(data.birth),
      gender: data.gender === 1 || data.gender === 3 ? 1 : 2,
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
              placeholder="이름 입력"
              inputStyle="mt-[1rem]"
            />
            <Container.FlexRow className="gap-[1rem]">
              <FormItem.TextField
                labelName="주민등록번호"
                type="text"
                name="birth"
                placeholder="990101"
                inputStyle="mt-[1rem]"
              />
              <p className="mt-[3.5rem]">-</p>
              <FormItem.TextField
                type="text"
                name="gender"
                inputStyle="mt-[2rem] "
                containerStyle="w-[2.5rem]"
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
