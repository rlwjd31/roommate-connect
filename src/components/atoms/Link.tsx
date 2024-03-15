import { Link as RouterLink, LinkProps } from 'react-router-dom';

export default function Link(props: LinkProps) {
  const { children, className, ...others } = props;
  return (
    <RouterLink className={`text-brown ${className || ''}`} {...others}>
      {children}
    </RouterLink>
  );
}
