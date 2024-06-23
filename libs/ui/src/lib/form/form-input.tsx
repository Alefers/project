import { memo } from 'react';
import type { FC, InputHTMLAttributes } from 'react';
import { Input, InputMask } from './input';
import { FormElementWrapper, FormElementWrapperBaseProps } from './form-element-wrapper';
import { InputModifier } from '@lib/helper';


interface FormInputProps extends InputHTMLAttributes<HTMLInputElement>, FormElementWrapperBaseProps {
  modifiers?: InputModifier[];
  mask?: InputMask;
  isLoading?: boolean;
}

const FormInput: FC<FormInputProps> = (
  {
    modifiers,
    label,
    error,
    ...props
  }
) => {
  return (
    <FormElementWrapper
      error={error}
      label={label}
      small={modifiers && modifiers.includes('small')}
    >
      <Input
        modifiers={modifiers}
        error={!!error}
        {...props}
      />
    </FormElementWrapper>
  );
};

const _FormInput = memo(FormInput);

export {
  _FormInput as FormInput,
}
