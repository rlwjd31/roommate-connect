import { useRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import SignUpProfileStepTitleTemplate from '@/components/templates/SignUpProfileStepTitle.template';
import Typography from '@/components/atoms/Typography';
import BadgeButton from '@/components/molecules/BadgeButton';
import { SignupProfileStateSelector } from '@/stores/sign.store';
import LabelDualInputRange from '@/components/organisms/LabelDualInputRange';
import DistrictSelector from '@/components/organisms/districtSelector/DistrictSelector';
import { SelectorItemValueType } from '@/types/regionDistrict.type';

export default function SignUpProfile1_2Template() {
  const [regions, setRegions] = useRecoilState(
    SignupProfileStateSelector('regions'),
  );
  const [term, setTerm] = useRecoilState(SignupProfileStateSelector('term'));

  const onClickSelectFinish = (
    region: SelectorItemValueType<'지역'>,
    district: SelectorItemValueType<'시, 구'>,
  ) => setRegions(prev => [...prev, `${region} ${district}`]);

  return (
    <Container.FlexCol className="min-w-full px-2">
      <Container.FlexCol>
        <SignUpProfileStepTitleTemplate step="1-2" title="내가 찾는 집은..." />
        <Typography.SubTitle1 className="text-brown">위치</Typography.SubTitle1>
        <Container.FlexCol className="mb-[4.25rem] gap-y-9">
          <Container.FlexRow className="mt-11 gap-x-6">
            {regions?.map(location => (
              <BadgeButton.Fill
                key={location}
                className="gap-x-5 rounded-[30px] p-4"
                iconType="close"
                stroke="bg"
              >
                <Typography.P1>{location}</Typography.P1>
              </BadgeButton.Fill>
            ))}
          </Container.FlexRow>
          <DistrictSelector onSelectRegion={onClickSelectFinish} />
        </Container.FlexCol>
        <Container.FlexCol>
          <Typography.SubTitle1 className="mb-11 text-brown">
            기간
          </Typography.SubTitle1>
          <LabelDualInputRange
            className="w-[480px]"
            min={0}
            max={24}
            step={1}
            setRangeValue={setTerm}
            rangeValue={term}
            category="term"
          />
        </Container.FlexCol>
      </Container.FlexCol>
    </Container.FlexCol>
  );
}
