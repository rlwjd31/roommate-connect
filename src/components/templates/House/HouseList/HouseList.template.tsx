import { useEffect, useRef } from 'react';
import { ClipLoader } from 'react-spinners';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';

import Container from '@/components/atoms/Container';
import HouseCard from '@/components/organisms/HouseCard';
import HouseListFilter from '@/components/templates/House/HouseList/HouseListFilter';
import useIsOverSTabletBreakpoint from '@/hooks/useIsOverSTabletBreakpoint';
import { HouseCardType, HouseListPerPage } from '@/types/house.type';

export type HouseListTemplateProps = UseInfiniteQueryResult<
  InfiniteData<HouseListPerPage>
> & {
  houseList: HouseCardType[];
};

export default function HouseListTemplate({
  houseList,
  fetchNextPage,
  isFetching,
}: HouseListTemplateProps) {
  const observerTargetElement = useRef<HTMLDivElement>(null);
  const [isOverSTabletBreakPoint] = useIsOverSTabletBreakpoint();

  useEffect(() => {
    /**
     * * 1. root: 기본 값은 null로서 브라우저 viewport를 대상으로 지정
     * * 2. rootMargin
     * *  - 양수: root요소의 경계를 확장
     * *  - 음수: root요소의 경계를 확장
     * *  - E.g) '0px 0px 20px 0px'이라면 root요소의 아래쪽 경계에서 20px만큼 observer target과 교차하는 순간 callback실행
     * * 3. threshold
     * *  - 0: 타겟 요소와 교차하는 순간 callback실행
     * *  - 1: 타겟 요소와 모두 교차해야 callback실행
     */
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) fetchNextPage();
        });
      },
      {
        root: null,
        rootMargin: '10px',
        threshold: 0,
      },
    );
    if (observerTargetElement.current)
      observer.observe(observerTargetElement.current);

    const copyObserverTargetElement = observerTargetElement;

    return () => {
      if (copyObserverTargetElement.current) {
        observer.unobserve(copyObserverTargetElement.current);
      }
    };
  }, [fetchNextPage]);

  return (
    <Container.FlexCol>
      <HouseListFilter />
      <Container.Grid className="grid-cols-1 items-center justify-center gap-x-6 gap-y-10 px-8 pb-10 screen480:grid-cols-2 s-tablet:px-12 laptop:grid-cols-3 desktop:grid-cols-4 monitor:grid-cols-5">
        {houseList.map(item => item && <HouseCard key={item.id} {...item} />)}
      </Container.Grid>
      <div
        ref={observerTargetElement}
        className="flex h-12 w-full items-start justify-center text-white"
      >
        {isFetching && (
          <ClipLoader
            key="ClipLoaderOverSTablet"
            size={isOverSTabletBreakPoint ? 40 : 20}
            loading
            color="#643927"
          />
        )}
      </div>
    </Container.FlexCol>
  );
}
