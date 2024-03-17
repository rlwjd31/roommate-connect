import { ComponentProps } from 'react';

export type InputProps = ComponentProps<'input'>;

export default function Input(props: InputProps) {
  const { className, ...other } = props;
  return (
    <input
      className={`block h-14 w-full rounded-lg border-[1px] border-solid border-brown p-[16px] focus:outline-none focus:ring-1 focus:ring-brown2 ${className || ''}`}
      {...other}
    />
  );
}
