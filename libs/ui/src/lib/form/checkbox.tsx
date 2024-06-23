import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { SvgIcon, svgIconsMap } from '@lib/icons';


export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  defaultChecked?: boolean;
  error?: boolean;
  cn?: string;
  onChange?: () => void;
}

export const Checkbox: FC<PropsWithChildren<CheckboxProps>> = (
  {
    checked,
    disabled,
    name,
    defaultChecked,
    error,
    children,
    cn,
    onChange,
  }
) => {
  return (
    <label
      className={clsx(
        'ui-checkbox',
        error && 'ui-checkbox--error',
        disabled && 'ui-checkbox--disabled',
        cn
      )}
    >
      <input
        type="checkbox"
        disabled={disabled}
        checked={checked}
        name={name}
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <div className="ui-checkbox__view">
        <SvgIcon icon={svgIconsMap.Check} />
      </div>
      {children}
    </label>
  );
};
