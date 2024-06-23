import { memo, useState } from 'react';
import type { ChangeEvent, FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import MaskedInput, { Mask } from 'react-text-mask';
import { EclipseLoader } from '../loaders';
import { InputModifier, getOnlyDigits } from '@lib/helper';
import { SvgIconType, SvgIcon, svgIconsMap } from '@lib/icons';


export type InputMask = Mask | ((value: string) => Mask);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  modifiers?: InputModifier[];
  error?: boolean;
  mask?: InputMask;
  isLoading?: boolean;
  icon?: SvgIconType;
  dataTest?: string;
}

const Input: FC<InputProps> = (
  {
    className,
    type,
    modifiers,
    error,
    mask,
    isLoading,
    icon,
    dataTest,
    onChange,
    ...props
  }
) => {
  const [displayAsText, changeDisplayType] = useState(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      e.target.value = getOnlyDigits(e.target.value);
    }
    if (onChange) {
      onChange(e);
    }
  }

  const currentType = type !== 'password'
    ? type === 'number'
      ? 'text'
      : type
    : displayAsText
      ? 'text'
      : 'password';

  return (
    <div className={clsx(
      'ui-input',
      error && 'ui-input--error',
      icon && 'ui-input--with-icon',
      props.disabled && 'ui-input--disabled',
      ...(modifiers || []).map((mod) => `ui-input--${mod}`),
      className,
    )}>
      {icon ? (
        <SvgIcon
          className="ui-input__icon"
          icon={icon}
        />
      ) : null}
      {mask ? (
        <MaskedInput
          placeholderChar={'\u2000'}
          mask={mask}
          guide={false}
          keepCharPositions
          className="ui-input__input"
          data-test={dataTest}
          onChange={onChange}
          {...props}
        />
      ) : (
        <input
          className="ui-input__input"
          type={currentType}
          data-test={dataTest}
          spellCheck={false}
          onChange={changeHandler}
          {...props}
        />
      )}
      {type === 'password' && (
        <div
          className="ui-input__pass-toggle"
          onClick={() => changeDisplayType(!displayAsText)}
        >
          <SvgIcon icon={displayAsText ? svgIconsMap.EyeOpen : svgIconsMap.EyeClosed} />
        </div>
      )}
      {type !== 'password' && isLoading && (
        <div className="ui-input__loader">
          <EclipseLoader small />
        </div>
      )}
    </div>
  );
};

const _Input = memo(Input);

export {
  _Input as Input,
}