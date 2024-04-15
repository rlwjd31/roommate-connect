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
  // ! react-hook-form의 register의 options property는 input field의 값이 update될 때 마다 invoke된다.
  const formMethods = useForm<ProfileFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      appealsInputValue: '',
      mateAppealsInputValute: '',
    },
  });
  const [allSignUpProfileState, setAllSignUpProfileState] = useRecoilState(
    SignUpProfileSelector,
  );

  // ! 하위계층 구조에 있는 input element내의 enter키를 누르면 bubbling에 의해 form이 event를 받게된다.
  // ! 이로 인해서 input element에서 enter는 badge를 만드는 목적을 가지지만 form onSubmit event를 발생시켜
  // ! global state가 초기화되는 현상이 일어난다.
  // ! 따라서, form에서 enter 키로 인한 onSubmit event를 막아 badge가 create될 때마다 submit 내부에 들어갈 logic들의 실행을 막을 수 있다.
  // ! e.key === 'Enter'일 때만 event를 prevent하면 onSubmit event가 발생하지 않으므로 event를 촉발시킨 주최가 input으로 제한한다.
  const preventFormTakeSubmitEvent = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement)
      e.preventDefault();
  };

  // * profile에 필요한 recoil state들 전체 update
  const testOnSubmit: SubmitHandler<ProfileFormValues> = (data, event) => {
    // event?.preventDefault();
    console.log('when a;sdklnfl;aksdjfl;kajsdf');
    console.log('✅ onSubmit data', data);
    setAllSignUpProfileState(testData);
  };

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={formMethods.handleSubmit(testOnSubmit)}
          onKeyDown={preventFormTakeSubmitEvent}
        >
          <SignUpProfileLayoutTemplate>
            <SignUpProfile2_2Template />
            <SignUpProfile1_1Template />
            <SignUpProfile1_2Template />
            <SignUpProfile1_3Template />
            <SignUpProfile2_1Template />
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
