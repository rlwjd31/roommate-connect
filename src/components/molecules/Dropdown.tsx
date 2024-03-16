import { ComponentProps, useState } from 'react';

import ChevronDown from '@/assets/icons/ChevronDown.svg?react';
import Container from '@/components/atoms/Container';
import DropdownItem from '@/components/atoms/DropdownItem';
import cls from '@/libs/cls';

type DropdownProps = ComponentProps<'button'> & {
  label: string;
  contents: string[];
};

const dropdownContainerStyle =
  'relative w-full items-center justify-between text-brown';

export default function Dropdown({
  label,
  contents,
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(label);

  const onClickDropdownOpen = () => setIsOpen(prev => !prev);
  const onClickDropdownItem = (content: string) => {
    setCurrentValue(content);
    onClickDropdownOpen();
    setIsOpen(false);
  };

  return (
    <Container.FlexCol className={cls(dropdownContainerStyle, className ?? '')}>
      {/* TODO: IconButton으로 대체 */}
      <button
        type="button"
        className="flex w-full items-center justify-between border border-brown p-5 text-brown"
        onClick={onClickDropdownOpen}
      >
        {/* TODO: <ChevronDown /> Icon atom Component로 대체 */}
        {currentValue} <ChevronDown />
      </button>
      {isOpen && (
        <Container.FlexCol className="absolute left-0 top-full max-h-56 w-full overflow-scroll border-x border-b border-brown text-brown5">
          {contents.map(content => (
            <DropdownItem
              onClick={() => onClickDropdownItem(content)}
              key={content}
              className={cls(content === currentValue ? 'bg-brown3' : '')}
            >
              {content}
            </DropdownItem>
          ))}
        </Container.FlexCol>
      )}
    </Container.FlexCol>
  );
}
