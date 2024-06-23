import { memo } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './navigation.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { IBONavLink } from './common';


interface NavigationLinkProps {
  item: IBONavLink;
  sub?: boolean;
}

const NavigationLink: FC<NavigationLinkProps> = (
  {
    item,
    sub,
  }
) => {
  const { pathname } = useLocation();

  return (
    <Link
      key={item.title}
      to={item.path}
      className={clsx(
        s.link,
        sub && s.sub,
        pathname.toLowerCase() === item.path && s.active,
      )}
    >
      {item.title}
    </Link>
  );
};

const _NavigationLink = memo(NavigationLink);

export {
  _NavigationLink as NavigationLink,
};