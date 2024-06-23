import { memo, ChangeEvent, useState } from 'react';
import type { FC, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import { InputModifier } from '@lib/helper';


interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  modifiers?: InputModifier[];
  maxCharsCount?: number;
}

const Textarea: FC<TextareaProps> = (
  {
    className,
    error,
    modifiers = ['default'],
    rows,
    maxCharsCount = 0,
    onChange,
    ...props
  }
) => {
  const [charsLeft, setCharsLeft] = useState<number>(maxCharsCount);

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (maxCharsCount) {
      setCharsLeft(maxCharsCount - event.target.value.length);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <>
      <textarea
        className={clsx(
          'ui-textarea',
          className,
          error && 'ui-textarea--error',
          rows && 'ui-textarea--has-rows',
          ...modifiers.map((mod) => `ui-textarea--${mod}`),
        )}
        rows={rows}
        maxLength={maxCharsCount || undefined}
        spellCheck={false}
        onChange={onChangeHandler}
        {...props}
      />
      {maxCharsCount > 0 && (
        <div className="ui-textarea__counter">
          {charsLeft}
        </div>
      )}
    </>
  );
};

const _Textarea = memo(Textarea);

export {
  _Textarea as Textarea,
};
