import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SessionAtom } from '@/stores/auth.store';
import { HouseForm, HouseFormType } from '@/types/house.type';
import { SignUpProfileFormType } from '@/types/signUp.type';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import Carousel from '@/components/organisms/Carousel';
import HouseRegisterTemplate1 from '@/components/templates/HouseRegisterTemplate1';
import HouseRegisterTemplates2 from '@/components/templates/HouseRegisterTemplates2';
import Button from '@/components/atoms/Button';
import { InputRangeState } from '@/components/molecules/DualInputRange';
import {
  useHouseData,
  useHouseRegist,
  useHouseUpdate,
  useProfileData,
  useUserProfileUpdate,
} from '@/hooks/useHouse';

export type UserLifeStyleType = {
  smoking: SignUpProfileFormType['smoking'];
  pet: SignUpProfileFormType['pet'];
  appeals: SignUpProfileFormType['appeals'];
};

export type UserMateStyleType = {
  mate_gender: SignUpProfileFormType['gender'];
  mate_number: SignUpProfileFormType['mates_number'];
  mate_appeals: SignUpProfileFormType['mate_appeals'];
  prefer_mate_age: InputRangeState;
};

export default function HouseRegister() {
  const navigate = useNavigate();
  const Form = FormProvider;
  const userId = useRecoilState(SessionAtom)[0]?.user.id as string;
  const { houseId } = useParams<{ houseId: string }>();
  const [currentStep, setCurrentStep] = useState(0);
  const isEditMode = !!houseId;

  const form = useForm<HouseFormType & UserLifeStyleType & UserMateStyleType>({
    resolver: zodResolver(HouseForm),
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    defaultValues: {
      house_img: [],
      representative_img: '',
      post_title: '',
      region: '',
      district: '',
      house_type: 0,
      rental_type: 1,
      floor: 0,
      house_size: undefined,
      room_num: undefined,
      deposit_price: undefined,
      monthly_price: undefined,
      manage_price: undefined,
      house_appeal: [],
      term: [0, 24],
      describe: undefined,
      bookmark: 0,
      temporary: 0,
      user_id: userId,
      smoking: true,
      pet: 1,
      appeals: [],
      mate_gender: 1,
      mate_number: 1,
      mate_appeals: [],
      prefer_mate_age: [0, 30],
    },
  });

  const [userLifeStyle, setUserLifeStyle] = useState<UserLifeStyleType>({
    smoking: form.getValues('smoking'),
    pet: form.getValues('pet'),
    appeals: form.getValues('appeals'),
  });

  const [userMateStyle, setUserMateStyle] = useState<UserMateStyleType>({
    mate_gender: form.getValues('mate_gender'),
    mate_number: form.getValues('mate_number'),
    mate_appeals: form.getValues('mate_appeals'),
    prefer_mate_age: form.getValues('prefer_mate_age'),
  });

  const handlePrevCarousel = () => {
    setCurrentStep(prev => prev - 1);
  };

  const [locationError, setLocationError] = useState(false);

  const handleNextCarousel = async () => {
    const isValid = await form.trigger();

    if (isValid) {
      setCurrentStep(prev => prev + 1);
      setLocationError(false);
    } else if (
      !isValid &&
      (form.getValues('region') === '지역' ||
        form.getValues('district') === '시, 구')
    ) {
      setLocationError(true);
    }
  };

  const { registHouse, isRegistHouse } = useHouseRegist();
  const { updateUserProfile } = useUserProfileUpdate();
  const { updateHouse, isUpdateHouse } = useHouseUpdate();

  const onUpdateProfile = async () => {
    const formData = form.getValues();
    updateUserProfile({
      dbName: 'user_lifestyle',
      data: {
        smoking: formData.smoking,
        pet: formData.pet,
        appeals: formData.appeals,
      },
      userId,
    });

    updateUserProfile({
      dbName: 'user_mate_style',
      data: {
        mate_gender: formData.mate_gender,
        mate_number: formData.mate_number,
        mate_appeals: formData.mate_appeals,
        prefer_mate_age: formData.prefer_mate_age,
      },
      userId,
    });

    navigate('/');
  };

  const onSaveHouse = async (
    formData: HouseFormType & UserLifeStyleType & UserMateStyleType,
    temporary: 0 | 1,
  ) => {
    const houseImgExcludeRep = form
      .getValues('house_img')
      .filter(imgName => imgName !== form.getValues('representative_img'));

    if (isEditMode && temporary === 1) {
      updateHouse({
        houseData: {
          house_img: houseImgExcludeRep,
          representative_img: formData.representative_img,
          post_title: formData.post_title,
          region: formData.region,
          district: formData.district,
          house_type: formData.house_type,
          rental_type: formData.rental_type,
          floor: formData.floor,
          house_size: Number(formData.house_size),
          room_num: Number(formData.room_num),
          deposit_price: Number(formData.deposit_price),
          monthly_price: Number(formData.monthly_price),
          manage_price: Number(formData.manage_price),
          house_appeal: formData.house_appeal,
          term: formData.term,
          describe: formData.describe,
          bookmark: formData.bookmark,
          temporary,
          user_id: userId,
        },
        houseId: houseId as string,
      });
      onUpdateProfile();
    } else {
      registHouse({
        house_img: houseImgExcludeRep,
        representative_img: formData.representative_img,
        post_title: formData.post_title,
        region: formData.region,
        district: formData.district,
        house_type: formData.house_type,
        rental_type: formData.rental_type,
        floor: formData.floor,
        house_size: Number(formData.house_size),
        room_num: Number(formData.room_num),
        deposit_price: Number(formData.deposit_price),
        monthly_price: Number(formData.monthly_price),
        manage_price: Number(formData.manage_price),
        house_appeal: formData.house_appeal,
        term: formData.term,
        describe: formData.describe,
        bookmark: formData.bookmark,
        temporary,
        user_id: userId,
      });

      onUpdateProfile();
    }
  };

  const onSubmitHouse = (
    formData: HouseFormType & UserLifeStyleType & UserMateStyleType,
  ) => {
    onSaveHouse(formData, 1);
  };

  const onSaveTemporary = () => {
    const formData = form.getValues();
    onSaveHouse(formData, 0);
  };

  const { userLifeStyleQuery, userMateStyleQuery } = useProfileData(
    userId as string,
  );
  const { houseQuery } = useHouseData(isEditMode, houseId as string);

  const { data: userLifeStyleData, isSuccess: fetchedUserLifeStyle } =
    userLifeStyleQuery;
  const { data: userMateStyleData, isSuccess: fetchedUserMateStyle } =
    userMateStyleQuery;
  const { data: housePost, isSuccess: fetchedHousePost } = houseQuery;

  useEffect(() => {
    if (fetchedUserLifeStyle && fetchedUserMateStyle) {
      form.setValue('smoking', userLifeStyleData.smoking);
      form.setValue('pet', userLifeStyleData.pet);
      form.setValue('appeals', userLifeStyleData.appeals);
      form.setValue('mate_gender', userMateStyleData.mate_gender);
      form.setValue('mate_number', userMateStyleData.mate_number);
      form.setValue('mate_appeals', userMateStyleData.mate_appeals);
      form.setValue('prefer_mate_age', userMateStyleData.prefer_mate_age);

      setUserLifeStyle(prev => ({ ...prev, ...userLifeStyleData }));
      setUserMateStyle(prev => ({ ...prev, ...userMateStyleData }));
    }
  }, [
    fetchedUserLifeStyle,
    fetchedUserMateStyle,
    form,
    userLifeStyleData,
    userMateStyleData,
  ]);

  useEffect(() => {
    if (isEditMode && houseId && fetchedHousePost) {
      form.reset(prev => ({
        ...prev,
        ...housePost,
      }));
    }
  }, [isEditMode, fetchedHousePost, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitHouse)}
        className="min-h-screen flex-col"
      >
        <Container.FlexCol className="mt-[4rem] w-full grow">
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
              onClick={handleNextCarousel}
            />
          ) : (
            <IconButton.Ghost
              className="my-6"
              iconType="back"
              onClick={handlePrevCarousel}
            />
          )}
        </Container.FlexCol>
        <Container.FlexCol className="w-full grow overflow-y-auto">
          <Carousel order={currentStep}>
            <HouseRegisterTemplate1
              form={form}
              userId={userId}
              houseId={houseId as string}
              isEditMode={isEditMode}
              locationError={locationError}
              setLocationError={setLocationError}
            />
            <HouseRegisterTemplates2
              form={form}
              userLifeStyle={userLifeStyle}
              setUserLifeStyle={setUserLifeStyle}
              userMateStyle={userMateStyle}
              setUserMateStyle={setUserMateStyle}
            />
          </Carousel>
        </Container.FlexCol>
        <hr style={{ marginTop: '5rem', marginBottom: '2.75rem' }} />
        <Container.FlexRow className="absolute z-20 w-full justify-between">
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
              onClick={onSaveTemporary}
              disabled={isRegistHouse || isUpdateHouse}
            >
              <Typography.P1 className="text-brown">임시저장</Typography.P1>
            </Button.Outline>
            {currentStep === 0 ? (
              <Button.Fill
                className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem]"
                onClick={handleNextCarousel}
                disabled={isRegistHouse || isUpdateHouse}
              >
                <Typography.P1 className="text-bg">다음</Typography.P1>
              </Button.Fill>
            ) : (
              <Container.FlexRow className="gap-4">
                <Button.Outline
                  className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem]"
                  onClick={handlePrevCarousel}
                >
                  <Typography.P1 className="text-brown">이전</Typography.P1>
                </Button.Outline>
                <Button.Fill
                  className="flex h-[3.5rem] w-[9.25rem] justify-center rounded-[2rem]"
                  type="submit"
                  disabled={isRegistHouse || isUpdateHouse}
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
