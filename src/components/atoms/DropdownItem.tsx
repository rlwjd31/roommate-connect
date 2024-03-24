import { ComponentProps } from 'react';

import cn from '@/libs/cn';

type DropdownItemProps = ComponentProps<'li'>;

const dropdownItemStyle =
  'last:border-b-0 flex w-full cursor-pointer items-center justify-center border-b border-brown p-5 leading-4 text-brown hover:bg-brown3';

export default function DropdownItem({
  children,
  className,
  ...others
}: DropdownItemProps) {
  return (
    <li className={cn(dropdownItemStyle, className ?? '')} {...others}>
      {children}
    </li>
  );
}
