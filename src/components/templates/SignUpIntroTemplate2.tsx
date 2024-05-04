import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import TextField from '@/components/molecules/TextField';

export default function SignUpIntroTemplate2() {
  const Form = FormProvider;
  // TODO: resolver를 나중에 만들어서 useForm에 추가
  const form = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data);
    navigate('/signup-intro');
  };

  return (
    <Container.FlexCol className="min-w-full flex-1 gap-[3.25rem]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Container.FlexCol className="gap-[1.625rem]">
            <TextField
              text="이름"
              type="text"
              name="name"
              options={{ required: true, minLength: 1 }}
              placeholder="이름 입력"
              inputStyle="bg-transparent mt-[1rem]"
            />
            <TextField
              text="주민등록번호"
              type="text"
              name="residentId"
              options={{ required: true, minLength: 6, maxLength: 6 }}
              placeholder="6자리 ex)990101"
              inputStyle="bg-transparent mt-[1rem]"
            />
            <span>휴대폰인증</span>
            <span>인증번호</span>
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
