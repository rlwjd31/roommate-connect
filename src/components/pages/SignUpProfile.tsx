/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-pascal-case */
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent } from 'react';
import { useRecoilState } from 'recoil';
import { DevTool } from '@hookform/devtools';

import SignUpProfileLayoutTemplate from '@/components/templates/SignUpProfileLayout.template';
import SignUpProfile1_1Template from '@/components/templates/SignUpProfile1_1.template';
import SignUpProfile1_2Template from '@/components/templates/SignUpProfile1_2.template';
import SignUpProfile1_3Template from '@/components/templates/SignUpProfile1_3.template';
import SignUpProfile2_1Template from '@/components/templates/SignUpProfile2_1.template';
import SignUpProfile2_2Template from '@/components/templates/SignUpProfile2_2.template';
import SignUpProfile3_1Template from '@/components/templates/SignUpProfile3_1.template';
import SignUpProfile3_2Template from '@/components/templates/SignUpProfile3_2.template';
import { SignUpType } from '@/types/signUp.type';
import Button from '@/components/atoms/Button';
import { SignUpProfileSelector } from '@/stores/sign.store';

const testData: SignUpType = {
  type: 0,
  rental_type: 1,
  regions: ['서울시 강동구'],
  deposit_price: [100, 3000],
  term: [2, 6],
  monthly_price: [30, 40],
  smoking: true,
  pet: 0,
  appeals: ['난 꿀꿀이'],
  gender: 1,
  mates_number: 1,
  mate_appeals: ['너도 꿀꿀이'],
};

export type ProfileFormValues = {
  appealsInputValue: string;
  mateAppealsInputValute: string;
};

export default function SignUpProfile() {
  // ! react-hook-form의 register의 options property는
  // ! input field의 값이 update될 때 마다 invoke된다. - by docs
  const formMethods = useForm<ProfileFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      appealsInputValue: '',
      mateAppealsInputValute: '',
    },
  });

  // ! TODO: refactoring 후 전체를 가져오는 Get과 set에 대한 logic구현
  // const [allSignUpProfileState, setAllSignUpProfileState] = useRecoilState(
  //   SignUpProfileSelector,
  // );

  const preventFormTakeSubmitEvent = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement)
      e.preventDefault();
  };

  // * profile에 필요한 recoil state들 전체 update
  const testOnSubmit: SubmitHandler<ProfileFormValues> = (data, event) => {
    // setAllSignUpProfileState(testData);
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(testOnSubmit)}
          onKeyDown={preventFormTakeSubmitEvent}
        >
          <SignUpProfileLayoutTemplate>
            <SignUpProfile1_1Template />
            <SignUpProfile1_2Template />
            <SignUpProfile1_3Template />
            <SignUpProfile2_1Template />
            <SignUpProfile2_2Template />
            <SignUpProfile3_1Template />
            <SignUpProfile3_2Template />
          </SignUpProfileLayoutTemplate>
          {/* TODO: 아래 button은 test용으로 지워야 됨 */}
          {/* test below element occur submit event and input element doesn't occur subit event */}
          <Button.Fill type="submit" className="p-10">
            Submit
          </Button.Fill>
        </form>
      </FormProvider>
      <DevTool control={formMethods.control} />
    </>
  );
}
