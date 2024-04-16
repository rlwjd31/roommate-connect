import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignUpProfileMateAppealsAtom } from '@/stores/sign.store';
import BadgeButton from '@/components/molecules/BadgeButton';
import TextField from '@/components/molecules/TextField';
import { ProfileFormValues } from '@/components/pages/SignUpProfile';
import BadgeButtons from '@/components/molecules/BadgeButtons';

export default function SignUpProfile3_2Template() {
  const [mateAppeals, setMateAppeals] = useRecoilState(
    SignUpProfileMateAppealsAtom,
  );

  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-2"
          title="나의 원하는 룸메이트는..."
        />
        <Container.FlexCol className="mb-[68px]">
          <Typography.SubTitle1 className="mb-11 text-brown">
            내가 상대방에게 원하는 어필 3개를 작성해주세요
          </Typography.SubTitle1>
          <BadgeButtons
            contents={mateAppeals}
            className="gap-2"
            badgeClassName="gap-x-5 rounded-[30px] p-4"
            stroke="bg"
            iconType="close"
            typoClassName="text-bg"
            onClick={() => alert('clicked!!')}
          />
          <TextField<Pick<ProfileFormValues, 'mateAppealsInputValute'>>
            containerStyle="mt-5"
            type="text"
            name="mateAppealsInputValute"
          />
        </Container.FlexCol>
        <Container.FlexCol>
          <BadgeButtons
            contents={[
              '외향적',
              '내향적',
              '야행성',
              '직장인이에요',
              '학생이에요',
              '청소 잘 해요',
              '친구초대 안 해요',
              '요리 잘 해요',
              '혼밥 싫어요',
              '더위 잘 타요',
              '추위 잘 타요',
            ]}
            className="flex flex-wrap gap-3"
            badgeClassName="gap-x-5 rounded-[30px] p-4 min-w-max"
            stroke="bg"
            typoClassName="text-bg"
            onClick={() => alert('clicked!!')}
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
