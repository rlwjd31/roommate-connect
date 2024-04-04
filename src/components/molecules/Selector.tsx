import { ComponentProps } from 'react';
import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SelectorItem from '@/components/atoms/SelectorItem';
import cn from '@/libs/cn';
import IconButton from '@/components/molecules/IconButton';
import { SelectorState } from '@/stores/states/districtSelector.store';
import {
  SelectorContentsType,
  SelectorItemValueType,
  SelectorLabelType,
} from '@/types/regionDistrict.type';

type SelectorProps<Label extends SelectorLabelType> =
  ComponentProps<'button'> & {
    label: Label;
    contents: SelectorContentsType<Label>;
  };

const selectorContainerStyle =
  'relative w-full items-center justify-between text-brown';
export default function Selector<Label extends SelectorLabelType>({
  label,
  contents,
  className,
}: SelectorProps<Label>) {
  const [{ value, isOpen }, setSelectorState] = useRecoilState(
    SelectorState(label),
  );

  const onClickSelectorItem = (content: SelectorItemValueType<Label>) => {
    setSelectorState(prev => ({ ...prev, value: content, isOpen: false }));
  };

  return (
    <Container.FlexCol className={cn(selectorContainerStyle, className ?? '')}>
      <IconButton
        iconType="expand-arrow"
        button="Ghost"
        onClick={() =>
          setSelectorState(prev => ({ ...prev, isOpen: !prev.isOpen }))
        }
        className="flex w-full items-center justify-between border border-brown bg-bg p-5 text-brown"
      >
        {value}
      </IconButton>
      {isOpen && (
        <Container.FlexCol className="absolute left-0 top-full z-10 max-h-56 w-full overflow-scroll border-x border-b border-brown text-brown5">
          {contents?.map(content => (
            <SelectorItem
              onClick={() =>
                onClickSelectorItem(content as SelectorItemValueType<Label>)
              }
              key={content}
              className={content === value ? 'bg-brown3' : ''}
            >
              {content}
            </SelectorItem>
          ))}
        </Container.FlexCol>
      )}
    </Container.FlexCol>
  );
}
