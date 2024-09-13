import { ComponentProps } from 'react';

import cn from '@/libs/cn';

export type LabelProps = ComponentProps<'label'>;

export default function Label(props: LabelProps) {
  const { htmlFor, className, children, ...others } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={cn('mb-2 block text-P3 text-brown1', className)}
      {...others}
    >
      {children}
    </label>
  );
}
