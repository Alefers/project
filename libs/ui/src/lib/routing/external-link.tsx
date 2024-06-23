import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';


interface ExternalLinkProps {
  href: string;
  className?: string;
}

export const ExternalLink: FC<PropsWithChildren<ExternalLinkProps>> = (
  {
    href,
    className,
    children,
  }
) => {
  return (
    <a
      href={href}
      className={clsx(
        'secondary-link',
        className,
      )}
      target="_blank"
      rel="nofollow"
    >
      {children}
    </a>
  );
};
