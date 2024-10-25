const getRedirectURL = () => {
  let prodURL: string =
    import.meta.env.VITE_PRODUCTION_URL ??
    import.meta.env.VITE_VERCEL_URL ??
    'http://localhost:3000';

  const devURL = import.meta.env.VITE_DEVELOPMENT_URL.endsWith('/')
    ? import.meta.env.VITE_DEVELOPMENT_URL
    : import.meta.env.VITE_DEVELOPMENT_URL.concat('/');

  prodURL = prodURL.startsWith('http') ? prodURL : `https://${prodURL}`;
  prodURL = prodURL.endsWith('/') ? prodURL : `${prodURL}/`;

  // FIXME: devURL을 추가할 시 배포환경에서 useSignInSocial에서 errorr가 발생
  return { prodURL, devURL };
};

export default getRedirectURL;
