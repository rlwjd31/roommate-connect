import { useEffect } from 'react';

type LoadingType = {
  delayTime: number;
  setIsDelaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Loading({ delayTime, setIsDelaying }: LoadingType) {
  useEffect(() => {
    let sleep: number | undefined;

    if (delayTime) {
      sleep = window.setTimeout(() => {
        setIsDelaying(false);
      }, delayTime);
    }

    return () => {
      if (sleep) clearTimeout(sleep);
    };
  }, []);

  return (
    // ! TODO: Loading Page Figma나오면 작업 들어가기
    <div className="flex h-screen items-center justify-center bg-green-500 text-2xl text-white">
      Redirect to Login Page...
    </div>
  );
}
