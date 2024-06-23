import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';


export interface SwipeCheckboxProps {
  checked?: boolean;
  label?: string;
  disabled?: boolean;
  name?: string;
  defaultChecked?: boolean;
  error?: boolean;
  dataTest?: string;
  onChange?: () => void;
}

export const SwipeCheckbox: FC<PropsWithChildren<SwipeCheckboxProps>> = (
  {
    checked,
    label,
    disabled,
    name,
    defaultChecked,
    error,
    dataTest,
    onChange,
  }
) => {
  return (
    <label
      className={clsx(
        'ui-swipe-checkbox',
        error && 'ui-swipe-checkbox--error',
        disabled && 'ui-swipe-checkbox--disabled',
      )}
      data-test={dataTest}
    >
      <div className="ui-swipe-checkbox__toggle">
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          name={name}
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <div />
      </div>
      {label}
    </label>
  );
};
