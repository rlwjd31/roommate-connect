import { Controller, FieldValues, useFormContext } from 'react-hook-form';

import TextField, { TextFieldProps } from '@/components/molecules/TextField';
import Input from '@/components/atoms/Input';
import TextAreaField, {
  TextAreaFieldProps,
} from '@/components/molecules/TextAreaField';

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
        render={({ field }) => <input type="hidden" {...field} />}
      />
    );

  return <span>Name 속성이 필요합니다</span>;
};

// // ! controller로 감쌀 필요가 없이 register
// FormItem.TextArea = function FormItemTextArea<T extends FieldValues>(
//   props: TextAreaFieldProps<T>,
// ) {};

// FormItem.TextAreaWithState => controller로 감싸고(control을 이용하는 것 )
FormItem.TextAreaField = function FormItemTextAreaField<T extends FieldValues>(
  // eslint-disable-next-line react/require-default-props
  props: TextAreaFieldProps<T> & { isControlled?: boolean },
) {
  const { control, getValues } = useFormContext();
  const {
    defaultValue,
    name,
    labelName,
    options,
    containerStyle,
    textAreaStyle,
    isControlled = false,
  } = props;
  const fieldValue = getValues(name as string) || defaultValue;

  return isControlled ? (
    <Controller
      name={name}
      control={control}
      defaultValue={fieldValue}
      rules={options}
      render={({ field }) => (
        <TextAreaField
          {...field}
          containerStyle={containerStyle}
          labelName={labelName}
          className={textAreaStyle}
        />
      )}
    />
  ) : (
    <TextAreaField />
  );
};
