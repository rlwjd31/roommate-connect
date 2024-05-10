import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@/components/molecules/TextField';
import Input, { InputProps } from '@/components/atoms/Input';

type FormItemHiddenProps = InputProps & {
  children: React.ReactNode;
  options: RegisterOptions;
};
export default function FormItem() {}

FormItem.TextField = function FormItemTextField<T extends FieldValues>(
  props: TextFieldProps<T>,
) {
  const { type, labelName, name, options, ...others } = props;
  return (
    <TextField
      options={options}
      labelName={labelName}
      name={name}
      type={type}
      {...others}
    />
  );
};

FormItem.Hidden = function FormItemPassword(props: FormItemHiddenProps) {
  const { children, defaultValue, name, options } = props;
  const { register } = useFormContext();
  if (name)
    return (
      <Input
        type="hidden"
        defaultValue={defaultValue}
        {...register(name, options)}
      >
        {children}
      </Input>
    );
  return <span>Name 속성이 필요합니다</span>;
};
