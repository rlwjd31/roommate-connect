import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/molecules/IconButton';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import { SignUpType } from '@/types/signUp.type';
import { houseTypeInfos, rentalTypeInfos } from '@/constants/selectTypeInfos';

export default function SignUpProfile1_1Template() {
  const [houseType, setHouseType] = useRecoilState(
    SignupProfileStateSelector('type'),
  );
  const [rentalType, setRentalType] = useRecoilState(
    SignupProfileStateSelector('rental_type'),
  );

  const onClickType = (stateValue: SignUpType['type']) =>
    setHouseType(stateValue);
  const onClickRentalType = (stateValue: SignUpType['rental_type']) =>
    setRentalType(stateValue);

  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-1" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">
          집 유형
        </Typography.SubTitle1>
        {/* TODO ICON 변경 */}
        <Container.FlexRow className="mb-[4.25rem] mt-11 gap-x-6">
          {houseTypeInfos.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className="flex-1 gap-y-5 rounded-lg py-5"
              isActive={stateValue === houseType}
              iconType={iconType}
              direction="top"
              onClick={() => onClickType(stateValue)}
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
        </Container.FlexRow>
        <Typography.SubTitle1 className="text-brown">
          매물 종류
        </Typography.SubTitle1>
        <Container.FlexRow className="mt-11 gap-x-6">
          {rentalTypeInfos.map(({ displayValue, stateValue }) => (
            <Button.Outline
              key={displayValue}
              className="flex-1 rounded-lg py-5"
              isActive={stateValue === rentalType}
              onClick={() => onClickRentalType(stateValue)}
            >
              <Typography.P2 className="flex-1 text-brown">
                {displayValue}
              </Typography.P2>
            </Button.Outline>
          ))}
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
