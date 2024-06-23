import { memo, useState } from 'react';
import type { FC } from 'react';
import s from './navigation.module.scss';
import { IBONavLink } from './common';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { NavigationLink } from './navigation-link';
import { SvgIcon, svgIconsMap } from '@lib/icons';


interface NavigationBlockProps {
  title: string;
  section: string;
  items: IBONavLink[];
}

const NavigationBlock: FC<NavigationBlockProps> = (
  {
    title,
    section,
    items,
  }
) => {
  const { pathname } = useLocation();

  const currentSection = pathname.startsWith(section);

  const [isOpen, setOpenState] = useState(currentSection);

  return (
    <>
      <div
        className={clsx(
          s.block,
          currentSection && s.active,
          isOpen && s.isOpen,
        )}
        onClick={() => setOpenState(!isOpen)}
      >
        <div className={s.title}>
          {title}
        </div>
        <SvgIcon
          className={s.arrow}
          icon={svgIconsMap.Arrow}
        />
      </div>
      {isOpen && (
        <div className={s.subLinks}>
          {items.map((item) => (
            <NavigationLink
              key={item.title}
              sub
              item={item}
            />
          ))}
        </div>
      )}
    </>
  );
};

const _NavigationBlock = memo(NavigationBlock);

export {
  _NavigationBlock as NavigationBlock,
};