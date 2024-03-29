import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignUpProfileAppealsAtom } from '@/stores/sign.store';

export default function SignUpProfile1_2Template() {
  const [appeals, setAppeals] = useRecoilState(SignUpProfileAppealsAtom);
  return (
    <Container.FlexCol className="w-[894px] flex-[0_0_auto]">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="2-2"
          title="나의 라이프스타일은..."
        />
        <Typography.SubTitle1 className="text-brown">
          상대방에게 어필하고 싶은 3개를 작성해주세요
        </Typography.SubTitle1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
