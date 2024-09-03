import { matchPath } from 'react-router-dom';

import { routePaths } from '@/constants/route';

const isRoutePathMatched = (
  currentRoutePath: string,
  routePath: keyof typeof routePaths,
) => {
  if (typeof routePaths[routePath] === 'function')
    // * react router dom matchPath API는 path가 일치한다면 객체를 반환하고 일치하지 않는다면 null을 반환한다.
    return !!matchPath(routePaths[routePath](), currentRoutePath);
  if (typeof routePaths[routePath] === 'string')
    return !!matchPath(routePaths[routePath], currentRoutePath);

  return false;
};

export default isRoutePathMatched;
