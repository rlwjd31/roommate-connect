import { ComponentProps } from 'react';
import { useLocation } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Link from '@/components/atoms/Link';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';
import IconButton from '@/components/molecules/IconButton';

type Props = ComponentProps<'header'> & {
  className?: string;
  isLogin: boolean;
};

export default function Header({ className, isLogin, ...others }: Props) {
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
            <Container.FlexRow className="gap-9">
              {navItems.map(({ name, path }) => (
                <Link key={name} to={path}>
                  <Typography.SpanMid1
                    className={cn(
                      'text-[0.9375rem] font-semibold uppercase tracking-widest hover:text-brown1',
                      location.pathname !== path && 'text-brown2',
                    )}
                  >
                    {name}
                  </Typography.SpanMid1>
                </Link>
              ))}
            </Container.FlexRow>
            <Container.FlexRow className="items-center justify-between gap-7">
              <IconButton button="Ghost" iconType="alarm-exist" />
              <IconButton button="Ghost" iconType="avartar" />
            </Container.FlexRow>
          </>
        )}
      </Container.FlexRow>
    </header>
  );
}

Header.defaultProps = {
  className: '',
};
