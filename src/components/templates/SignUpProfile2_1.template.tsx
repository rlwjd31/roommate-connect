import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import {
  SignUpProfilePetAtom,
  SignUpProfileSmokingAtom,
} from '@/stores/sign.store';
import IconButton from '@/components/molecules/IconButton';
import { IconType } from '@/types/icon.type';
import { SignUpType } from '@/types/signUp.type';
import cn from '@/libs/cn';

export default function SignUpProfile1ㅁ2Template() {
  const [smoking, setSmoking] = useRecoilState(SignUpProfileSmokingAtom);
  const [pet, setPet] = useRecoilState(SignUpProfilePetAtom);

  const smokeInfos: {
    displayValue: string;
    stateValue: SignUpType['smoking'];
    iconType: IconType;
  }[] = [
    {
      displayValue: '흡연자',
      stateValue: true,
      iconType: 'smoke',
    },
    {
      displayValue: '비흡연자',
      stateValue: false,
      iconType: 'none-smoke',
    },
  ];

  const petInfos: {
    displayValue: string;
    stateValue: SignUpType['pet'];
    iconType: IconType;
  }[] = [
    {
      displayValue: '상관없어요',
      stateValue: 0,
      iconType: 'dont-mind-pet',
    },
    {
      displayValue: '반려동물 키워요',
      stateValue: 1,
      iconType: 'pet-lover',
    },
    {
      displayValue: '반려동물 NO',
      stateValue: 2,
      iconType: 'none-pet-lover',
    },
  ];

  const onClickSmokingType = (stateValue: SignUpType['smoking']) =>
    setSmoking(stateValue);
  const onClickPettype = (stateValue: SignUpType['pet']) => setPet(stateValue);

  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="2-1"
          title="나의 라이프스타일은..."
        />
        <Typography.SubTitle1 className="text-brown">
          흡연 여부
        </Typography.SubTitle1>
        <Container.FlexRow className="mb-[4.25rem] mt-11 w-full justify-start gap-x-6">
          {smokeInfos.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className={cn(
                'flex-1 gap-y-5 rounded-lg py-5',
                smoking && stateValue === smoking && 'border-point bg-brown4',
              )}
              iconType={iconType}
              direction="top"
              onClick={() => onClickSmokingType(stateValue)}
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
        </Container.FlexRow>
        <Typography.SubTitle1 className="text-brown">
          반려 동물
        </Typography.SubTitle1>
        <Container.FlexRow className="mb-[4.25rem] mt-11 gap-x-6">
          {petInfos.map(({ displayValue, stateValue, iconType }) => (
            <IconButton.Outline
              key={displayValue}
              className={cn(
                'flex-1 gap-y-5 rounded-lg py-5',
                pet && stateValue === pet && 'border-point bg-brown4',
              )}
              iconType={iconType}
              direction="top"
              onClick={() => onClickPettype(stateValue)}
            >
              <Typography.P2 className="text-brown">
                {displayValue}
              </Typography.P2>
            </IconButton.Outline>
          ))}
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
