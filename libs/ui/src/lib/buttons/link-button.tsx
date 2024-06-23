import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { ButtonModifiers } from './button';
import { Link } from 'react-router-dom';


interface LinkButtonProps {
  className?: string;
  outer?: boolean;
  useBlank?: boolean;
  disabled?: boolean;
  href: string;
  modifiers?: ButtonModifiers[];
  onClick?: () => void;
}

export const LinkButton: FC<PropsWithChildren<LinkButtonProps>> = (
  {
    href,
    outer,
    useBlank,
    className,
    modifiers,
    children,
    disabled,
    onClick,
  }
) => {
  const summaryClass = clsx(
    'ui-button',
    (modifiers || ['main']).map((modifier) => (`ui-button--${modifier}`)),
    className,
    disabled && 'ui-button--disabled',
  );

  return outer
    ? (
      <a
        href={href}
        className={summaryClass}
        onClick={onClick}
        {...useBlank ? {
          target: '_blank',
          rel: 'nofollow'
        } : {}}
      >
        <span>{children}</span>
      </a>
    ) : (
      <Link
        to={href}
        className={summaryClass}
        onClick={onClick}
      >
        <span>{children}</span>
      </Link>
    );
};
