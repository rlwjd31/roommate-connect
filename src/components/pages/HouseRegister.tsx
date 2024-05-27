import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Img from '@/components/atoms/Img';
import Input from '@/components/atoms/Input';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import DistrictSelector from '@/components/organisms/districtSelector/DistrictSelector';
import Label from '@/components/atoms/Label';
import BadgeButtons from '@/components/molecules/BadgeButtons';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';

export default function HouseRegister() {
  const [houseAppeals, setHouseAppeals] = useState([]);
  const [term, setTerm] = useState([1, 24]);
  const Form = FormProvider;
  const form = useForm();
  const regi = ['경기 고양시', '서울 강남구'];
  const houseTypeInfo = [
    { displayValue: '원룸/오피스텔', stateValue: 0 },
    {
      displayValue: '빌라/연립',
      stateValue: 1,
    },
    {
      displayValue: '아파트',
      stateValue: 2,
    },
    {
      displayValue: '단독주택',
      stateValue: 3,
    },
  ];

  const rentalTypeInfos = [
    {
      displayValue: '월세',
      stateValue: 1,
    },
    {
      displayValue: '반전세',
      stateValue: 2,
    },
    {
      displayValue: '전세',
      stateValue: 3,
    },
    {
      displayValue: '상관없음',
      stateValue: 0,
    },
  ];

  const matesNumInfo = [
    {
      displayValue: '1명',
      stateValue: 1,
    },
    {
      displayValue: '2명',
      stateValue: 2,
    },
    {
      displayValue: '3명 이상',
      stateValue: 3,
    },
    {
      displayValue: '상관없어요',
      stateValue: 0,
    },
  ];

  const pressEnterCreateBadge = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      setHouseAppeals(prev => [...prev, e.target.value]);
    }
  };

  return (
    <>
      <Form {...form}>
        <Container.FlexCol className="mt-[4rem]">
          <Typography.Head2 className="mb-[5rem] text-brown">
            하우스 등록
          </Typography.Head2>
          <Container.FlexRow className="mb-[6.75rem] gap-[1.5rem]">
            <Img className="size-[282px] rounded-[10px] bg-brown3" />
            <Img className="size-[282px] rounded-[10px] bg-brown3" />
            <Img className="size-[282px] rounded-[10px] bg-brown3" />
            <Img className="size-[282px] rounded-[10px] bg-brown3" />
          </Container.FlexRow>
        </Container.FlexCol>
        <Container.FlexCol className="gap-[5rem]">
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              제목
            </Typography.SubTitle1>
            <Input className="w-[690px]" placeholder="제목을 작성해주세요" />
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              위치
            </Typography.SubTitle1>
            <Container.FlexCol>
              <Container.FlexRow className="mb-[2rem] gap-2">
                {regi.map(location => (
                  <BadgeButton.Fill
                    key={location}
                    className="gap-[1rem] rounded-[30px] px-[20px] py-[10px] text-bg"
                    iconType="close"
                    stroke="bg"
                  >
                    <Typography.P2>{location}</Typography.P2>
                  </BadgeButton.Fill>
                ))}
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
                {houseTypeInfo.map(({ displayValue, stateValue }) => (
                  <BadgeButton.Outline
                    key={displayValue}
                    className="rounded-[30px] px-[20px] py-[10px] text-brown"
                  >
                    <Typography.P2>{displayValue}</Typography.P2>
                  </BadgeButton.Outline>
                ))}
              </Container.FlexRow>
              <Container.FlexRow className="gap-2">
                {rentalTypeInfos.map(({ displayValue, stateValue }) => (
                  <BadgeButton.Outline
                    key={displayValue}
                    className="rounded-[30px] px-[20px] py-[10px] text-brown"
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
              <Input className="w-[78px] p-2" />
              <div className="flex gap-[18px]">
                <Typography.P2>평</Typography.P2>
                <Typography.P2>/</Typography.P2>
                <Typography.P2>방</Typography.P2>
              </div>
              <Input className=" w-[78px] p-2" />
              <span>개</span>
            </Container.FlexRow>
          </Container.FlexRow>
          <Container.FlexRow className="text-brown">
            <Typography.SubTitle1 className="w-[205px] text-brown">
              가격
            </Typography.SubTitle1>
            <Container.FlexCol className="gap-[2.5rem]">
              <Container.FlexCol>
                {/* Label의 기본스타일의 글자색을 빼야함 -> Label 사용처(TextField)에서 LabelStyle 추가하기 */}
                <Label className="mb-[1.5rem] text-brown">보증금</Label>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <Input type="text" placeholder="500" className="w-[180px]" />
                  <Typography.P2 className="whitespace-nowrap">
                    만원
                  </Typography.P2>
                </Container.FlexRow>
              </Container.FlexCol>
              <Container.FlexCol>
                <Label className="mb-[1.5rem] text-brown">월세</Label>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <Input type="text" placeholder="50" className="w-[180px]" />
                  <Typography.P2 className="whitespace-nowrap">
                    만원
                  </Typography.P2>
                </Container.FlexRow>
              </Container.FlexCol>
              <Container.FlexCol>
                <Label className="mb-[1.5rem] text-brown">관리비</Label>
                <Container.FlexRow className="items-center gap-[1.5rem]">
                  <Input type="text" placeholder="30" className="w-[180px]" />
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
              <Input
                type="text"
                placeholder="EX) 역 도보 5분, 정류장 3분, 햇빛 잘 들어요"
                className="mb-[20px] w-[487px] px-[20px]"
                onKeyDown={pressEnterCreateBadge}
              />
              {houseAppeals.length === 0 ? (
                <span className="h-[40px]">&nbsp;</span>
              ) : (
                <BadgeButtons
                  contents={houseAppeals}
                  className="gap-2"
                  badgeClassName="rounded-[30px] px-[20px] py-[10px]"
                  stroke="bg"
                  iconType="close"
                  typoClassName="text-bg"
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
                  className="rounded-[30px] px-[20px] py-[10px] text-brown"
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
              {/* LabelDualInputRange의 label 제거하고 값을 연산해서 최소값을 표현하기 */}
              <LabelDualInputRange
                label="최소"
                className="mt-[36px] w-[480px]"
                min={1}
                max={24}
                step={1}
                category="term"
                rangeValue={term}
                setRangeValue={setTerm}
              />
            </Container.FlexCol>
          </Container.FlexRow>
          <Container.FlexRow>
            <Typography.SubTitle1 className="w-[205px] text-brown">
              상세 설명
            </Typography.SubTitle1>
            <textarea
              required
              className="resize-none rounded-[8px] border border-solid border-brown bg-inherit p-5"
              name="houseDescribe"
              maxLength={200}
              rows={8}
              cols={100}
              placeholder="집에 대한 설명이나 내가 원하는 조건에 대해 더 소개할 것이 있다면 작성해주세요 (200자 이내)"
            />
          </Container.FlexRow>
        </Container.FlexCol>
      </Form>
      <hr style={{ marginTop: '5rem', marginBottom: '2.75rem' }} />
      <Container.FlexRow className="justify-between">
        <div>
          <Button.Outline className="flex h-[59px] w-[9.25rem] justify-center rounded-[2rem]">
            <Typography.P1 className="text-brown">취소</Typography.P1>
          </Button.Outline>
        </div>
        <Container.FlexRow className="mb-[16rem] gap-[15px]">
          <Button.Outline className="flex h-[59px] w-[9.25rem] justify-center rounded-[2rem]">
            <Typography.P1 className="text-brown">임시저장</Typography.P1>
          </Button.Outline>
          <Button.Fill
            className="flex h-[59px] w-[9.5rem] justify-center rounded-[2rem]"
            type="submit"
          >
            <Typography.P1 className="text-bg">완료</Typography.P1>
          </Button.Fill>
        </Container.FlexRow>
      </Container.FlexRow>
    </>
  );
}
