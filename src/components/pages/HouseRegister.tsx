import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { HouseForm, HouseFormType } from '@/types/house.type';
import { SessionAtom } from '@/stores/auth.store';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Carousel from '@/components/organisms/Carousel';
import HouseRegisterTemplate1 from '@/components/templates/HouseRegisterTemplate1';
import HouseRegisterTemplates2 from '@/components/templates/HouseRegisterTemplates2';
import Button from '@/components/atoms/Button';

export default function HouseRegister() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const userId = useRecoilState(SessionAtom)[0]?.user.id;
  const Form = FormProvider;
  const form = useForm<HouseFormType>({
    resolver: zodResolver(HouseForm),
    mode: 'onChange',
    defaultValues: {
      house_img: [],
      representative_img: '',
      post_title: '',
      region: '',
      district: '',
      house_type: 0,
      rental_type: 1,
      house_size: undefined,
      room_num: undefined,
      deposit_price: undefined,
      monthly_price: undefined,
      manage_price: undefined,
      house_appeal: [],
      mates_num: 1,
      term: [0, 24],
      describe: undefined,
      bookmark: 0,
      temporary: 0,
      prefer_age: [20, 60],
      user_id: userId,
    },
  });

  return (
    <Form {...form}>
      <form>
        <Container.FlexCol className="mt-[4rem] w-full">
          <Container.FlexRow className="items-center gap-4">
            <Typography.Head2 className=" text-brown">
              하우스 등록
            </Typography.Head2>
            <Typography.P1 className="text-brown1">
              {currentStep + 1}/2
            </Typography.P1>
          </Container.FlexRow>
          {currentStep === 0 ? (
            <IconButton.Ghost
              className="my-6"
              iconType="front"
              onClick={() => setCurrentStep(prev => prev + 1)}
            />
          ) : (
            <IconButton.Ghost
              className="my-6"
              iconType="back"
              onClick={() => setCurrentStep(prev => prev - 1)}
            />
          )}
        </Container.FlexCol>
        <Container.FlexCol className="w-full">
          <Carousel order={currentStep}>
            <HouseRegisterTemplate1 form={form}/>
            <HouseRegisterTemplates2 form={form}/>
          </Carousel>
        </Container.FlexCol>
        <hr style={{ marginTop: '5rem', marginBottom: '2.75rem' }} />
        <Container.FlexRow className="justify-between">
          <div>
            <Button.Outline
              className="mr-4 flex h-[59px] w-[9.25rem] justify-center rounded-[2rem]"
              onClick={() => navigate('/')}
            >
              <Typography.P1 className="text-brown">취소</Typography.P1>
            </Button.Outline>
          </div>
          <Container.FlexRow className="mb-[16rem] gap-4">
            <Button.Outline
              className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem]"
              // onClick={onSaveTemporary}
              // disabled={isRegistHouse}
            >
              <Typography.P1 className="text-brown">임시저장</Typography.P1>
            </Button.Outline>
            {currentStep === 0 ? (
              <Button.Fill
                className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem]"

                // disabled={isRegistHouse}
              >
                <Typography.P1 className="text-bg">다음</Typography.P1>
              </Button.Fill>
            ) : (
              <Container.FlexRow className="gap-4">
                <Button.Outline className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem]">
                  <Typography.P1 className="text-brown">이전</Typography.P1>
                </Button.Outline>
                <Button.Fill
                  className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem]"
                  type="submit"
                >
                  <Typography.P1 className="text-bg">완료</Typography.P1>
                </Button.Fill>
              </Container.FlexRow>
            )}
          </Container.FlexRow>
        </Container.FlexRow>
      </form>
    </Form>
  );
}
