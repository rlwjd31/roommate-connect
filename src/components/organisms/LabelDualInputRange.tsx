import DualInputRange, {
  DualInputRangeType,
} from '@/components/molecules/DualInputRange';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';

type LabelDualInputRangeProps = DualInputRangeType & {
  label?: string;
  category: 'price' | 'term';
};
export default function LabelDualInputRange(props: LabelDualInputRangeProps) {
  const { label, category, rangeValue, min, max, className, ...others } = props;
  const generateUnit = (value: number) => {
    if (category === 'price') {
      if (value === 0) return '0원';
      if (value >= 10000) return `${value / 10000}억원`;
      return `${value}만원`;
    }
    if (category === 'term') {
      const year = Math.floor(value / 12);
      const month = value % 12;
      if (value < 12) return `${month}개월`;
      if (value % 12 === 0) return `${year}년`;
      return `${year}년 ${month}개월`;
    }
    return value;
  };
  return (
    <Container.FlexCol className={className}>
      <Container.FlexRow className="mb-7 justify-between">
        {label && <Typography.SubTitle2>{label}</Typography.SubTitle2>}
        <Typography.SubTitle2>
          {rangeValue[0] === rangeValue[1]
            ? generateUnit(rangeValue[0])
            : `${generateUnit(rangeValue[0])} ~ ${generateUnit(rangeValue[1])}`}
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
        <Typography.Span1>{generateUnit(min)}</Typography.Span1>
        <Typography.Span1>{generateUnit((min + max) / 2)}</Typography.Span1>
        <Typography.Span1>{generateUnit(max)} 이상</Typography.Span1>
      </Container.FlexRow>
    </Container.FlexCol>
  );
}

LabelDualInputRange.defaultProps = {
  label: null,
};
