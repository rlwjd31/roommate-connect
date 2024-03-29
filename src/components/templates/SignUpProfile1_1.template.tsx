import { useRecoilState } from 'recoil';
import { MouseEvent } from 'react';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/molecules/IconButton';
import {
  SignUpProfileRentalTypeAtom,
  SignUpProfileTypeAtom,
} from '@/stores/sign.store';

export default function SignUpProfile1_1Template() {
  const [type, setType] = useRecoilState(SignUpProfileTypeAtom);
  const [rentalType, setRentalType] = useRecoilState(
    SignUpProfileRentalTypeAtom,
  );

  const TypeValue = ['원룸/오피스텔', '빌라/연립', '아파트', '단독주택'];
  const RentalTypeValue = ['월세', '반전세', '전세', '상관없음'];

  const onClickType = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    setType(Number(id));
  };

  const onClickRentalType = (event: MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget;
    setRentalType(Number(id));
  };
  return (
    <Container.FlexCol className="min-w-full">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-1" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">
          집 유형
        </Typography.SubTitle1>
        {/* TODO ICON 변경 */}
        <Container.FlexRow className="mb-[4.25rem] mt-11 gap-x-6">
          {TypeValue.map((typeItem, index) => (
            <IconButton.Outline
              key={typeItem}
              className={`flex-1 gap-y-5 rounded-lg py-5 ${index === type && 'border-point bg-brown4'}`}
              iconType="right-arrow"
              direction="top"
              id={String(index)}
              onClick={onClickType}
            >
              <Typography.P2 className="text-brown">{typeItem}</Typography.P2>
            </IconButton.Outline>
          ))}
        </Container.FlexRow>
        <Typography.SubTitle1 className="text-brown">
          매물 종류
        </Typography.SubTitle1>
        <Container.FlexRow className="mt-11 gap-x-6">
          {RentalTypeValue.map((rentalTypeItem, index) => (
            <Button.Outline
              key={rentalTypeItem}
              className={`flex-1 rounded-lg py-5 ${index === rentalType && 'border-point bg-brown4'}`}
              id={String(index)}
              onClick={onClickRentalType}
            >
              <Typography.P2 className="flex-1 text-brown">
                {rentalTypeItem}
              </Typography.P2>
            </Button.Outline>
          ))}
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
