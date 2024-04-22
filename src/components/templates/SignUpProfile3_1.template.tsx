import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import { SignUpType } from '@/types/signUp.type';
import { IconType } from '@/types/icon.type';
import IconButton from '@/components/molecules/IconButton';
import Button from '@/components/atoms/Button';

export default function SignUpProfile3_1Template() {
  const [gender, setGender] = useRecoilState(
    SignupProfileStateSelector('gender'),
  );
  const [matesNumber, setMatesNumber] = useRecoilState(
    SignupProfileStateSelector('mates_number'),
  );

  const genderInfos: {
    displayValue: string;
    stateValue: SignUpType['gender'];
    iconType: IconType;
  }[] = [
    {
      displayValue: '남성',
      stateValue: 1,
      iconType: 'male',
    },
    {
      displayValue: '여성',
      stateValue: 2,
      iconType: 'female',
    },
    {
      displayValue: '상관없어요',
      stateValue: 0,
      iconType: 'dont-mind-sex',
    },
  ];

  const mateNumberInfos: {
    displayValue: string;
    stateValue: SignUpType['mates_number'];
  }[] = [
    {
      displayValue: '1명',
      stateValue: 1,
    },
    {
      displayValue: '2명',
      stateValue: 2,
    },
    {
      displayValue: '3명',
      stateValue: 3,
    },
    {
      displayValue: '상관없어요',
      stateValue: 0,
    },
  ];

  const onClickGenderType = (stateValue: SignUpType['gender']) =>
    setGender(stateValue);

  const onClickMateNumbertype = (stateValue: SignUpType['mates_number']) =>
    setMatesNumber(stateValue);


  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-1"
          title="나의 원하는 룸메이트는..."
        />
        <Typography.SubTitle1 className="text-brown">성별</Typography.SubTitle1>
        <Container.FlexRow className="mb-[4.25rem] mt-11 w-full justify-start gap-x-6">
          {genderInfos.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className="flex-1 gap-y-5 rounded-lg py-5"
              isActive={stateValue === gender}
              iconType={iconType}
              direction="top"
              onClick={() => onClickGenderType(stateValue)}
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
        </Container.FlexRow>
        <Typography.SubTitle1 className="text-brown">
          인원 수
        </Typography.SubTitle1>
        <Container.FlexRow className="mb-[4.25rem] mt-11 gap-x-6">
          {mateNumberInfos.map(({ displayValue, stateValue }) => (
            <Button.Outline
              key={displayValue}
              className="flex-1 gap-y-5 rounded-lg py-5"
              isActive={stateValue === matesNumber}
              onClick={() => onClickMateNumbertype(stateValue)}
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
