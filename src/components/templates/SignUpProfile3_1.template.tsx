import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import { SignUpProfileFormType } from '@/types/signUp.type';
import IconButton from '@/components/molecules/IconButton';
import Button from '@/components/atoms/Button';
import FormItem from '@/components/molecules/FormItem';
import {
  genderDisplayData,
  mateNumberDisplayData,
} from '@/constants/signUpProfileData';

export default function SignUpProfile3_1Template() {
  const [gender, setGender] = useRecoilState(
    SignupProfileStateSelector('gender'),
  );
  const [matesNumber, setMatesNumber] = useRecoilState(
    SignupProfileStateSelector('mates_number'),
  );

  const onClickGenderType = (stateValue: SignUpProfileFormType['gender']) =>
    setGender(stateValue);

  const onClickMateNumberType = (
    stateValue: SignUpProfileFormType['mates_number'],
  ) => setMatesNumber(stateValue);

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-1"
          title="내가 원하는 룸메이트는..."
        />
        <Typography.SubTitle1 className="text-brown">성별</Typography.SubTitle1>
        <Container.FlexRow className="mb-[4.25rem] mt-11 flex-wrap gap-6">
          {genderDisplayData.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className="basis-[11.25rem] gap-y-5 rounded-lg py-5"
              isActive={stateValue === gender}
              iconType={iconType}
              direction="top"
              onClick={() => onClickGenderType(stateValue)}
              iconClassName="w-[4.75rem] h-[4.25rem]"
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'gender'>>
            name="gender"
            valueProp={gender}
          />
        </Container.FlexRow>
        <Typography.SubTitle1 className="text-brown">
          인원 수
        </Typography.SubTitle1>
        <Container.FlexRow className="mt-11 flex-wrap gap-6">
          {mateNumberDisplayData.map(({ displayValue, stateValue }) => (
            <Button.Outline
              key={displayValue}
              className="basis-[11.25rem] gap-y-5 rounded-lg py-5"
              isActive={stateValue === matesNumber}
              onClick={() => onClickMateNumberType(stateValue)}
            >
              <Typography.P2 className="w-full text-brown">
                {displayValue}
              </Typography.P2>
            </Button.Outline>
          ))}
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'mates_number'>>
            name="mates_number"
            valueProp={matesNumber}
          />
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
