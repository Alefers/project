import { memo, Fragment } from 'react';
import type { FC } from 'react';
import s from './page-tabs.module.scss';
import clsx from 'clsx';
import { UiPageTab } from '@lib/helper';


interface PageTabsProps {
  current: number;
  tabsMap: UiPageTab[];
  setTab: (val: number) => void;
}

const PageTabs: FC<PageTabsProps> = (
  {
    current,
    tabsMap,
    setTab,
  }
) => {
  return (
    <div className={s.pageTabs}>
      {tabsMap.map((tab) => (
        <Fragment key={tab.value}>
          {!tab.disabled && (
            <div
              className={clsx(
                s.tab,
                tab.value === current && s.active,
              )}
              onClick={() => setTab(tab.value)}
            >
              {tab.label}
              {tab.sub && (
                <span>[{tab.sub}]</span>
              )}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
};

const _PageTabs = memo(PageTabs);

export {
  _PageTabs as PageTabs,
};