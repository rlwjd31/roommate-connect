export type InputProps = {
  id?: string;
  type: 'text' | 'number' | 'email' | 'password';
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  const { id, type, placeholder, value, onChange } = props;
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className=""
    />
  );
}
