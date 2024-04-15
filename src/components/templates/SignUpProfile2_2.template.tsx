import { useRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import { KeyboardEvent } from 'react';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignUpProfileAppealsAtom } from '@/stores/sign.store';
import BadgeButton from '@/components/molecules/BadgeButton';
import TextField from '@/components/molecules/TextField';
import { ProfileFormValues } from '@/components/pages/SignUpProfile';

type FormValues = {
  appeals: string;
  additionalAppeals: string;
};

export default function SignUpProfile1_2Template() {
  const [appeals, setAppeals] = useRecoilState(SignUpProfileAppealsAtom);

  const createBadgeOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      console.log('눌림!!', e.currentTarget.value);
      alert('눌림!!', e.currentTarget.value);
    }
  };

  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="2-2"
          title="나의 라이프스타일은..."
        />
        <Container.FlexCol className="mb-[68px]">
          <Typography.SubTitle1 className="mb-11 text-brown">
            상대방에게 어필하고 싶은 3개를 작성해주세요
          </Typography.SubTitle1>
          <Container.FlexRow className="gap-2">
            {appeals.map(appeal => (
              <BadgeButton.Fill
                key={appeal}
                className="gap-x-5 rounded-[30px] p-4"
                iconType="close"
                stroke="bg"
              >
                <Typography.P1 className="text-bg">{appeal}</Typography.P1>
              </BadgeButton.Fill>
            ))}
          </Container.FlexRow>
          {/* TODO: activeWatch 지워야 함 => debug */}
          <TextField<Pick<ProfileFormValues, 'appealsInputValue'>>
            containerStyle="mt-5"
            placeholder="ex) 늦게 자요, 청소 자주해요, 코골이 해요"
            type="text"
            name="appealsInputValue"
            activeWatch
            onKeyDown={createBadgeOnEnter}
            options={{
              // onChange: ,
              validate: (something1, something2) => {
                console.log('something1', something1);
                console.log('something2', something2);
                return true;
              },
              // onBlur: e => console.log('🤣 blur', e),
            }}
          />
        </Container.FlexCol>
        <Container.FlexCol>
          {/* badge 선택지들 UI가 나오면 그 때 적용하기 */}
          <Typography.Head1>나중에 badge 선택지들 나열</Typography.Head1>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
