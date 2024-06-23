import { memo } from 'react';
import type { FC } from 'react';
import s from './navigation.module.scss';
import { BaseIBONavLink } from './common';
import { NavigationLink } from './navigation-link';
import { NavigationBlock } from './navigation-block';


interface NavigationItemProps {
  item: BaseIBONavLink;
}

const NavigationItem: FC<NavigationItemProps> = (
  {
    item,
  }
) => {
  return (
    <div className={s.item}>
      {!!item.items && (
        <NavigationBlock
          title={item.title}
          section={item.section}
          items={item.items}
        />
      )}
      {!!item.path && (
        <NavigationLink item={item} />
      )}
    </div>
  );
};

const _NavigationItem = memo(NavigationItem);

export {
  _NavigationItem as NavigationItem,
};