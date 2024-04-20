import DualInputRange, {
  DualInputRangeType,
} from '@/components/molecules/DualInputRange';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import unitConverters from '@/libs/generateUnit';

type LabelDualInputRangeProps = DualInputRangeType & {
  label?: string;
  category: 'price' | 'term';
};
export default function LabelDualInputRange(props: LabelDualInputRangeProps) {
  const { label, category, rangeValue, min, max, className, ...others } = props;
  const [rangeMinValue, rangeMaxValue] = [
    unitConverters[category](rangeValue[0], max),
    unitConverters[category](rangeValue[1], max),
  ];
  const [rangeMinRulerValue, rangeMidRulerValue, rangeMaxRulerValue] = [
    unitConverters[category](min, max),
    unitConverters[category](Math.floor((min + max) / 2), max),
    unitConverters[category](max, max),
  ];

  return (
    <Container.FlexCol className={className}>
      <Container.FlexRow className="mb-7 justify-between">
        {label && (
          <Typography.SubTitle2 className="text-brown">
            {label}
          </Typography.SubTitle2>
        )}
        <Typography.SubTitle2 className="text-brown">
          {rangeMinValue === rangeMaxValue
            ? rangeMinValue
            : `${rangeMinValue} ~ ${rangeMaxValue}`}
        </Typography.SubTitle2>
      </Container.FlexRow>
      <DualInputRange
        className="mb-2"
        min={min}
        max={max}
        rangeValue={rangeValue}
        {...others}
      />
      <Container.FlexRow className="justify-between">
        <Typography.Span1>{rangeMinRulerValue}</Typography.Span1>
        <Typography.Span1>{rangeMidRulerValue}</Typography.Span1>
        <Typography.Span1>{`${rangeMaxRulerValue} 이상`}</Typography.Span1>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}

LabelDualInputRange.defaultProps = {
  label: null,
};
