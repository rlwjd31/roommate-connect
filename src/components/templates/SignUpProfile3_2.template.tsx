import { useRecoilState } from 'recoil';
import { KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import BadgeButtons from '@/components/molecules/BadgeButtons';
import FormItem from '@/components/molecules/FormItem';
import { signUpProfileBadgeExamples } from '@/constants/signUpProfileData';
import { SignUpProfileFormType } from '@/types/signUp.type';

export default function SignUpProfile3_2Template() {
  const [mateAppeals, setMateAppeals] = useRecoilState(
    SignupProfileStateSelector('mate_appeals'),
  );

  const { trigger, setValue, watch } =
    useFormContext<Pick<SignUpProfileFormType, 'mateAppealsInputValue'>>();

  const createBadge = async (badgeContent: string) => {
    if (!mateAppeals.includes(badgeContent) && badgeContent !== '') {
      setValue('mateAppealsInputValue', '');
      setMateAppeals(prev => [...prev, badgeContent]);
    }
  };

  const deleteBadge = (badgeContent: string) =>
    setMateAppeals(prev =>
      prev.filter(mateAppeal => mateAppeal !== badgeContent),
    );

  const pressEnterCreateBadge = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      const isBadgeContentValid = await trigger('mateAppealsInputValue');

      if (isBadgeContentValid)
        await createBadge(watch('mateAppealsInputValue'));
    }
  };

  return (
    <Container.FlexCol className="min-w-full p-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-2"
          title="나의 원하는 룸메이트는..."
        />
        <Container.FlexCol className="mb-[4.25rem]">
          <Typography.SubTitle1 className="mb-11 text-brown">
            떠오르는 것이 없다면 선택해주세요
          </Typography.SubTitle1>
          <BadgeButtons
            contents={signUpProfileBadgeExamples}
            className="flex flex-wrap gap-x-2 gap-y-3"
            badgeStyle="gap-x-5 rounded-[1.875rem] py-[0.75rem] px-4"
            stroke="bg"
            typoStyle="text-bg"
            typoType="P2"
            onClick={createBadge}
          />
        </Container.FlexCol>
        <Container.FlexCol>
          <Typography.SubTitle1 className="mb-11 text-brown">
            내가 상대방에게 원하는 어필 3개를 작성해주세요
          </Typography.SubTitle1>
          <FormItem.TextField<
            Pick<SignUpProfileFormType, 'mateAppealsInputValue'>
          >
            placeholder="ex) 늦게 자요, 청소 자주해요, 코골이 해요"
            type="text"
            name="mateAppealsInputValue"
            onKeyDown={pressEnterCreateBadge}
            inputStyle="w-full"
            containerStyle="mb-5 max-w-[30.375rem]"
          />
          <BadgeButtons
            contents={mateAppeals}
            className="flex flex-wrap gap-x-2 gap-y-3"
            badgeStyle="gap-x-5 rounded-[1.875rem] py-[0.75rem] px-4"
            stroke="bg"
            iconType="close"
            typoStyle="text-bg"
            typoType="P2"
            onClick={deleteBadge}
            iconStyle="w-[0.6875rem] h-[0.75rem]"
          />
          <FormItem.Hidden<Pick<SignUpProfileFormType, 'mate_appeals'>>
            name="mate_appeals"
            valueProp={mateAppeals}
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
