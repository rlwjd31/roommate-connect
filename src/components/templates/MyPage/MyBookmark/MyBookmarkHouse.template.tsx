import { KeyboardEvent } from 'react';
import { useSetRecoilState } from 'recoil';

import { HouseBookmarkType } from '@/hooks/useMyBookmark';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import Icon from '@/components/atoms/Icon';
import Input from '@/components/atoms/Input';
import { BookmarkHouseFilterAtom } from '@/stores/bookmark.store';
import HouseCard from '@/components/organisms/HouseCard';

type MyBookmarkHouseTemplateProps = {
  house: HouseBookmarkType[] | undefined;
};

function MyBookmarkHouseTemplate({ house }: MyBookmarkHouseTemplateProps) {
  const setHouseFilter = useSetRecoilState(BookmarkHouseFilterAtom);

  const onEnterSearchFilter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      setHouseFilter(e.currentTarget.value);
    }
  };

  console.log(house);
  return (
    <Container.FlexCol>
      <Container.FlexRow className="relative">
        <Icon className="absolute left-4 top-14" type="search" />
        <Input
          className="mt-10 w-full border-none !bg-brown4 pl-14 text-brown placeholder:text-brown2"
          placeholder="위치 검색"
          onKeyDown={onEnterSearchFilter}
        />
      </Container.FlexRow>
      <Container.Grid className="grid-cols-[320px_320px_320px] gap-x-[1.125rem] gap-y-10 pt-10">
        {house?.length && house[0].house ? (
          house.map(({ house: houseData }) => (
            <HouseCard key={houseData.id} {...houseData} />
          ))
        ) : (
          <Typography.P2 className="text-brown2">
            북마크 된 하우스가 없습니다.
          </Typography.P2>
        )}
      </Container.Grid>
    </Container.FlexCol>
  );
}

export default MyBookmarkHouseTemplate;
