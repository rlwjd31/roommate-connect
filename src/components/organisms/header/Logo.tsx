import { ComponentProps } from 'react';
import { Link } from 'react-router-dom';

import Icon from '@/components/atoms/Icon';
import cn from '@/libs/cn';

type LogoProps = ComponentProps<typeof Link> & {
  linkStyle?: string;
  iconStyle?: string;
};

export default function Logo({ linkStyle, iconStyle, ...others }: LogoProps) {
  return (
    <Link className={linkStyle} {...others}>
      <Icon type="logo" className={cn('h-[3rem] w-[5.9375rem]', iconStyle)} />
    </Link>
  );
}

Logo.defaultProps = {
  linkStyle: '',
  iconStyle: '',
};
