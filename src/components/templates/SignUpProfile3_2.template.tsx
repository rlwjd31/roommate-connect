import { useRecoilState } from 'recoil';
import { KeyboardEvent, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import { ProfileFormValues } from '@/components/pages/SignUpProfile';
import BadgeButtons from '@/components/molecules/BadgeButtons';
import FormItem from '@/components/molecules/FormItem';

export default function SignUpProfile3_2Template() {
  const [mateAppeals, setMateAppeals] = useRecoilState(
    SignupProfileStateSelector('mate_appeals'),
  );

  const { setValue: setInputValue, watch } =
    useFormContext<Pick<ProfileFormValues, 'mateAppealsInputValue'>>();
  const { trigger, setValue } = useFormContext<ProfileFormValues>();

  useEffect(() => {
    setValue('mateAppeals', JSON.stringify(mateAppeals));
  }, [mateAppeals, setValue]);

  const createBadge = async (badgeContent: string) => {
    // **************** badge content검증****************
    const isBadgeContentValid = await trigger('mateAppealsInputValue');

    if (!isBadgeContentValid) return;
    // **************************************************

    if (!mateAppeals.includes(badgeContent) && badgeContent !== '') {
      setInputValue('mateAppealsInputValue', '');
      setMateAppeals(prev => [...prev, badgeContent]);
    }
  };

  const deleteBadge = (badgeContent: string) =>
    setMateAppeals(prev =>
      prev.filter(mateAppeal => mateAppeal !== badgeContent),
    );

  const pressEnterCreateBadge = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      createBadge(watch('mateAppealsInputValue'));
    }
  };

  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate
          step="3-2"
          title="나의 원하는 룸메이트는..."
        />{' '}
        <Container.FlexCol className="mb-[4.25rem]">
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
            className="flex flex-wrap gap-x-2 gap-y-3"
            badgeStyle="gap-x-5 rounded-[30px] pt-[13px] pb-[11px] px-4 min-w-max"
            stroke="bg"
            typoStyle="text-bg"
            onClick={createBadge}
          />
        </Container.FlexCol>
        <Container.FlexCol>
          <Typography.SubTitle1 className="mb-11 text-brown">
            내가 상대방에게 원하는 어필 3개를 작성해주세요
          </Typography.SubTitle1>
          <FormItem.TextField<Pick<ProfileFormValues, 'mateAppealsInputValue'>>
            placeholder="ex) 늦게 자요, 청소 자주해요, 코골이 해요"
            type="text"
            name="mateAppealsInputValue"
            onKeyDown={pressEnterCreateBadge}
            containerStyle="mb-10"
            options={{
              minLength: {
                value: 3,
                message: '3글자 이상이어야 합니다.',
              },
            }}
          />
          <BadgeButtons
            contents={mateAppeals}
            className="flex flex-wrap gap-x-2 gap-y-3"
            badgeStyle="gap-x-5 rounded-[30px] pt-[13px] pb-[11px] px-4 min-w-max"
            stroke="bg"
            iconType="close"
            typoStyle="text-bg"
            onClick={deleteBadge}
          />
          <FormItem.Hidden<Pick<ProfileFormValues, 'mateAppeals'>>
            name="mateAppeals"
            options={{
              validate: {
                isLengthExceeding: (mateAppealsArr: string) => {
                  const parsedArr = JSON.parse(mateAppealsArr) as string[];
                  if (parsedArr.length === 0) return '어필을 생성해주세요';
                  if (parsedArr.length < 3)
                    return '최소 3개 어필을 작성해주세요.';
                  return true;
                },
              },
            }}
            defaultValue=""
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
