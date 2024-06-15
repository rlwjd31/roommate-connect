import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Divider from '@/components/atoms/Divider';
import Icon from '@/components/atoms/Icon';
import Img from '@/components/atoms/Img';
import TextArea from '@/components/atoms/TextArea';
import Typography from '@/components/atoms/Typography';
import IconButton from '@/components/molecules/IconButton';
import { supabase } from '@/libs/supabaseClient';

interface HouseData {
  id: string;
  post_title: string;
  created_at: string;
  updated_at: string;
  house_img: string[];
  deposit_price: number;
  monthly_price: number;
  manage_price: number;
  district: string;
  house_type: number;
  house_size: number;
  room_num: number;
  house_appeal: string[];
  mates_num: number;
  term: number[];
  user_id: string;
  user: User;
  user_lifestyle: LifeStyle;
  describe: string;
  visible: number;
  region: string;
  rental_type: number;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  gender: number;
}

interface LifeStyle {
  smoking: boolean;
  pet: number;
  appeals: string[];
}

export default function HouseDetailTemplate() {
  const { houseId } = useParams();
  const [houseData, setHouseData] = useState<HouseData | null>(null);

  const fetchData = async () => {
    const { data: house, error } = await supabase
      .from('house')
      .select(
        `*, user(id, name, avatar, gender), user_lifestyle(smoking, pet, appeals)`,
      )
      .eq('id', houseId)
      .single();
    // const { data: house, error } = await supabase
    //   .from('house')
    //   .select(`*`)
    //   .eq('id', houseId)
    //   .single();
    if (error) {
      console.log(error.message);
    }
    return house;
  };

  // const fetchUserData = async (userId: string) => {
  //   const { data: user, error } = await supabase
  //     .from('user')
  //     .select(`*`)
  //     .eq('id', userId)
  //     .single();
  //   if (error) {
  //     console.log(error.message);
  //   }
  //   return user;
  // };

  useEffect(() => {
    (async () => {
      const houseData = await fetchData();
      console.log('houseData =>', houseData);
      const { user, user_lifestyle } = houseData;
      console.log('user_id =>', user);
      console.log('user_lifestyle =>', user_lifestyle);
      // const userData = await fetchUserData(user_id);
      // console.log('user data =>', userData);

      setHouseData(houseData);
      // setUserData(userData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!houseData) {
    return <h1 className="text-4xl">Loading...</h1>;
  }

  const formDate = (dateString: string) => {
    const date = new Date(dateString);
    // console.log(date);
    return date.toLocaleDateString();
  };
  const rentalTypeText = (rentalType: number) => {
    switch (rentalType) {
      case 0:
        return '월세';
      case 1:
        return '전세';
      case 2:
        return '반전세';
      default:
        return '알 수 없음';
    }
  };
  const createAt = houseData.created_at;
  const updatedAt = houseData.updated_at;

  const termArray = houseData.term.map(value => {
    const years = Math.floor(value / 12);
    const months = value % 12;
    if (years === 0) {
      return `최소 ${months}개월에서 `;
    }
    if (months === 0) {
      return `${years}년 이상`;
    }
    return `${years}년 ${months}개월 이상`;
  });
  // userData
  const genderType = (gender: number) => {
    if (gender === 1) {
      return '남성';
    }
    return '여성';
  };
  const smokingType = (smoking: boolean) =>
    // if (smoking) {
    //   return '흡연자';
    // }
    // return '비흡연자';
    smoking ? '흡연자' : '비흡연자';
  const petType = (pet: number) => {
    switch (pet) {
      case 1:
        return '반려동물 키워요';
      case 2:
        return '반려동물 No';
      default:
        return '반려동물 상관없어요';
    }
  };

  return (
    <Container.FlexCol className="gap-8 ">
      <Container.Grid className="max-h-[590px] grid-cols-4 grid-rows-2 gap-5">
        {houseData &&
          houseData.house_img
            .slice(0, 5)
            .map((src, index) => (
              <Img
                key={src}
                src={src}
                alt={`house image ${index + 1}`}
                className={index === 0 ? 'col-span-2 row-span-2' : ''}
              />
            ))}
      </Container.Grid>
      <Container.FlexCol>
        <Container.FlexCol className="gap-14 border-b	border-brown pb-8">
          <Container.FlexCol className="gap-4">
            <Typography.Head2 className="text-brown">
              {houseData && houseData.post_title}
            </Typography.Head2>
            <Container.FlexRow className="gap-3">
              <Typography.Span1 className="text-brown1">
                최근 등록일 {formDate(createAt)}
              </Typography.Span1>
              <Divider.Row />
              <Typography.Span1 className="text-brown1">
                최근 수정일 {formDate(updatedAt)}
              </Typography.Span1>
            </Container.FlexRow>
          </Container.FlexCol>
          <Container.FlexRow className="justify-between	">
            <Container.FlexRow className="gap-5">
              <Button.Fill className="rounded-lg px-7 py-5 text-white">
                <Typography.P1>룸메이트 신청</Typography.P1>
              </Button.Fill>
              <Button.Outline className="rounded-lg bg-white px-7 py-5 text-brown ">
                <Typography.P1>메시지 보내기</Typography.P1>
              </Button.Outline>
            </Container.FlexRow>
            <Container.FlexRow className="gap-10">
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost iconType="heart" />
                <Typography.Span1 className="text-brown1">43</Typography.Span1>
              </Container.FlexCol>
              <Container.FlexCol className="items-center justify-center gap-3">
                <IconButton.Ghost iconType="share" />
                <Typography.Span1 className="text-brown1">
                  공유
                </Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
          </Container.FlexRow>
        </Container.FlexCol>
        <Container.FlexRow className="mt-14 justify-between gap-7">
          <Container.FlexCol className="gap-11 text-brown">
            <Container.FlexRow className="items-center gap-4 ">
              {/* <Icon className="[&>svg]:size-16 " type="avatar" /> */}
              <Img
                className="size-16 min-h-0 rounded-full"
                src={houseData.user.avatar}
              />
              <Typography.Head3>{houseData.user.name}</Typography.Head3>
            </Container.FlexRow>
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>자기소개</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                <Badge.Outline className="rounded-3xl px-5 py-1">
                  <Icon type="mini-male" className="pr-2" />
                  {genderType(houseData.user.gender)}
                </Badge.Outline>
                <Badge.Outline className="rounded-3xl px-5 py-1">
                  <Icon type="mini-smoke" className="pr-2" />
                  {smokingType(houseData.user_lifestyle.smoking)}
                </Badge.Outline>
                <Badge.Outline className="rounded-3xl px-5 py-1">
                  <Icon type="mini-none-pet-lover" className="pr-2" />
                  {petType(houseData.user_lifestyle.pet)}
                </Badge.Outline>
              </Container.FlexRow>
            </Container.FlexCol>
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>라이프 스타일</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                {houseData.user_lifestyle.appeals.map(value => (
                  <Badge.Outline key={value} className="rounded-3xl px-5 py-1">
                    {value}
                  </Badge.Outline>
                ))}
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexCol>
          <Container.FlexCol className="gap-12 rounded-lg bg-brown6 p-8 text-brown">
            <Container.FlexCol className="gap-5 ">
              <Container.FlexRow className="gap-4">
                <Typography.Head3>
                  {rentalTypeText(houseData.rental_type)}
                  {houseData.deposit_price}/{houseData.monthly_price}
                </Typography.Head3>
                <Divider.Col />
                <Typography.P1 className="leading-6">
                  관리비 {houseData.manage_price}만원
                </Typography.P1>
              </Container.FlexRow>
              <Typography.P2>
                {houseData.region}시 {houseData.district}
              </Typography.P2>
            </Container.FlexCol>
            <Container.FlexCol className="gap-5">
              <Typography.SubTitle1>하우스 소개</Typography.SubTitle1>
              <Container.FlexRow className="items-center gap-5">
                <Icon type="apartment" />
                <Badge.Fill className="rounded-3xl px-5 py-2 text-white">
                  원룸/오피스텔
                </Badge.Fill>
                <Container.FlexRow className="gap-3 ">
                  <Typography.P2>{houseData.house_size}평</Typography.P2>
                  <Divider.Col />
                  <Typography.P2>방 {houseData.room_num}개</Typography.P2>
                  <Divider.Col />
                  <Typography.P2>2층</Typography.P2>
                </Container.FlexRow>
              </Container.FlexRow>
            </Container.FlexCol>
            <Container.FlexCol className="gap-5">
              <Typography.SubTitle1>이런 특징이 있어요</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                {houseData.house_appeal.map(value => (
                  <Badge.Fill
                    className="rounded-3xl px-5 py-2 text-white"
                    key={value}
                  >
                    {value}
                  </Badge.Fill>
                ))}
              </Container.FlexRow>
            </Container.FlexCol>
            <Container.FlexCol className="gap-6">
              <Typography.SubTitle1>원하는 룸메이트</Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                <Badge.Outline className="rounded-3xl px-5 py-2">
                  {houseData.mates_num} 명
                </Badge.Outline>
                <Badge.Outline className="rounded-3xl px-5 py-2">
                  {termArray}
                </Badge.Outline>
                <Badge.Outline className="rounded-3xl px-5 py-2">
                  반려동물 NO
                </Badge.Outline>
              </Container.FlexRow>
            </Container.FlexCol>
          </Container.FlexCol>
        </Container.FlexRow>

        <Container.FlexCol className="gap-7 pb-16 text-brown ">
          <Typography.SubTitle1>상세설명</Typography.SubTitle1>
          <Container.FlexCol className="rounded-lg bg-brown6 p-8">
            <pre className="text-lg font-normal">{houseData.describe}</pre>
          </Container.FlexCol>
        </Container.FlexCol>
        <Divider.Row />
        <Container.FlexCol className="gap-9 pt-8">
          <Typography.SubTitle1 className="text-brown">
            댓글 2개
          </Typography.SubTitle1>
          <Container.FlexCol className="items-end gap-8	">
            <TextArea
              type="text"
              name="comment"
              placeholder="댓글을 남겨보세요."
              rows={5}
            />
            <Button.Fill className="h-12 w-16 items-center justify-center rounded-lg text-white	">
              등록
            </Button.Fill>
          </Container.FlexCol>
        </Container.FlexCol>
      </Container.FlexCol>
      <Container.FlexCol>
        <Container.FlexCol className="gap-7 py-8">
          <Container.FlexRow className="justify-between">
            <Container.FlexRow className="gap-4 ">
              <Icon type="avatar" />
              <Container.FlexCol className="gap-3 text-brown">
                <Typography.P1>user123</Typography.P1>
                <Typography.Span1>1시간 전</Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
            <Container.FlexRow className="gap-2 text-brown">
              <Button.Ghost>답변</Button.Ghost>
              <Button.Ghost>수정</Button.Ghost>
              <Button.Ghost>삭제</Button.Ghost>
            </Container.FlexRow>
          </Container.FlexRow>
          <Typography.P2 className="text-brown">신청 보내봅니다!</Typography.P2>
        </Container.FlexCol>
        <Divider.Col />
        <Container.FlexCol className="gap-7 py-7">
          <Container.FlexRow className="justify-between">
            <Container.FlexRow className="gap-4 ">
              <Icon type="avatar" />
              <Container.FlexCol className="gap-3 text-brown">
                <Typography.P1>user1234</Typography.P1>
                <Typography.Span1>1시간 전</Typography.Span1>
              </Container.FlexCol>
            </Container.FlexRow>
            <Container.FlexRow className="gap-2 text-brown">
              <Button.Ghost>답변</Button.Ghost>
            </Container.FlexRow>
          </Container.FlexRow>
          <Typography.P2 className="text-brown">
            보증금 올리고 월세 낮춰도 될까요?
          </Typography.P2>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
