import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import FormItem from '@/components/molecules/FormItem';
import { SignUpInfo, SignUpInfoType } from '@/types/auth.type';
import { useUpdateUserInfo } from '@/hooks/useSign';

export default function SignUpInfoTemplate() {
  const Form = FormProvider;
  const form = useForm<SignUpInfoType>({
    resolver: zodResolver(SignUpInfo),
  });
  const { updateUserInfo, isPending } = useUpdateUserInfo();
  const onSubmit = (data: SignUpInfoType) => {
    const { gender, ...others } = data;
    updateUserInfo({ ...others, gender: gender === 1 || gender === 3 ? 1 : 2 });
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
              inputStyle="mt-[1rem] w-full"
            />
            <Container.FlexRow className="items-center gap-[1rem]">
              <FormItem.TextField
                labelName="주민등록번호"
                type="text"
                name="birth"
                placeholder="990101"
                inputStyle="mt-[1rem]"
                disabled={isPending}
              />
              <p className="pt-3">-</p>
              <FormItem.TextField
                type="text"
                name="gender"
                inputStyle="mt-[2rem] "
                containerStyle="w-[2.5rem]"
                disabled={isPending}
              />
              <p className="pt-3">* * * * * *</p>
            </Container.FlexRow>
          </Container.FlexCol>
          <Button.Fill
            type="submit"
            className=" mt-[3.25rem] w-full rounded-[10px]"
            disabled={isPending}
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
