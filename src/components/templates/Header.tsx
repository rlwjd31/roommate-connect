import { ComponentProps, useState } from 'react';
import { useRecoilValue } from 'recoil';

import routePaths from '@/constants/routePaths';
import Container from '@/components/atoms/Container';
import Icon from '@/components/atoms/Icon';
import Link from '@/components/atoms/Link';
import cn from '@/libs/cn';
import { UserAtom } from '@/stores/auth.store';
import { GNB, UserMenu } from '@/components/organisms/header';

type Props = ComponentProps<'header'> & {
  className?: string;
  isLogin: boolean;
  exist: {
    logo?: boolean;
    gnb?: boolean;
    userMenu?: boolean;
  };
};

export default function Header({
  className,
  isLogin,
  exist,
  ...others
}: Props) {
  // ! TODO: 알람기능 추가시 바꿔야 함
  const [hasNewAlarm] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isUserMenuActive, _setIsUserMenuActive] = useState(false);
  const user = useRecoilValue(UserAtom);

  return (
    <header className={cn('top-0 left-0 bg-bg', className)} {...others}>
      <Container.FlexRow className="mx-auto w-full max-w-[79rem] items-center justify-between px-8">
        {exist.logo && (
          <Link to={routePaths.root}>
            <Icon type="logo" className="h-[3rem] w-[5.9375rem]" />
          </Link>
        )}

        {exist.gnb && <GNB />}
        {exist.userMenu && (
          <UserMenu
            user={user}
            isLogin={isLogin}
            hasNewAlarm={hasNewAlarm}
            isUserMenuActive={isUserMenuActive}
          />
        )}
      </Container.FlexRow>
    </header>
  );
}

Header.defaultProps = {
  className: '',
};
