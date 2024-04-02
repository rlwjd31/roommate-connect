import { ComponentProps, useState } from 'react';

import Container from '@/components/atoms/Container';
import SelectorItem from '@/components/atoms/SelectorItem';
import cn from '@/libs/cn';
import IconButton from '@/components/molecules/IconButton';

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
    <Container.FlexCol className={cn(dropdownContainerStyle, className ?? '')}>
      <IconButton
        iconType="expand-arrow"
        button="Ghost"
        onClick={onClickDropdownOpen}
        className="flex w-full items-center justify-between border border-brown bg-bg p-5 text-brown"
      >
        {currentValue}
      </IconButton>
      {isOpen && (
        <Container.FlexCol className="absolute left-0 top-full z-10 max-h-56 w-full overflow-scroll border-x border-b border-brown text-brown5">
          {contents.map(content => (
            <SelectorItem
              onClick={() => onClickDropdownItem(content)}
              key={content}
              className={content === currentValue ? 'bg-brown3' : ''}
            >
              {content}
            </SelectorItem>
          ))}
        </Container.FlexCol>
      )}
    </Container.FlexCol>
  );
}
