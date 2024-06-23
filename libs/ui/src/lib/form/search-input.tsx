import { useState, useRef, useEffect, KeyboardEvent, memo } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import { InputModifier } from '@lib/helper';
import { SvgIcon, svgIconsMap } from '@lib/icons';


const fn = () => {};

interface SearchInputProps {
  actualValue?: string;
  placeholder?: string;
  disabled?: boolean;
  modifiers?: InputModifier[];
  onChange?: (val: string) => void;
  onApply?: (val: string) => void;
}

const SearchInput: FC<SearchInputProps> = (
  {
    actualValue,
    placeholder,
    disabled,
    modifiers,
    onChange,
    onApply,
  }
) => {
  const [value, setValue] = useState('')
  const inputRef = useRef(null);

  const localOnApply = onApply || fn;

  const changeHandler = (val: string) => {
    setValue(val);
    if (onChange) {
      onChange(val);
    }
  };

  const blurHandler = () => {
    if (!value) {
      localOnApply('');
    }
  };

  useEffect(() => {
    changeHandler(actualValue || '');
  }, [actualValue]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      localOnApply(value);
    }
  };

  const onReset = () => {
    changeHandler('');
    localOnApply('');
  };

  return (
    <div
      className={clsx(
        'ui-input',
        'ui-input--with-icon',
        disabled && 'ui-input--disabled',
        ...(modifiers || []).map((mod) => `ui-input--${mod}`),
      )}
    >
      <SvgIcon
        className="ui-input__icon"
        icon={svgIconsMap.SearchBase}
      />
      <input
        ref={inputRef}
        className="ui-input__input"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        spellCheck={false}
        onChange={(e) => changeHandler(e.target.value)}
        onBlur={blurHandler}
        onKeyDown={onKeyDown}
      />
      {!!value && (
        <div
          className="ui-input__reset-icon"
          onClick={onReset}
        >
          <SvgIcon icon={svgIconsMap.Close} />
        </div>
      )}
    </div>
  );
};

const _SearchInput = memo(SearchInput);

export {
  _SearchInput as SearchInput,
};
