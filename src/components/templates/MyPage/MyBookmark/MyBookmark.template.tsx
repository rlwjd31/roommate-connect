import { Dispatch, SetStateAction } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Container from '@/components/atoms/Container';
import Button from '@/components/atoms/Button';
import Typography from '@/components/atoms/Typography';
import MyBookmarkHouseTemplate from '@/components/templates/MyPage/MyBookmark/MyBookmarkHouse.template';
import MyBookmarkLoungeTemplate from '@/components/templates/MyPage/MyBookmark/MyBookmarkLounge.template';
import MyBookmarkArticleTemplate from '@/components/templates/MyPage/MyBookmark/MyBookmarkArticle.template';
import { HouseBookmarkType } from '@/hooks/useMyBookmark';
import Pagination from '@/components/organisms/Pagination';
import {
  BookmarkCurrentTabAtom,
  BookmarkPageAtom,
} from '@/stores/bookmark.store';

type MyBookmarkTemplateProps = {
  house: HouseBookmarkType[];
  houseCount: number;
  pageState: [number, Dispatch<SetStateAction<number>>];
};

export default function MyBookmarkTemplate(props: MyBookmarkTemplateProps) {
  const { house, houseCount, pageState } = props;
  const setCurrentPage = useSetRecoilState(BookmarkPageAtom);
  const [currentTab, setCurrentTab] = useRecoilState(BookmarkCurrentTabAtom);
  const tabItem = ['하우스', '라운지', '게시물'];
  return (
    <Container.FlexCol>
      <Container.FlexRow>
        {tabItem.map((item, index) => (
          <Button.Ghost
            key={item}
            className={`h-14 w-[6.75rem] items-center justify-center border-b-brown text-brown2 ${currentTab === index ? 'border-b-3 text-brown' : ''}`}
            onClick={() => {
              setCurrentTab(index);
              setCurrentPage(1);
            }}
          >
            <Typography.SubTitle1>{item}</Typography.SubTitle1>
          </Button.Ghost>
        ))}
      </Container.FlexRow>
      {currentTab === 0 && <MyBookmarkHouseTemplate house={house} />}
      {currentTab === 1 && <MyBookmarkLoungeTemplate />}
      {currentTab === 2 && <MyBookmarkArticleTemplate />}
      <Container className="mt-[7.5rem]">
        <Pagination totalPage={houseCount} pageState={pageState} />
      </Container>
    </Container.FlexCol>
  );
}
