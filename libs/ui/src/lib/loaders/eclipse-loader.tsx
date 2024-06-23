import type { FC } from 'react';
import clsx from 'clsx';


interface EclipseLoaderProps {
  small?: boolean;
}

export const EclipseLoader: FC<EclipseLoaderProps> = (
  {
    small,
  }
) => {
  return (
    <div
      className={clsx(
        'eclipse-loader',
        'base-loader',
        small && 'eclipse-loader--small'
      )}
    >
      <div/>
    </div>
  );
};
