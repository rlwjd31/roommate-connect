import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import Icon from '@/components/atoms/Icon';
import cn from '@/libs/cn';
import { routePaths } from '@/constants/route';

type LogoProps = ComponentProps<typeof Link> & {
  linkStyle?: string;
  iconStyle?: string;
};

export default function Logo({
  linkStyle,
  iconStyle,
  to,
  ...others
}: LogoProps) {
  return (
    <Link to={to || routePaths.root} className={linkStyle} {...others}>
      <Icon type="logo" className={cn('h-[3rem] w-[5.9375rem]', iconStyle)} />
    </Link>
  );
}

Logo.defaultProps = {
  linkStyle: '',
  iconStyle: '',
};
