import type { FC } from 'react';
import s from './navigation.module.scss';
import { boNavLinksMap } from './common';
import { NavigationItem } from './navigation-item';


export const Navigation: FC = () => {
  return (
    <div className={s.nav}>
      <div className={s.links}>
        {boNavLinksMap.map((item) => (
          <NavigationItem
            key={item.title}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
