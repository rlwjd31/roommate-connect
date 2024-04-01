import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import {
  SignUpProfileDepositPriceAtom,
  SignUpProfileMonthlyPriceAtom,
} from '@/stores/sign.store';

export default function SignUpProfile1_2Template() {
  const [depositPrice, setDepositPrice] = useRecoilState(
    SignUpProfileDepositPriceAtom,
  );
  const [monthlyPrice, setMonthlyPrice] = useRecoilState(
    SignUpProfileMonthlyPriceAtom,
  );
  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-3" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">
          가격대는 이 정도가 적당해요
        </Typography.SubTitle1>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
