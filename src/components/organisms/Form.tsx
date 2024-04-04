import { ReactNode } from 'react';
import { useForm, FieldValues } from 'react-hook-form';

type FormProps = {
  children: ReactNode;
  className?: string;
  onSubmit: (data: FieldValues) => void;
};

export default function Form({ children, className, onSubmit }: FormProps) {
  const { handleSubmit } = useForm();

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  );
}

Form.defaultProps = { className: '' };
