import { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;
export default function Button(props: ButtonProps) {
  const { children, ...others } = props;
  return (
    <button type="button" {...others}>
      {children}
    </button>
  );
}

Button.Fill = function ButtonFill(props: ButtonProps) {
  const { children, ...others } = props;
  return (
    <button className="bg-brown" type="button" {...others}>
      {children}
    </button>
  );
};
