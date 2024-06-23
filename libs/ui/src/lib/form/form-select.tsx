import { FC, memo } from 'react';
import { Select } from './select';
import { FormElementWrapper, FormElementWrapperBaseProps } from './form-element-wrapper';
import type { Zorm } from 'react-zorm';
import { InputModifier, UiSelectItem } from '@lib/helper';


interface FormSelectProps extends FormElementWrapperBaseProps {
  modifiers?: InputModifier[];
  name?: string;
  value?: string;
  items: UiSelectItem[];
  searchable?: boolean;
  placeholder?: string;
  disabled?: boolean;
  dataLoading?: boolean;
  zo?: Zorm<any>;
  onChange?: (value: string) => void;
}

const FormSelect: FC<FormSelectProps> = (
  {
    modifiers,
    name,
    label,
    value,
    items,
    error,
    searchable,
    placeholder,
    disabled,
    dataLoading,
    zo,
    onChange,
  }
) => {
  return (
    <FormElementWrapper
      error={error}
      label={label}
      small={modifiers && modifiers.includes('small')}
    >
      <Select
        items={items}
        name={name}
        modifiers={modifiers}
        value={value}
        error={!!error}
        searchable={searchable}
        placeholder={placeholder}
        disabled={disabled}
        dataLoading={dataLoading}
        zo={zo}
        onChange={onChange}
      />
    </FormElementWrapper>
  );
};

const _FormSelect = memo(FormSelect);

export {
  _FormSelect as FormSelect,
};
