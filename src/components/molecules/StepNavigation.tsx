import { ComponentProps } from 'react';

import Container from '@/components/atoms/Container';
import StepLink from '@/components/atoms/StepLink';
import cn from '@/libs/cn';

type Props = ComponentProps<'div'> & {
  contents: {
    labelName: string;
    isActive: boolean;
  }[];
};

export default function StepNavigation({ contents, className }: Props) {
  return (
    <Container.FlexCol
      className={cn('relative w-fit justify-between', className)}
    >
      {contents.map(({ labelName, isActive }) => (
        <StepLink key={labelName} labelName={labelName} isActive={isActive} />
      ))}
    </Container.FlexCol>
  );
}
