import { ComponentProps } from 'react';

import cls from '@/libs/cls';

export type SelectOptionElement = {
  value: string;
  content: string;
};

export type SelectOptions = {
  options: SelectOptionElement[];
};

type SelectorProps = ComponentProps<'select'> & SelectOptions;

const selectorStyle = 'border border-brown text-P2 text-brown';

export default function Selector({
  options,
  name,
  className,
  id: selectId,
}: SelectorProps) {
  return (
    <select name={name} id={selectId} className={cls(selectorStyle, className)}>
      <option selected hidden>
        지역
      </option>
      {options.map(({ value, content }) => (
        <option className="hover:bg-brown3" key={value} value={value}>
          {content}
        </option>
      ))}
    </select>
  );
}
