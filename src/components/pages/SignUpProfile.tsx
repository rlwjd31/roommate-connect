/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-pascal-case */
import { Form, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent } from 'react';
import { DevTool } from '@hookform/devtools';

import SignUpProfileLayoutTemplate from '@/components/templates/SignUpProfileLayout.template';
import SignUpProfile1_1Template from '@/components/templates/SignUpProfile1_1.template';
import SignUpProfile1_2Template from '@/components/templates/SignUpProfile1_2.template';
import SignUpProfile1_3Template from '@/components/templates/SignUpProfile1_3.template';
import SignUpProfile2_1Template from '@/components/templates/SignUpProfile2_1.template';
import SignUpProfile2_2Template from '@/components/templates/SignUpProfile2_2.template';
import SignUpProfile3_1Template from '@/components/templates/SignUpProfile3_1.template';
import SignUpProfile3_2Template from '@/components/templates/SignUpProfile3_2.template';

export type ProfileFormValues = {
  houseType: undefined | number;
  rentalType: undefined | number;
  appealsInputValue: string;
  appeals: string;
  mateAppealsInputValue: string;
  mateAppeals: string;
  regions: string;
  smoking: undefined | string;
  pet: undefined | number;
  gender: undefined | number;
  matesNumber: undefined | number;
};

export default function SignUpProfile() {
  const formMethods = useForm<ProfileFormValues>({
    mode: 'onSubmit',
    defaultValues: {
      houseType: undefined,
      rentalType: undefined,
      regions: '',
      smoking: undefined,
      pet: undefined,
      gender: undefined,
      matesNumber: undefined,
      appealsInputValue: '',
      appeals: '',
      mateAppealsInputValue: '',
      mateAppeals: '',
    },
  });

  // * profile에 필요한 recoil state들 전체 update
  const testOnSubmit: SubmitHandler<ProfileFormValues> = (
    formData: ProfileFormValues,
  ) => {
    console.log('form submit event is occurred!!!✅');
    console.log('formData', formData);
    alert('something');

    // setAllSignUpProfileState(testData);
  };

  const preventFormTakeSubmitEvent = (e: KeyboardEvent<HTMLFormElement>) => {
    console.log(e);
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement)
      e.preventDefault();
  };

  return (
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
      </form>
      <DevTool control={formMethods.control} />
    </FormProvider>
  );
}
