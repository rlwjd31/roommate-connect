import { RegisterOptions, useFormContext } from 'react-hook-form';

import Container from '@/components/atoms/Container';
import Input, { InputProps } from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';
import Typography from '@/components/atoms/Typography';

export type TextFieldProps = InputProps & {
  text: string;
  name: string;
  containerStyle?: string;
  inputStyle?: string;
  options?: RegisterOptions;
};

export default function TextField(props: TextFieldProps) {
  const { text, type, name, containerStyle, inputStyle, placeholder, options } =
    props;

  const { register, formState } = useFormContext();

  return (
    <Container className={containerStyle}>
      <Label>{text}</Label>
      <Input type={type} className={inputStyle} placeholder={placeholder} {...register(name, options)} />
      <Typography.Span2
        className={`${!formState.errors[name]?.message && 'invisible'} mt-[8px] block text-point`}
      >
        {formState.errors[name]?.message as string}
      </Typography.Span2>
    </Container>
  );
}

TextField.defaultProps = { containerStyle: '', inputStyle: '', options: {} };
