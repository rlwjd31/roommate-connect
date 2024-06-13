import { KeyboardEvent, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { supabase } from '@/libs/supabaseClient';
import { HouseType } from '@/types/house.type';
import { MoleculeSelectorState } from '@/components/organisms/districtSelector/selector.store';
import { errorToast, successToast } from '@/libs/toast';
import Container from '@/components/atoms/Container';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import DistrictSelector from '@/components/organisms/districtSelector/DistrictSelector';
import BadgeButtons from '@/components/molecules/BadgeButtons';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';
import Button from '@/components/atoms/Button';
import FormItem from '@/components/molecules/FormItem';
import MultiImageForm from '@/components/molecules/MultiImageForm';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import { useSignInState } from '@/hooks/useSign';
import {
  houseTypeInfos,
  matesNumInfo,
  rentalTypeInfos,
} from '@/constants/selectTypeInfos';

export default function HouseRegisterTemplate() {
  const navigate = useNavigate();
  const Form = FormProvider;
  const userInfo = useSignInState();
  const form = useForm<HouseType>({
    defaultValues: {
      house_img: [],
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
      describe: '',
      bookmark: 0,
      visible: undefined,
      user_id: userInfo?.user.id,
    },
  });
  const [saving, setSaving] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [term, setTerm] = useRecoilState(SignupProfileStateSelector('term'));

  const [region, setRegion] = useRecoilState(MoleculeSelectorState('지역'));
  const [district, setDistrict] = useRecoilState(
    MoleculeSelectorState('시, 구'),
  );
  const location =
    region.value !== '지역' && district.value !== '시, 구'
      ? `${region.value} ${district.value}`
      : '';

  const onDeleteLocationBadge = () => {
    setRegion({ value: '지역', isOpen: false });
    setDistrict({ value: '시, 구', isOpen: false });
  };

  const onClickHouseType = (stateValue: HouseType['house_type']) => {
    form.setValue('house_type', stateValue);
  };
  const onClickRentalType = (stateValue: HouseType['rental_type']) => {
    form.setValue('rental_type', stateValue);
  };
  const onClickMatesNum = (stateValue: HouseType['mates_num']) => {
    form.setValue('mates_num', stateValue);
  };

  const [appeal, setAppeal] = useState('');

  const onChangeAppeal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.currentTarget.value;
    setAppeal(content);
  };

  const createBadge = () => {
    const appeals = form.watch('house_appeal');
    if (!appeals.includes(appeal) && appeal !== '') {
      appeals.push(appeal);
      form.setValue('house_appeal', appeals);
      setAppeal('');
    }
  };

  const pressEnterCreateBadge = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      createBadge();
    }
  };

  const onDeleteAppealBadge = (appealContent: string) => {
    const appeals = form
      .watch('house_appeal')
      .filter(houseAppeal => houseAppeal !== appealContent);
    form.setValue('house_appeal', appeals);
  };

  const onSaveHouse = async (formData: HouseType, visible: number) => {
    setSaving(true);
    try {
      const { error } = await supabase.from('house').insert({
        ...formData,
        visible,
        region: region.value,
        district: district.value,
        house_size: Number(formData.house_size),
        deposit_price: Number(formData.deposit_price),
        monthly_price: Number(formData.monthly_price),
        manage_price: Number(formData.manage_price),
        house_img: images,
        room_num: Number(formData.room_num),
        term,
      });

      if (error) {
        errorToast('createHouse', '💧supabase 저장에 실패했습니다.');
      } else {
        successToast('createHouse', '👍🏻 성공적으로 저장되었습니다.');
        navigate('/');
      }
    } catch (error) {
      errorToast('createHouse', '💧submit에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const onSubmitHouse = (formData: HouseType) => {
    onSaveHouse(formData, 1);
  };

  const onSaveTemporary = () => {
    const formData = form.getValues();
    onSaveHouse(formData, 0);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHouse)}>
        <Container.FlexCol className="gap-[5rem]">
          <Container.FlexRow className="mb-[1.75rem] gap-6">
            <MultiImageForm images={images} setImages={setImages} />
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              제목
            </Typography.SubTitle1>
            <Input
              className="max-w-[690px] flex-1"
              {...form.register('post_title', { required: true })}
              placeholder="제목을 작성해주세요"
            />
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              위치
            </Typography.SubTitle1>
            <Container.FlexCol className="flex-1">
              <Container.FlexRow className="mb-[2rem] gap-2">
                {location && (
                  <BadgeButton.Fill
                    className="gap-[1rem] rounded-[30px] px-[20px] py-[10px] text-bg"
                    iconType="close"
                    stroke="bg"
                    id="location"
                    onClick={onDeleteLocationBadge}
                  >
                    <Typography.P2>{location}</Typography.P2>
                  </BadgeButton.Fill>
                )}
              </Container.FlexRow>
              <DistrictSelector />
            </Container.FlexCol>
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              집유형
            </Typography.SubTitle1>
            <Container.FlexCol>
              <Container.FlexRow className="mb-4 gap-2">
                {houseTypeInfos.map(house => (
                  <BadgeButton.Outline
                    key={house.displayValue}
                    className="rounded-[30px] px-[20px] py-[10px]"
                    onClick={() => onClickHouseType(house.stateValue)}
                    badgeActive={house.stateValue === form.watch('house_type')}
                  >
                    <Typography.P2>{house.displayValue}</Typography.P2>
                  </BadgeButton.Outline>
                ))}
              </Container.FlexRow>
              <Container.FlexRow className="gap-2">
                {rentalTypeInfos.map(({ displayValue, stateValue }) => (
                  <BadgeButton.Outline
                    key={displayValue}
                    className="rounded-[30px] px-[20px] py-[10px]"
                    onClick={() => onClickRentalType(stateValue)}
                    badgeActive={stateValue === form.watch('rental_type')}
                  >
                    <Typography.P2>{displayValue}</Typography.P2>
                  </BadgeButton.Outline>
                ))}
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              크기/방 개수
            </Typography.SubTitle1>
            <Container.FlexRow className="items-center gap-[24px] text-brown">
              <FormItem.TextField
                type="text"
                name="house_size"
                inputStyle="w-[78px] p-2"
                options={{
                  required: '필수 입력 사항입니다.',
                }}
              />
              <div className="flex gap-[18px]">
                <Typography.P2>평</Typography.P2>
                <Typography.P2>/</Typography.P2>
                <Typography.P2>방</Typography.P2>
              </div>
              <FormItem.TextField
                type="text"
                name="room_num"
                inputStyle="w-[78px] p-2"
                options={{
                  required: '필수 입력 사항입니다.',
                }}
              />
              <span>개</span>
            </Container.FlexRow>
          </Container.FlexRow>
          <Container.FlexRow className="text-brown">
            <Typography.SubTitle1 className="w-[205px] text-brown">
              가격
            </Typography.SubTitle1>
            <Container.FlexCol className="gap-[1.5rem]">
              <Container.FlexCol>
                <Typography.SubTitle2 className="mb-[1rem]">
                  보증금
                </Typography.SubTitle2>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <FormItem.TextField
                    type="text"
                    name="deposit_price"
                    inputStyle="w-[11.25rem]"
                    options={{
                      required: '필수 입력 사항입니다.',
                    }}
                    placeholder="500"
                  />
                  <Typography.P2 className="whitespace-nowrap">
                    만원
                  </Typography.P2>
                </Container.FlexRow>
              </Container.FlexCol>
              <Container.FlexCol>
                <Typography.SubTitle2 className="mb-[1em]">
                  월세
                </Typography.SubTitle2>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <FormItem.TextField
                    type="text"
                    name="monthly_price"
                    inputStyle="w-[11.25rem]"
                    options={{
                      required: '필수 입력 사항입니다.',
                    }}
                    placeholder="50"
                  />
                  <Typography.P2 className="whitespace-nowrap">
                    만원
                  </Typography.P2>
                </Container.FlexRow>
              </Container.FlexCol>
              <Container.FlexCol>
                <Typography.SubTitle2 className="mb-[1rem]">
                  관리비
                </Typography.SubTitle2>{' '}
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <FormItem.TextField
                    type="text"
                    name="manage_price"
                    inputStyle="w-[11.25rem]"
                    options={{
                      required: '필수 입력 사항입니다.',
                    }}
                    placeholder="30"
                  />
                  <Typography.P2 className="whitespace-nowrap">
                    만원
                  </Typography.P2>
                </Container.FlexRow>
              </Container.FlexCol>
            </Container.FlexCol>
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              특징
            </Typography.SubTitle1>
            <Container.FlexCol>
              <input
                type="text"
                value={appeal}
                onChange={onChangeAppeal}
                onKeyDown={pressEnterCreateBadge}
                className="mb-[20px] h-14 w-[487px] rounded-lg border-[1px] border-solid border-brown bg-transparent p-[16px] focus:outline-none focus:ring-1 focus:ring-brown2"
                placeholder="EX) 역 도보 5분, 정류장 3분, 햇빛 잘 들어요"
              />
              {form.watch('house_appeal').length === 0 ? (
                <span className="h-[40px]">&nbsp;</span>
              ) : (
                <BadgeButtons
                  contents={form.watch('house_appeal')}
                  className="gap-2"
                  badgeClassName="rounded-[30px] px-[20px] py-[10px]"
                  iconClassName="ml-2"
                  stroke="bg"
                  iconType="close"
                  typoClassName="text-bg"
                  onClick={onDeleteAppealBadge}
                />
              )}
            </Container.FlexCol>
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              원하는 인원 수
            </Typography.SubTitle1>
            <Container.FlexRow className="gap-2">
              {matesNumInfo.map(({ displayValue, stateValue }) => (
                <BadgeButton.Outline
                  key={displayValue}
                  badgeActive={stateValue === form.watch('mates_num')}
                  onClick={() => onClickMatesNum(stateValue)}
                  className="rounded-[30px] px-[20px] py-[10px]"
                >
                  <Typography.P2>{displayValue}</Typography.P2>
                </BadgeButton.Outline>
              ))}
            </Container.FlexRow>
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              원하는 기간
            </Typography.SubTitle1>
            <Container.FlexCol>
              <LabelDualInputRange
                label="기간"
                className=" w-[480px]"
                min={0}
                max={24}
                step={1}
                setRangeValue={setTerm}
                rangeValue={term}
                category="term"
              />
            </Container.FlexCol>
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              상세 설명
            </Typography.SubTitle1>
            <textarea
              className="resize-none rounded-[8px] border border-solid border-brown bg-inherit p-5 placeholder:text-brown3"
              {...form.register('describe')}
              maxLength={200}
              rows={8}
              cols={100}
              placeholder="집에 대한 설명이나 내가 원하는 조건에 대해 더 소개할 것이 있다면 작성해주세요 (200자 이내)"
            />
          </Container.FlexRow>
        </Container.FlexCol>
        <hr style={{ marginTop: '5rem', marginBottom: '2.75rem' }} />
        <Container.FlexRow className="justify-between">
          <div>
            <Button.Outline
              className="flex h-[59px] w-[9.25rem] justify-center rounded-[2rem]"
              onClick={() => navigate('/')}
            >
              <Typography.P1 className="text-brown">취소</Typography.P1>
            </Button.Outline>
          </div>
          <Container.FlexRow className="mb-[16rem] gap-[15px]">
            <Button.Outline
              className="flex h-[59px] w-[9.25rem] justify-center rounded-[2rem]"
              onClick={onSaveTemporary}
              disabled={saving}
            >
              <Typography.P1 className="text-brown">임시저장</Typography.P1>
            </Button.Outline>
            <Button.Fill
              className="flex h-[59px] w-[9.5rem] justify-center rounded-[2rem]"
              type="submit"
              disabled={saving}
            >
              <Typography.P1 className="text-bg">완료</Typography.P1>
            </Button.Fill>
          </Container.FlexRow>
        </Container.FlexRow>
      </form>
    </Form>
  );
}
