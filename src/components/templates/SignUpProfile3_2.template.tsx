import { useRecoilState } from 'recoil';
import { FormProvider, useForm } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignUpProfileMateAppealsAtom } from '@/stores/sign.store';
import BadgeButton from '@/components/molecules/BadgeButton';
import TextField from '@/components/molecules/TextField';

type FormValues = {
  appeals: string;
  additionalAppeals: string;
};

export default function SignUpProfile1_2Template() {
  const formMethods = useForm<FormValues>();
  const [mateAppeals, setMateAppeals] = useRecoilState(
    SignUpProfileMateAppealsAtom,
  );
  const testOnSubmit = value => console.log(value);
  return (
    <Container.FlexCol className="min-w-full px-2">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(testOnSubmit)}>
          <Container.FlexCol>
            <SignUpProfileStepTitleTemplate
              step="3-2"
              title="나의 원하는 룸메이트는..."
            />
            <Container.FlexCol className="mb-[68px]">
              <Typography.SubTitle1 className="mb-11 text-brown">
                내가 상대방에게 원하는 어필 3개를 작성해주세요
              </Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                {mateAppeals.map(appeal => (
                  <BadgeButton.Fill
                    key={appeal}
                    className="gap-x-5 rounded-[30px] p-4"
                    iconType="close"
                    stroke="bg"
                  >
                    <Typography.P1>{appeal}</Typography.P1>
                  </BadgeButton.Fill>
                ))}
              </Container.FlexRow>
              {/* TODO: activeWatch 지워야 함 => debug */}
              <TextField
                containerStyle="mt-5"
                type="text"
                name="이거 뭥미"
                activeWatch
              />
            </Container.FlexCol>
            <Container.FlexCol>
              <Typography.SubTitle1 className="mb-11 text-brown">
                추가적으로 원하는 어필을 작성해주세요(생략 가능)
              </Typography.SubTitle1>
              <Container.FlexRow className="gap-2">
                {mateAppeals.map(appeal => (
                  <BadgeButton.Fill
                    key={appeal}
                    className="gap-x-5 rounded-[30px] p-4"
                    iconType="close"
                    stroke="bg"
                  >
                    <Typography.P1>{appeal}</Typography.P1>
                  </BadgeButton.Fill>
                ))}
              </Container.FlexRow>
              <TextField containerStyle="mt-5" type="text" name="이거뭥미" />
            </Container.FlexCol>
          </Container.FlexCol>
        </form>
      </FormProvider>
    </Container.FlexCol>
  );
}
