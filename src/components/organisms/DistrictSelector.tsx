import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect } from 'react';

import Container from '@/components/atoms/Container';
import Selector from '@/components/molecules/Selector';
import { district, region } from '@/constants/regions';
import { SelectorState, State } from '@/stores/states/districtSelector.store';
import { DistrictKeyType } from '@/types/regionDistrict.type';

export default function DistrictSelector() {
  const [{ value: regionValue, isOpen: regionIsOpen }, setRegionState] =
    useRecoilState<State<'지역'>>(SelectorState('지역'));
  const [{ value: districtValue, isOpen: districtIsOpen }, setDistrictState] =
    useRecoilState<State<'시, 구'>>(SelectorState('시, 구'));

  useEffect(() => {
    if (regionValue !== '지역') {
      setRegionState(prev => ({ ...prev, isOpen: true }));
      setDistrictState(prev => ({ ...prev, isOpen: true }));
    } else if (districtValue !== '시, 구') {
      setRegionState(prev => ({ ...prev, isOpen: false }));
      setDistrictState(prev => ({ ...prev, isOpen: false }));
    }
    console.log('in useEffect');
  }, [regionValue, districtValue, setDistrictState, setRegionState]);

  return (
    <Container.FlexRow>
      <Selector<'지역'> className="max-w-28" contents={region} label="지역" />
      <Selector<'시, 구'>
        className="max-w-48 translate-x-[-1px] [&_div>li>button]:justify-start"
        contents={district[regionValue as DistrictKeyType] ?? []}
        label="시, 구"
      />
    </Container.FlexRow>
  );
}
