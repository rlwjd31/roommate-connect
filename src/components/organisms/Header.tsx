import { ComponentProps } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import IconButton from '@/components/molecules/IconButton';
import { UserAtom } from '@/stores/auth.store';
import Img from '@/components/atoms/Img';
import { supabase } from '@/libs/supabaseClient';

type Props = ComponentProps<'header'> & {
  className?: string;
  isLogin: boolean;
};

function GNB() {}
export default function Header({ className, isLogin, ...others }: Props) {
  const user = useRecoilValue(UserAtom);
  const navItems = [
    { name: 'chats', path: '/chats' },
    { name: 'lounge', path: '/lounge' },
    { name: 'house', path: '/house' },
  ];
  const location = useLocation();

  return (
    <header className="fixed left-0 top-0 z-50 w-screen bg-bg" {...others}>
      <Container.FlexRow className="mx-auto w-full max-w-[1200px] items-center justify-between px-8">
        <Link to="/">
          <Icon type="logo" />
        </Link>
        {isLogin && (
          <>
            {/* nav Items(chats, lounge, house) */}
            <Container.FlexRow className="gap-9">
              {navItems.map(({ name, path }) => (
                <NavLink
                  key={name}
                  to={path}
                  className={({ isActive }) =>
                    !isActive ? 'text-brown2' : 'text-brown'
                  }
                >
                  <Typography.SpanMid1
                    className={cn(
                      'text-[0.9375rem] font-semibold uppercase tracking-widest hover:text-brown1',
                    )}
                  >
                    {name}
                  </Typography.SpanMid1>
                </NavLink>
              ))}
            </Container.FlexRow>
            {/* about user account(realtime alert & user avatar) */}
            <Container.FlexRow className="items-center justify-between gap-7">
              {/* Alert */}
              <IconButton button="Ghost" iconType="alarm-exist" />
              {/* Avatar depending on is user login now */}

              <Img
                className="size-10 shrink-0 cursor-pointer rounded-full bg-transparent"
                src={user?.avatar}
              />
            </Container.FlexRow>
          </>
        )}
        {/* TODO: 로그인 한 상태가 아닐 시 sign/in page로 navigate할 수단을 강구해야 됨.(아래는 임시 대안책) */}
        {!isLogin && (
          <IconButton
            button="Ghost"
            iconType="avatar"
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) console.error(error.message);
            }}
          />
        )}
      </Container.FlexRow>
    </header>
  );
}

Header.defaultProps = {
  className: '',
};

// - 하우스 등록
// - 내 북마크
// - 마이 페이지 -> account
