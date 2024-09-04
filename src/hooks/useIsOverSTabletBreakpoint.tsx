import { useEffect, useState } from 'react';

export default function useIsOverSTabletBreakpoint() {
  const [isOverSTabletBreakPoint, setIsOverSTabletBreakPoint] = useState(
    window.innerWidth >= 576,
  );

  useEffect(() => {
    const onResizeScreenWidth = () => {
      // ! !isSTabletBreakPoint 조건식에 추가하지 않으면 window size가 변할 때마다 isMobile state가 변경되어 렌더링이 불필요하게 많이 일어남
      // ! 576 => s-tablet breakpoint(refer -> tailwind.config.ts)
      if (window.innerWidth >= 576 && !isOverSTabletBreakPoint) {
        setIsOverSTabletBreakPoint(true);
      } else if (window.innerWidth < 576 && isOverSTabletBreakPoint) {
        setIsOverSTabletBreakPoint(false);
      }
    };

    window.addEventListener('resize', onResizeScreenWidth);

    return () => window.removeEventListener('resize', onResizeScreenWidth);
  }, [isOverSTabletBreakPoint]);

  return [isOverSTabletBreakPoint, setIsOverSTabletBreakPoint] as const;
}
