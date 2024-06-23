import { useMemo } from 'react';
import type { ButtonHTMLAttributes, FC } from 'react';
import clsx from 'clsx';
import { EclipseLoader } from '../loaders';


export type ButtonModifiers =
  'main'
  | 'secondary'
  | 'outline-main'
  | 'outline-secondary'
  | 'content'
  | 'small';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  modifiers?: ButtonModifiers[];
  dataTest?: string;
}

export const Button: FC<ButtonProps> = (
  {
    isLoading,
    className,
    modifiers,
    type,
    children,
    disabled,
    dataTest,
    ...rest
  }
) => {
  const mods = modifiers || ['main'];

  const classModifiers = useMemo(() =>
      mods.map(
      (modifier) => (`ui-button--${modifier}`)).join(' ')
    , [mods.join('')]);

  return (
    <button
      className={clsx(
        'ui-button',
        classModifiers,
        (disabled || isLoading) && 'ui-button--disabled',
        className,
      )}
      type={type || 'button'}
      disabled={disabled || isLoading}
      data-test={dataTest}
      {...rest}
    >
      {isLoading ? <EclipseLoader small /> : <span>{children}</span>}
    </button>
  );
};
