import { KeyboardEvent, useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useRecoilState } from 'recoil';

import { MoleculeSelectorState } from '@/components/organisms/districtSelector/selector.store';
import { HouseFormType } from '@/types/house.type';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import DistrictSelector from '@/components/organisms/districtSelector/DistrictSelector';
import BadgeButtons from '@/components/molecules/BadgeButtons';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';
import FormItem from '@/components/molecules/FormItem';
import MultiImageForm from '@/components/molecules/MultiImageForm';
import {
  houseTypeDisplayData,
  rentalTypeDisplayData,
} from '@/constants/signUpProfileData';
import { useHouseRegist } from '@/hooks/useHouse';
import Input from '@/components/atoms/Input';
import TextAreaField from '@/components/molecules/TextAreaField';
import { floorDisplayData } from '@/constants/houseData';

type Template1HiddenState = {
  house_type: HouseFormType['house_type'];
  rental_type: HouseFormType['rental_type'];
  house_appeal: HouseFormType['house_appeal'];
  floor: HouseFormType['floor'];
};

export type HouseRegisterTemplateProp = {
  form: UseFormReturn<HouseFormType>;
};

export default function HouseRegisterTemplate1({
  form,
}: HouseRegisterTemplateProp) {
  const [template1HiddenState, setTemplate1HiddenState] =
    useState<Template1HiddenState>({
      house_type: 0,
      rental_type: 1,
      house_appeal: [],
      floor: 0,
    });
  const [images, setImages] = useState<string[]>([]);
  const [representativeImg, setRepresentativeImg] = useState('');

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

  const onClickHouseType = (stateValue: HouseFormType['house_type']) => {
    form.setValue('house_type', stateValue);
    setTemplate1HiddenState(prev => ({
      ...prev,
      house_type: stateValue,
    }));
  };

  const onClickRentalType = (stateValue: HouseFormType['rental_type']) => {
    form.setValue('rental_type', stateValue);
    setTemplate1HiddenState(prev => ({
      ...prev,
      rental_type: stateValue,
    }));
  };

  const onClickFloorType = (stateValue: HouseFormType['floor']) => {
    form.setValue('floor', stateValue);
    setTemplate1HiddenState(prev => ({
      ...prev,
      floor: stateValue,
    }));
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

  const { registHouse, isRegistHouse } = useHouseRegist();
  const onSaveHouse = async (formData: HouseFormType, temporary: 0 | 1) => {
    const representativeImgName = representativeImg.split('/').slice(-1)[0];
    const houseImgExcludeRep = images.filter(
      imgName => imgName !== representativeImgName,
    );

    registHouse({
      ...formData,
      temporary,
      region: region.value,
      district: district.value,
      house_size: Number(formData.house_size),
      deposit_price: Number(formData.deposit_price),
      monthly_price: Number(formData.monthly_price),
      manage_price: Number(formData.manage_price),
      house_img: houseImgExcludeRep,
      representative_img: representativeImgName,
      room_num: Number(formData.room_num),
      term,
    });
  };

  const onSubmitHouse = (formData: HouseFormType) => {
    onSaveHouse(formData, 1);
  };

  const onSaveTemporary = () => {
    const formData = form.getValues();
    onSaveHouse(formData, 0);
  };

  useEffect(() => {
    setRegion({ value: '지역', isOpen: false });
    setDistrict({ value: '시, 구', isOpen: false });
    setTerm([0, 25]);
  }, []);

  return (
    <Container.FlexCol className="mt-8 min-w-full flex-1">
      <Container.FlexCol className="min-w-[13rem] max-w-[75rem]">
        <Typography.Head3 className="mb-10 text-brown">
          나의 하우스
        </Typography.Head3>
        <Container.FlexCol className="gap-[5.5rem]">
          <MultiImageForm
            images={images}
            setImages={setImages}
            representativeImg={representativeImg}
            setRepresentativeImg={setRepresentativeImg}
          />
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-3 text-brown">
              제목
            </Typography.SubTitle1>
            <FormItem.TextField
              containerStyle="w-full"
              inputStyle="w-full"
              type="text"
              name="post_title"
              placeholder="제목을 작성해주세요"
            />
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              위치
            </Typography.SubTitle1>
            <Container.FlexCol>
              {location && (
                <BadgeButton.Fill
                  className="mb-[2rem] gap-[1rem] rounded-full px-5 pb-2 pt-2.5 text-bg"
                  iconType="close"
                  stroke="bg"
                  id="location"
                  onClick={onDeleteLocationBadge}
                >
                  <Typography.P2>{location}</Typography.P2>
                </BadgeButton.Fill>
              )}
              <DistrictSelector />
              {form.formState.errors.region?.message && (
                <Typography.Span2
                  className={`${location !== '' && 'invisible h-3'} mt-[8px] block text-point`}
                >
                  위치를 선택해주세요.
                </Typography.Span2>
              )}
            </Container.FlexCol>
            <FormItem.Hidden<Pick<HouseFormType, 'region'>>
              name="region"
              valueProp={region.value}
            />
            <FormItem.Hidden<Pick<HouseFormType, 'district'>>
              name="district"
              valueProp={district.value}
            />
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              집유형
            </Typography.SubTitle1>
            <Container.FlexCol>
              <Container.FlexRow className="mb-4 gap-2">
                {houseTypeDisplayData.map(house => (
                  <BadgeButton.Outline
                    key={house.displayValue}
                    className="rounded-full px-5 pb-2 pt-2.5"
                    onClick={() => onClickHouseType(house.stateValue)}
                    badgeActive={house.stateValue === form.watch('house_type')}
                  >
                    <Typography.P2>{house.displayValue}</Typography.P2>
                  </BadgeButton.Outline>
                ))}
                <FormItem.Hidden<Pick<HouseFormType, 'house_type'>>
                  name="house_type"
                  valueProp={template1HiddenState.house_type}
                />
              </Container.FlexRow>
              <Container.FlexRow className="gap-2">
                {rentalTypeDisplayData.map(({ displayValue, stateValue }) => (
                  <BadgeButton.Outline
                    key={displayValue}
                    className="rounded-full px-5 pb-2 pt-2.5"
                    onClick={() => onClickRentalType(stateValue)}
                    badgeActive={stateValue === form.watch('rental_type')}
                  >
                    <Typography.P2>{displayValue}</Typography.P2>
                  </BadgeButton.Outline>
                ))}
                <FormItem.Hidden<Pick<HouseFormType, 'rental_type'>>
                  name="rental_type"
                  valueProp={template1HiddenState.rental_type}
                />
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              크기/방 개수
            </Typography.SubTitle1>
            <Container.FlexCol>
              <Container.FlexRow className="items-center gap-[24px] text-brown">
                <Input
                  type="text"
                  className="w-[4.5rem] p-2"
                  placeholder="12"
                  {...form.register('house_size', { valueAsNumber: true })}
                />
                <div className="flex gap-[18px]">
                  <Typography.P2>평</Typography.P2>
                  <Typography.P2>/</Typography.P2>
                  <Typography.P2>방</Typography.P2>
                </div>
                <Input
                  type="text"
                  className="w-[4.5rem] p-2"
                  placeholder="1"
                  {...form.register('room_num', { valueAsNumber: true })}
                />
                <span>개</span>
              </Container.FlexRow>
              {form.formState.errors.house_size ? (
                <Typography.Span2
                  className={`${!form.formState.errors.house_size?.message && 'invisible h-3'} mt-[8px] block text-point`}
                >
                  {form.formState.errors.house_size?.message as string}
                </Typography.Span2>
              ) : (
                <Typography.Span2
                  className={`${!form.formState.errors.room_num?.message && 'invisible h-3'} mt-[8px] block text-point`}
                >
                  {form.formState.errors.room_num?.message as string}
                </Typography.Span2>
              )}
            </Container.FlexCol>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              건물층 옵션
            </Typography.SubTitle1>
            <Container.FlexRow className="gap-2">
              {floorDisplayData.map(({ displayValue, stateValue }) => (
                <BadgeButton.Outline
                  key={displayValue}
                  className="rounded-full px-5 pb-2 pt-2.5"
                  onClick={() => onClickFloorType(stateValue)}
                  badgeActive={stateValue === form.watch('floor')}
                >
                  <Typography.P2>{displayValue}</Typography.P2>
                </BadgeButton.Outline>
              ))}
            </Container.FlexRow>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              가격
            </Typography.SubTitle1>
            <Container.FlexCol className="gap-[2rem]">
              <Container.Grid className="items-center sm:grid-cols-[4.875rem_auto]">
                <Typography.SubTitle2 className="text-brown">
                  보증금
                </Typography.SubTitle2>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <Input
                    type="text"
                    className="w-[6rem]"
                    {...form.register('deposit_price', { valueAsNumber: true })}
                    placeholder="500"
                  />
                  <Typography.P2 className="whitespace-nowrap text-brown">
                    만원
                  </Typography.P2>
                  <Typography.Span2
                    className={`${!form.formState.errors.deposit_price?.message && 'invisible h-3'} mt-[8px] block text-point`}
                  >
                    {form.formState.errors.deposit_price?.message as string}
                  </Typography.Span2>
                </Container.FlexRow>
              </Container.Grid>
              <Container.Grid className="items-center sm:grid-cols-[4.875rem_auto]">
                <Typography.SubTitle2 className="text-brown">
                  월세
                </Typography.SubTitle2>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <Input
                    type="text"
                    className="w-[6rem]"
                    {...form.register('monthly_price', { valueAsNumber: true })}
                    placeholder="500"
                  />
                  <Typography.P2 className="whitespace-nowrap text-brown">
                    만원
                  </Typography.P2>
                  <Typography.Span2
                    className={`${!form.formState.errors.monthly_price?.message && 'invisible h-3'} mt-[8px] block text-point`}
                  >
                    {form.formState.errors.monthly_price?.message as string}
                  </Typography.Span2>
                </Container.FlexRow>
              </Container.Grid>
              <Container.Grid className="items-center sm:grid-cols-[4.875rem_auto]">
                <Typography.SubTitle2 className="text-brown">
                  관리비
                </Typography.SubTitle2>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <Input
                    type="text"
                    className="w-[6rem]"
                    {...form.register('manage_price', { valueAsNumber: true })}
                    placeholder="500"
                  />
                  <Typography.P2 className="whitespace-nowrap text-brown">
                    만원
                  </Typography.P2>
                  <Typography.Span2
                    className={`${!form.formState.errors.manage_price?.message && 'invisible h-3'} mt-[8px] block text-point`}
                  >
                    {form.formState.errors.manage_price?.message as string}
                  </Typography.Span2>
                </Container.FlexRow>
              </Container.Grid>
            </Container.FlexCol>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              특징
            </Typography.SubTitle1>
            <Container.FlexCol>
              <input
                type="text"
                value={appeal}
                onChange={onChangeAppeal}
                onKeyDown={pressEnterCreateBadge}
                className="mb-[1rem] h-14 max-w-[30.4375rem] rounded-lg border-[1px] border-solid border-brown bg-transparent p-[1rem] placeholder:text-brown3 focus:outline-none focus:ring-1 focus:ring-brown2"
                placeholder="EX) 역 도보 5분, 정류장 3분, 햇빛 잘 들어요"
              />
              {form.watch('house_appeal').length === 0 ? (
                <span className="h-[40px]">&nbsp;</span>
              ) : (
                <BadgeButtons
                  contents={form.watch('house_appeal')}
                  className="gap-2"
                  badgeStyle="rounded-full px-5 pb-2 pt-2.5"
                  iconStyle="ml-2"
                  stroke="bg"
                  iconType="close"
                  typoStyle="text-bg"
                  onClick={onDeleteAppealBadge}
                />
              )}
              <FormItem.Hidden<Pick<HouseFormType, 'house_appeal'>>
                name="house_appeal"
                valueProp={template1HiddenState.house_appeal}
              />
            </Container.FlexCol>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              원하는 기간
            </Typography.SubTitle1>
            <Container.FlexCol>
              <LabelDualInputRange
                className=" w-[30rem]"
                min={0}
                max={24}
                step={1}
                setRangeValue={setTerm}
                rangeValue={term}
                category="term"
              />
              <FormItem.Hidden<Pick<HouseFormType, 'term'>>
                name="term"
                valueProp={term}
              />
            </Container.FlexCol>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-2 text-brown">
              상세설명
            </Typography.SubTitle1>
            <TextAreaField
              name="describe"
              placeholder="집에 대한 설명이나 내가 원하는 조건에 대해 더 소개할 것이 있다면 작성해주세요 (200자 이내)"
              className=" resize-none rounded-[8px] border border-solid border-brown bg-inherit p-5 placeholder:text-brown3"
              maxLength={200}
              rows={8}
              cols={100}
            />
          </Container.Grid>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
