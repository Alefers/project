import { memo } from 'react';
import type { FC } from 'react';
import { usePreloadCommonData } from '../hooks';


interface CommonDataPreloaderProps {
  readyToLoad: boolean;
}

const CommonDataPreloader: FC<CommonDataPreloaderProps> = (
  {
    readyToLoad,
  }
) => {
  usePreloadCommonData({
    readyToLoad,
  });

  return (
    <></>
  );
};

const _CommonDataPreloader = memo(CommonDataPreloader);

export {
  _CommonDataPreloader as CommonDataPreloader,
};
