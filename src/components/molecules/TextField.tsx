import { UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form';

import Container from '../atoms/Container';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import Typography from '../atoms/Typography';

export type TextFieldProps = {
  text: string;
	type: string;
  name: string;
  containerStyle?: string;
  inputStyle?: string;
  register: UseFormRegister<FieldValues>;
  options: RegisterOptions;
  helperText: string;
};

export default function TextField(props: TextFieldProps) {
  const {
    text,
		type,
    name,
    containerStyle,
    inputStyle,
    register,
    options,
    helperText,
  } = props;
  return (
    <Container className={containerStyle}>
      <Label>{text}</Label>
      <Input type={type} className={inputStyle} {...register(name, options)} />
      <Typography.Span2
        className={`${helperText && 'invisible'} mt-[8px] block text-point`}
      >
        {helperText || '&nbsp'}
      </Typography.Span2>
    </Container>
  );
}

TextField.defaultProps = { containerStyle: '', inputStyle: '' };
