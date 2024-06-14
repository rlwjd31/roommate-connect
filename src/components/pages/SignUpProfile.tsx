/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardEvent, useEffect } from 'react';
import { DevTool } from '@hookform/devtools';
import { useRecoilValue } from 'recoil';
import { zodResolver } from '@hookform/resolvers/zod';

import SignUpProfileLayoutTemplate from '@/components/templates/SignUpProfileLayout.template';
import SignUpProfile1_1Template from '@/components/templates/SignUpProfile1_1.template';
import SignUpProfile1_2Template from '@/components/templates/SignUpProfile1_2.template';
import SignUpProfile1_3Template from '@/components/templates/SignUpProfile1_3.template';
import SignUpProfile2_1Template from '@/components/templates/SignUpProfile2_1.template';
import SignUpProfile2_2Template from '@/components/templates/SignUpProfile2_2.template';
import SignUpProfile3_1Template from '@/components/templates/SignUpProfile3_1.template';
import SignUpProfile3_2Template from '@/components/templates/SignUpProfile3_2.template';
import { SignUpProfileForm, SignUpProfileFormType } from '@/types/signUp.type';
import { SignUpProfileState } from '@/stores/sign.store';

export default function SignUpProfile() {
  const signUpProfileState = useRecoilValue(SignUpProfileState);
  const formMethods = useForm<SignUpProfileFormType>({
    mode: 'onSubmit',
    defaultValues: {
      type: undefined,
      rental_type: undefined,
      regions: [],
      smoking: undefined,
      pet: undefined,
      gender: undefined,
      mates_number: undefined,
      appeals: [],
      mate_appeals: [],
      term: [],
      deposit_price: [],
      monthly_rental_price: [],
      appealsInputValue: '',
      mateAppealsInputValue: '',
    },
    resolver: zodResolver(SignUpProfileForm),
  });

  useEffect(() => {
    Object.entries(signUpProfileState).forEach(([key, value]) => {
      formMethods.setValue(key as keyof SignUpProfileFormType, value);
      if (key !== 'appealsInputValue' && key !== 'mateAppealsInputValue')
        formMethods.trigger(key as keyof SignUpProfileFormType);
    });
  }, []);

  // * profile에 필요한 recoil state들 전체 update
  const testOnSubmit: SubmitHandler<SignUpProfileFormType> = (
    formData: SignUpProfileFormType,
  ) => {
    console.log('signupProfilestate when onSubmit', formData);
    // TODO: send api call to update user profile meta data
  };

  const preventFormTakeSubmitEvent = (e: KeyboardEvent<HTMLFormElement>) => {
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
