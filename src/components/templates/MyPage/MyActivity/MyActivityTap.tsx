import { useState } from 'react';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';

export default function MyActivityTap() {
  const [currentTab, setCurrentTab] = useState(0);
  const tabItem = [
    { name: '내가 쓴 게시글', content: '서비스 준비 중입니다.' },
    { name: '내가 쓴 댓글', content: '서비스 준비 중입니다.' },
  ];

  return (
    <>
      <Container.FlexRow className="mb-3">
        {tabItem.map((item, index) => (
          <Button.Ghost
            key={item.name}
            className={`h-14 w-[11.25rem] items-center justify-center border-b-brown text-brown2 ${currentTab === index ? 'border-b-3 text-brown' : ''}`}
            onClick={() => setCurrentTab(index)}
          >
            <Typography.SubTitle1>{item.name}</Typography.SubTitle1>
          </Button.Ghost>
        ))}
      </Container.FlexRow>
      <Container.FlexCol>
        <Typography.SubTitle1 className="border-b-[0.5px] border-brown py-[1.5625rem] pl-5 text-brown">
          {tabItem[currentTab].content}
        </Typography.SubTitle1>
      </Container.FlexCol>
    </>
  );
}
