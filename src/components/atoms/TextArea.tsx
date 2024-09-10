import { ComponentProps, forwardRef, HTMLProps } from 'react';

import cn from '@/libs/cn';

export type TextAreaProps = ComponentProps<'textarea'>;
const TextArea = forwardRef<
  HTMLTextAreaElement,
  HTMLProps<HTMLTextAreaElement>
>((props, ref) => {
  const { className, ...others } = props;
  const textAreaBaseStyle =
    'block w-full rounded-lg border-[0.0625rem] border-solid border-brown p-[16px] focus:outline-none placeholder:text-brown2 focus:ring-1 focus:ring-point focus:border-point ring-subColor2 bg-transparent';

  return (
    <textarea
      className={cn(textAreaBaseStyle, className || '')}
      ref={ref}
      {...others}
    />
  );
});

TextArea.displayName = 'TextArea';

export default TextArea;
