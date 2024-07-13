import { KeyboardEvent, useState } from 'react';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import { HouseRegisterTemplateProp } from '@/components/templates/HouseRegisterTemplate1';
import { mateNumberDisplayData } from '@/constants/signUpProfileData';
import { HouseFormType } from '@/types/house.type';
import FormItem from '@/components/molecules/FormItem';
import { matesGenderDisplayData } from '@/constants/houseData';
import { SignUpProfileFormType } from '@/types/signUp.type';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';
import { InputRangeState } from '@/components/molecules/DualInputRange';
import BadgeButtons from '@/components/molecules/BadgeButtons';

type Template2HiddenState = {
  mates_gender: SignUpProfileFormType['gender'];
  mates_num: SignUpProfileFormType['mates_number'];
  mates_appeal: SignUpProfileFormType['mate_appeals'];
};

export default function HouseRegisterTemplates2({
  form,
}: HouseRegisterTemplateProp) {
  const [template2HiddenState, setTemplate2HiddenState] =
    useState<Template2HiddenState>({
      mates_gender: 1,
      mates_num: 1,
      mates_appeal: [],
    });
  const [preferAge, setPreferAge] = useState<InputRangeState>([0, 30]);

  const onClickMatesNum = (stateValue: HouseFormType['mates_num']) => {
    form.setValue('mates_num', stateValue);
    setTemplate2HiddenState(prev => ({
      ...prev,
      mates_num: stateValue,
    }));
  };

  const onClickGenderType = (stateValue: SignUpProfileFormType['gender']) =>
    setTemplate2HiddenState(prev => ({
      ...prev,
      mates_gender: stateValue,
    }));

  const [mateAppeal, setMateAppeal] = useState('');

  const onChangeAppeal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.currentTarget.value;
    setMateAppeal(content);
  };

  const createBadge = () => {
    const appeals = template2HiddenState.mates_appeal;
    if (!appeals.includes(mateAppeal) && mateAppeal !== '') {
      appeals.push(mateAppeal);
      setTemplate2HiddenState(prev => ({
        ...prev,
        mates_appeal: appeals,
      }));
      setMateAppeal('');
    }
  };

  const pressEnterCreateBadge = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      createBadge();
    }
  };

  const onDeleteAppealBadge = (appealContent: string) => {
    const appeals = template2HiddenState.mates_appeal.filter(
      houseAppeal => houseAppeal !== appealContent,
    );
    setTemplate2HiddenState(prev => ({
      ...prev,
      mates_appeal: appeals,
    }));
  };

  return (
    <Container.FlexCol className="mt-8 min-w-full flex-1">
      <Container.FlexCol className="min-w-[13rem] max-w-[75rem]">
        <Typography.Head3 className="mb-10 text-brown">
          원하는 룸메이트
        </Typography.Head3>
        <Container.FlexCol className="gap-[5.5rem]">
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-3 text-brown">
              성별
            </Typography.SubTitle1>
            <Container.FlexRow className="mb-4 gap-2">
              {matesGenderDisplayData.map(
                ({ displayValue, stateValue, iconType }) => (
                  <BadgeButton.Outline
                    key={displayValue}
                    className="gap-2 rounded-full px-4 pb-1 pt-1.5"
                    badgeActive={
                      stateValue === template2HiddenState.mates_gender
                    }
                    iconType={iconType}
                    direction="left"
                    onClick={() => onClickGenderType(stateValue)}
                  >
                    <Typography.P2>{displayValue}</Typography.P2>
                  </BadgeButton.Outline>
                ),
              )}
            </Container.FlexRow>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-3 text-brown">
              원하는 인원 수
            </Typography.SubTitle1>
            <Container.FlexRow className="mb-4 gap-2">
              {mateNumberDisplayData.map(({ displayValue, stateValue }) => (
                <BadgeButton.Outline
                  key={displayValue}
                  className="rounded-full px-5 pb-2 pt-2.5"
                  onClick={() => onClickMatesNum(stateValue)}
                  badgeActive={stateValue === form.watch('mates_num')}
                >
                  <Typography.P2>{displayValue}</Typography.P2>
                </BadgeButton.Outline>
              ))}
              <FormItem.Hidden<Pick<HouseFormType, 'mates_num'>>
                name="mates_num"
                valueProp={template2HiddenState.mates_num}
              />
            </Container.FlexRow>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-3 text-brown">
              원하는 나이
            </Typography.SubTitle1>
            <Container.FlexCol>
              <LabelDualInputRange
                className=" w-[30rem]"
                min={0}
                max={30}
                step={1}
                setRangeValue={setPreferAge}
                rangeValue={preferAge}
                category="age"
              />
            </Container.FlexCol>
          </Container.Grid>
          <Container.Grid className="items-start gap-4 sm:grid-cols-[12.8125rem_auto]">
            <Typography.SubTitle1 className="mt-3 text-brown">
              룸메이트 특징
            </Typography.SubTitle1>
            <Container.FlexCol>
              <input
                type="text"
                value={mateAppeal}
                onChange={onChangeAppeal}
                onKeyDown={pressEnterCreateBadge}
                className="mb-[1rem] h-14 max-w-[30.4375rem] rounded-lg border-[1px] border-solid border-brown bg-transparent p-[1rem] placeholder:text-brown3 focus:outline-none focus:ring-1 focus:ring-brown2"
                placeholder="EX) 반려동물 NO, 늦게자요, 잠귀 어두운 분"
              />
              {template2HiddenState.mates_appeal.length === 0 ? (
                <span className="h-[40px]">&nbsp;</span>
              ) : (
                <BadgeButtons
                  contents={template2HiddenState.mates_appeal}
                  className="gap-2"
                  badgeStyle="rounded-full px-5 pb-2 pt-2.5"
                  iconStyle="ml-2"
                  stroke="bg"
                  iconType="close"
                  typoStyle="text-bg"
                  onClick={onDeleteAppealBadge}
                />
              )}
            </Container.FlexCol>
          </Container.Grid>
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
