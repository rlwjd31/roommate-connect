import { FormProvider, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { zodResolver } from '@hookform/resolvers/zod';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import { SignUpEmailUserAtom } from '@/stores/sign.store';
import FormItem from '@/components/molecules/FormItem';
import { SignUpInfo, SignUpInfoType } from '@/types/auth.type';

export default function SignUpInfoTemplate() {
  const Form = FormProvider;
  const form = useForm<SignUpInfoType>({
    resolver: zodResolver(SignUpInfo),
  });
  const setSignUpEmailUser = useSetRecoilState(SignUpEmailUserAtom);

  const onSubmit = (data: SignUpInfoType) => {
    setSignUpEmailUser(prev => ({
      ...prev,
      name: data.name,
      birth: Number(data.birth),
      gender: data.gender === 1 || data.gender === 3 ? 1 : 2,
    }));
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
              />
              <p className="pt-3">-</p>
              <FormItem.TextField
                type="text"
                name="gender"
                inputStyle="mt-[2rem] "
                containerStyle="w-[2.5rem]"
              />
              <p className="pt-3">* * * * * *</p>
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
