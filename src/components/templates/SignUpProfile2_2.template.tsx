import { useRecoilState } from 'recoil';
import { useFormContext } from 'react-hook-form';
import { KeyboardEvent } from 'react';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignUpProfileAppealsAtom } from '@/stores/sign.store';
import TextField from '@/components/molecules/TextField';
import { ProfileFormValues } from '@/components/pages/SignUpProfile';
import BadgeButtons from '@/components/molecules/BadgeButtons';

export default function SignUpProfile2_2Template() {
  const [appeals, setAppeals] = useRecoilState(SignUpProfileAppealsAtom);
  const { setValue: setInputValue, watch } =
    useFormContext<Pick<ProfileFormValues, 'appealsInputValue'>>();

  const createBadge = (badgeContent: string) => {
    if (!appeals.includes(badgeContent)) {
      setInputValue('appealsInputValue', '');
      setAppeals(prev => [...prev, badgeContent]);
    }
  };

  const deleteBadge = (badgeContent: string) =>
    setAppeals(prev => prev.filter(appeal => appeal !== badgeContent));

  const pressEnterCreateBadge = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      createBadge(watch('appealsInputValue'));
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
          <BadgeButtons
            contents={appeals}
            className="gap-2"
            badgeClassName="gap-x-5 rounded-[30px] p-4"
            stroke="bg"
            iconType="close"
            typoClassName="text-bg"
            onClick={deleteBadge}
          />
          <TextField<Pick<ProfileFormValues, 'appealsInputValue'>>
            containerStyle="mt-5"
            placeholder="ex) 늦게 자요, 청소 자주해요, 코골이 해요"
            type="text"
            name="appealsInputValue"
            onKeyDown={pressEnterCreateBadge}
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
        {/* badge 선택지들 UI가 나오면 그 때 적용하기 */}
        <Container.FlexCol>
          <Typography.SubTitle1 className="mb-11 text-brown">
            떠오르는 것이 없다면 선택해주세요
          </Typography.SubTitle1>
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
            onClick={createBadge}
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
