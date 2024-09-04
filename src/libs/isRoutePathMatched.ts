import { matchPath } from 'react-router-dom';

import { routePaths } from '@/constants/route';

const isRoutePathMatched = (
  currentRoutePath: string,
  routePath: keyof typeof routePaths | (keyof typeof routePaths)[],
) => {
  if (typeof routePath === 'string') {
    if (typeof routePaths[routePath] === 'function')
      // * react router dom matchPath API는 path가 일치한다면 객체를 반환하고 일치하지 않는다면 null을 반환한다.
      return !!matchPath(routePaths[routePath](), currentRoutePath);
    if (typeof routePaths[routePath] === 'string')
      return !!matchPath(routePaths[routePath], currentRoutePath);
  } else if (Array.isArray(routePath)) {
    let isMatched = false;

    // eslint-disable-next-line no-restricted-syntax
    for (const path of routePath) {
      if (typeof routePaths[path] === 'function')
        isMatched = isMatched || !!matchPath(routePaths[path](), currentRoutePath);
      if (typeof routePaths[path] === 'string')
        isMatched = isMatched || !!matchPath(routePaths[path], currentRoutePath);
    }

    return isMatched
  }

  return false;
};

export default isRoutePathMatched;
