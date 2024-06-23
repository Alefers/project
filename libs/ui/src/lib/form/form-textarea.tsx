import { memo } from 'react';
import type { FC, TextareaHTMLAttributes } from 'react';
import { FormElementWrapper } from './form-element-wrapper';
import type { ZodIssue } from 'zod';
import { Textarea } from './textarea';
import { InputModifier } from '@lib/helper';


interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  modifiers?: InputModifier[];
  label?: string;
  error?: ZodIssue;
  maxCharsCount?: number;
}

const FormTextarea: FC<FormTextareaProps> = (
  {
    modifiers,
    label,
    error,
    maxCharsCount,
    ...props
  }
) => {
  return (
    <FormElementWrapper
      error={error}
      label={label}
      small={modifiers && modifiers.includes('small')}
    >
      <Textarea
        error={!!error}
        modifiers={modifiers}
        maxCharsCount={maxCharsCount}
        {...props}
      />
    </FormElementWrapper>
  );
};

const _FormTextarea = memo(FormTextarea);

export {
  _FormTextarea as FormTextarea,
}
