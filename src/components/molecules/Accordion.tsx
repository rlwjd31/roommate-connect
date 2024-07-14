import { useState } from 'react';

import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';

type AccordionProps = {
  title: string;
  guideline?: string;
  children: React.ReactNode;
  accordionButtonStyle?: string;
  titleStyle?: string;
  guideStyle?: string;
  openContainerStyle?: string;
};

export default function Accordion({
  accordionButtonStyle,
  title,
  titleStyle,
  guideline,
  guideStyle,
  children,
  openContainerStyle,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container.FlexCol className="w-full">
      <Button.Ghost onClick={toggleAccordion} className={accordionButtonStyle}>
        <Container.FlexRow className="items-center gap-3 pb-10">
          {isOpen ? (
            <Icon type="close-triangle" className="mb-1 mr-1" />
          ) : (
            <Icon type="open-triangle" className="mb-0.5 mr-1" />
          )}
          <Typography.SubTitle1 className={titleStyle}>
            {title}
          </Typography.SubTitle1>
          <Typography.Span1 className={guideStyle}>
            {guideline}
          </Typography.Span1>
        </Container.FlexRow>
      </Button.Ghost>
      {isOpen && (
        <Container.FlexCol className={openContainerStyle}>
          {children}
        </Container.FlexCol>
      )}
    </Container.FlexCol>
  );
}
