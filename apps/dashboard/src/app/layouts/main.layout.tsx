import type { FC, PropsWithChildren } from 'react';
import s from './main-layout.module.scss';
import clsx from 'clsx';
import { Navigation } from './navigation';


export const MainLayout: FC<PropsWithChildren> = (
  {
    children,
  }
) => {
  return (
    <>
      <Navigation />
      <main
        className={clsx(
          s.main,
          'styled-scroll',
          'styled-scroll--vertical',
        )}
      >
        {children}
      </main>
    </>
  );
};
