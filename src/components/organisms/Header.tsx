import { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import IconButton from '@/components/molecules/IconButton';
import { UserAtom } from '@/stores/auth.store';
import Img from '@/components/atoms/Img';
import { UserType } from '@/types/auth.type';
import Divider from '@/components/atoms/Divider';

type Props = ComponentProps<'header'> & {
  className?: string;
  isLogin: boolean;
};

type GNBProps = ComponentProps<'div'> & {
  navItems: { name: string; path: string }[];
};

type UserMenuProps = ComponentProps<'div'> & {
  user: UserType | null;
  isLogin: boolean;
};

function GNB({ navItems, className }: GNBProps) {
  return (
    <Container.FlexRow className={cn('gap-9', className)}>
      {navItems.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            !isActive ? 'text-brown2' : 'text-brown'
          }
        >
          <Typography.SpanMid1 className="text-[0.9375rem] font-semibold uppercase tracking-widest hover:text-brown1">
            {name}
          </Typography.SpanMid1>
        </NavLink>
      ))}
    </Container.FlexRow>
  );
}

function UserMenu({ user, className, isLogin }: UserMenuProps) {
  return (
    <Container.FlexRow
      className={cn('items-center justify-between gap-7', className)}
    >
      {isLogin && (
        <>
          <IconButton button="Ghost" iconType="alarm-exist" />
          {user?.avatar ? (
            <Img
              className="size-10 shrink-0 cursor-pointer rounded-full bg-transparent"
              src={user.avatar}
            />
          ) : (
            <IconButton button="Ghost" iconType="avatar" />
          )}
        </>
      )}
      {!isLogin && (
        <Container.FlexRow className="items-center gap-4">
          <Typography.SpanMid1 className="cursor-pointer text-[0.9375rem] font-semibold uppercase tracking-widest text-brown hover:text-brown1">
            login
          </Typography.SpanMid1>
          <Divider.Col className="self-stretch border-[0.75px] border-brown2" />
          <Typography.SpanMid1 className="cursor-pointer text-[0.9375rem] font-semibold uppercase tracking-widest text-brown hover:text-brown1">
            SIGN UP
          </Typography.SpanMid1>
        </Container.FlexRow>
      )}
    </Container.FlexRow>
  );
}
export default function Header({ className, isLogin, ...others }: Props) {
  const user = useRecoilValue(UserAtom);
  const navItems = [
    { name: 'chats', path: '/chats' },
    { name: 'lounge', path: '/lounge' },
    { name: 'house', path: '/house' },
  ];

  return (
    <header className="fixed left-0 top-0 z-50 w-screen bg-bg" {...others}>
      <Container.FlexRow className="mx-auto w-full max-w-[1200px] items-center justify-between px-8">
        <Link to="/">
          <Icon type="logo" />
        </Link>
        {/* nav Items(chats, lounge, house) */}
        <GNB navItems={navItems} />
        {/* about user account(realtime alert & user avatar) */}
        <UserMenu user={user} isLogin={isLogin} />
      </Container.FlexRow>
    </header>
  );
}

Header.defaultProps = {
  className: '',
};
