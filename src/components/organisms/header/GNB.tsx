import { ComponentProps } from 'react';
import { NavLink } from 'react-router-dom';

import Container from '@/components/atoms/Container';
import Typography from '@/components/atoms/Typography';
import cn from '@/libs/cn';

type GNBProps = ComponentProps<'div'>;

// chats, lounge, house와 같은 NavLink를 관장하는 component
export default function GNB({ className }: GNBProps) {
  const navItems = [
    { name: 'chats', path: '/chats' },
    { name: 'lounge', path: '/lounge' },
    { name: 'house', path: '/house' },
  ];

  return (
    <Container.FlexRow className={cn('gap-9', className)}>
      {navItems.map(({ name, path }) => (
        <NavLink
          key={name}
          to={path}
          className={({ isActive }) =>
            cn('cursor-pointer', isActive ? 'text-brown' : 'text-brown2')
          }
        >
          <Typography.SpanMid1
            lang="en"
            className="text-[0.9375rem] font-semibold uppercase tracking-widest hover:text-brown1"
          >
            {name}
          </Typography.SpanMid1>
        </NavLink>
      ))}
    </Container.FlexRow>
  );
}
