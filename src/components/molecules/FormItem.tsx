import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@/components/molecules/TextField';
import Input from '@/components/atoms/Input';

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

FormItem.Hidden = function FormItemPassword<T extends FieldValues>(
  props: TextFieldProps<T>,
) {
  const { defaultValue, name, options = {} } = props;
  const { control } = useFormContext();

  if (name)
    return (
      <Controller
        name={name}
        control={control}
        // ! defaultValue type맞추기 어려워 any로 타입 우회
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        defaultValue={defaultValue ?? ('' as any)}
        rules={options}
        render={({ field }) => <Input type="hidden" {...field} />}
      />
    );

  return <span>Name 속성이 필요합니다</span>;
};
