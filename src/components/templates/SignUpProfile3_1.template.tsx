import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import {
  SignUpProfileGenderAtom,
  SignUpProfileMatesNumberAtom,
} from '@/stores/sign.store';

export default function SignUpProfile1_2Template() {
  const [gender, setGender] = useRecoilState(SignUpProfileGenderAtom);
  const [matesNumber, setMatesNumber] = useRecoilState(
    SignUpProfileMatesNumberAtom,
  );
  return (
    <Container.FlexCol className="w-[894px] flex-[0_0_auto]">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-1"
          title="내가 원하는 룸메이트는..."
        />
        <Typography.SubTitle1 className="text-brown">성별</Typography.SubTitle1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
