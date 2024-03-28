import React from 'react';

import Container from '@/components/atoms/Container';
import IconButton from '@/components/molecules/IconButton';
import Typography from '@/components/atoms/Typography';

type SignProfileLayoutTemplateProps = {
  children: React.ReactNode;
};
export default function SignProfileLayoutTemplate(
  props: Readonly<SignProfileLayoutTemplateProps>,
) {
  const { children } = props;
  return (
    <Container.FlexRow className="max-h-[816px] grow justify-between pt-[41px]">
      {/* TODO Container To Stepper */}
      <Container className="w-[188px]">
        <span>Stepper </span>
      </Container>
      <Container.FlexCol className="justify-between">
        <Container className="w-[894px]">{children}</Container>
        <Container.FlexRow className="justify-end gap-x-3">
          {/* TODO right-arrow to left-arrow */}
          <IconButton.Outline
            className="flex-row-reverse gap-x-[10px] rounded-[32px] px-[30px] py-[15px]"
            iconType="right-arrow"
          >
            <Typography.P1>이전</Typography.P1>
          </IconButton.Outline>
          <IconButton.Fill
            className="gap-x-[10px] rounded-[32px] px-[30px] py-[15px]"
            iconType="right-arrow"
            stroke="bg"
          >
            <Typography.P1 className="text-bg">다음</Typography.P1>
          </IconButton.Fill>
        </Container.FlexRow>
      </Container.FlexCol>
    </Container.FlexRow>
  );
}
