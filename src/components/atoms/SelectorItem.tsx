import { ComponentProps } from 'react';

import cn from '@/libs/cn';
import Button from '@/components/atoms/Button';

type DropdownItemProps = ComponentProps<'li'>;

const dropdownItemStyle =
  'last:border-b-0 flex w-full items-center justify-center border-b bg-bg border-brown text-brown hover:bg-brown3';

export default function DropdownItem({
  children,
  className = '',
  ...others
}: DropdownItemProps) {
  return (
    <li className={cn(dropdownItemStyle, className)} {...others}>
      <Button.Ghost className="w-full cursor-pointer justify-center bg-bg p-5">
        {children}
      </Button.Ghost>
    </li>
  );
}
