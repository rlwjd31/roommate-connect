import React, { ComponentProps, ReactNode } from 'react';

import cn from '@/libs/cn';
/*
- xs; 40px
- s; 44px:
    - new notice dropdown
- m; 48px:
    - chatList Avatar
- l; 60px:
    - house detail page 댓글
- xl; 72px
    - RoomMate Application Status Modal
    - user dropdown
    - house detail page(69px로 되어있는데 72px은 Test해보고 괜찮으면 여기에 넣기)
- 2xl; 96px:
    - mypage 내활동
- 3xl; 128px:
    - mypage 내활동 → 계정설정 Avatar
*/
export type AvatarProps = ComponentProps<'img'> & { isActive?: boolean };
export type AvatarSizeType = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

type AvatarComponentProps = {
  [key in AvatarSizeType]: (props: AvatarProps) => ReactNode;
};

const AvatarSize: { size: AvatarSizeType; defaultClassName: string }[] = [
  {
    size: 'XS',
    defaultClassName: 'size-10',
  },
  {
    size: 'S',
    defaultClassName: 'size-11',
  },
  {
    size: 'M',
    defaultClassName: 'size-12',
  },
  {
    size: 'L',
    defaultClassName: 'size-[3.75rem]',
  },
  {
    size: 'XL',
    defaultClassName: 'size-[4.5rem]',
  },
  {
    size: 'XXL',
    defaultClassName: 'size-24',
  },
  {
    size: 'XXXL',
    defaultClassName: 'size-32',
  },
];

const Avatar = {} as AvatarComponentProps;
AvatarSize.forEach(({ size, defaultClassName }) => {
  Avatar[size] = ({
    children,
    className,
    isActive = false,
    ...others
  }: AvatarProps) =>
    React.createElement('img', {
      className: `${defaultClassName} ${cn('shadow-avatar shrink-0 cursor-pointer rounded-full', className, isActive && 'shadow-avatar-active')}`,
      ...others,
    });
});
export default Avatar;
