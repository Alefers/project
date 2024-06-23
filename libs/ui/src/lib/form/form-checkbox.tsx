import { memo } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { FormElementWrapper } from './form-element-wrapper';
import { Checkbox } from './checkbox';


interface FormCheckboxProps {
  error?: { message: string };
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  defaultChecked?: boolean;
  onChange?: () => void;
}

const FormCheckbox: FC<PropsWithChildren<FormCheckboxProps>> = (
  {
    children,
    disabled,
    defaultChecked,
    name,
    checked,
    error,
    onChange,
  }
) => {
  return (
    <FormElementWrapper
      error={error}
    >
      <Checkbox
        disabled={disabled}
        checked={checked}
        name={name}
        onChange={onChange}
        error={!!error}
        defaultChecked={defaultChecked}
      >
        {children}
      </Checkbox>
    </FormElementWrapper>
  );
};

const _FormCheckbox = memo(FormCheckbox);

export {
  _FormCheckbox as FormCheckbox,
}