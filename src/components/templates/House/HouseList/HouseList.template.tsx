import {  useRef } from 'react';
import { ClipLoader } from 'react-spinners';
import { UseInfiniteQueryResult } from '@tanstack/react-query';

import Container from '@/components/atoms/Container';
import HouseCard from '@/components/organisms/HouseCard';
import HouseListFilter from '@/components/templates/House/HouseList/HouseListFilter';
import { HouseCardType, HousePaginationType } from '@/types/house.type';
import useIsOverSTabletBreakpoint from '@/hooks/useIsOverSTabletBreakpoint';

export type HouseListTemplateProps = Omit<
  UseInfiniteQueryResult<HousePaginationType>,
  'data'
> & {
  houseList: HouseCardType[];
};

export default function HouseListTemplate(props: HouseListTemplateProps) {
  const { houseList } = props;
  const observerTargetElement = useRef<HTMLDivElement>(null);
  const [isOverSTabletBreakPoint] = useIsOverSTabletBreakpoint();

  return (
    <Container.FlexCol>
      <HouseListFilter />
      <Container.Grid className="grid-cols-1 items-center justify-center gap-x-6 gap-y-10 px-8 pb-10 screen480:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 monitor:grid-cols-5 [&>img]:object-contain">
        {houseList.map(item => item && <HouseCard key={item.id} {...item} />)}
      </Container.Grid>
      <div
        ref={observerTargetElement}
        className="flex h-12 w-full items-start justify-center text-white"
      >
        <ClipLoader
          key="ClipLoaderOverSTablet"
          size={isOverSTabletBreakPoint ? 40 : 20}
          // TODO: set value depending on fetching more house data or not
          loading
          color="#643927"
        />
      </div>
    </Container.FlexCol>
  );
}
