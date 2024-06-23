import { CSSProperties, FC, memo, PropsWithChildren } from 'react';
import { generateWebpPath, getWebpSupport } from '@lib/helper';


interface LazyBackgroundProps {
  path: string;
  cn?: string;
  style?: CSSProperties;
}

const LazyBackground: FC<PropsWithChildren<LazyBackgroundProps>> = (
  {
    children,
    path,
    cn,
    style = {},
  }
) => {
  return (
    <div
      className={cn}
      style={{
        ...style,
        backgroundImage: `url(${generateWebpPath(path, getWebpSupport())})`,
      }}
    >
      {children}
    </div>
  );
}

const _LazyBackground = memo(LazyBackground);

export {
  _LazyBackground as LazyBackground,
};
