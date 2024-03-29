import SignUpProfileLayoutTemplate from '@/components/templates/SignUpProfileLayout.template';
import SignUpProfile1_1Template from '@/components/templates/SignUpProfile1_1.template';
import SignUpProfile1_2Template from '@/components/templates/SignUpProfile1_2.template';
import SignUpProfile1_3Template from '@/components/templates/SignUpProfile1_3.template';
import SignUpProfile2_1Template from '@/components/templates/SignUpProfile2_1.template';
import SignUpProfile2_2Template from '@/components/templates/SignUpProfile2_2.template';
import SignUpProfile3_1Template from '@/components/templates/SignUpProfile3_1.template';
import SignUpProfile3_2Template from '@/components/templates/SignUpProfile3_2.template';

export default function SignUpProfile() {
  return (
    <SignUpProfileLayoutTemplate>
      <SignUpProfile1_1Template />
      <SignUpProfile1_2Template />
      <SignUpProfile1_3Template />
      <SignUpProfile2_1Template />
      <SignUpProfile2_2Template />
      <SignUpProfile3_1Template />
      <SignUpProfile3_2Template />
    </SignUpProfileLayoutTemplate>
  );
}
