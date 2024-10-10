import { SignLayoutWrapper } from '@/components/templates/SignLayout.template';
import SignUpInfoTemplate from '@/components/templates/SignUpInfo.template';

export default function SignUpInfo() {
  return (
    <SignLayoutWrapper className="gap-[2.5rem]">
      <SignUpInfoTemplate />
    </SignLayoutWrapper>
  );
}
