import type { FC, PropsWithChildren } from 'react';
import { EclipseLoader } from './eclipse-loader';
import clsx from 'clsx';
import { DEFAULT_ERROR_PHRASE } from '@lib/helper';


export type TContentLoaderModifier = 'medium';

interface ContentLoaderProps {
  isLoading: boolean;
  modifiers?: TContentLoaderModifier[];
  isError?: boolean;
  errorText?: string;
}

export const ContentLoader: FC<PropsWithChildren<ContentLoaderProps>> = (
  {
    isLoading,
    modifiers,
    isError,
    errorText,
    children,
  }
) => {
  return isLoading ? (
    <div
      className={clsx(
        'loader-wrapper',
        ...(modifiers || []).map((mod) => `loader-wrapper--${mod}`),
      )}
    >
      <EclipseLoader />
    </div>
  ) : isError ? (
    <div className="no-data-text">
      {errorText || DEFAULT_ERROR_PHRASE}
    </div>
  ) : (
    <>
      {children}
    </>
  );
};
