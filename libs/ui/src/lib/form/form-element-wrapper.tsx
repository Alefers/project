import { memo } from 'react';
import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';


export interface FormElementWrapperBaseProps {
  label?: string;
  error?: { message: string };
}

interface FormElementWrapperProps extends FormElementWrapperBaseProps {
  small?: boolean;
}

const FormElementWrapper: FC<PropsWithChildren<FormElementWrapperProps>> = (
  {
    label,
    error,
    small,
    children,
  }
) => {
  const { message: errorMessage } = error || {};

  return (
    <div
      className={clsx(
        'form-element',
        small && `form-element--small`,
      )}
    >
      <div className="form-element__label">
        <div
          dangerouslySetInnerHTML={{
            __html: label || '&nbsp;'
          }}
        />
      </div>
      {children}
      {errorMessage && (
        <div
          className="form-element__error-text"
          title={errorMessage}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

const _FormElementWrapper = memo(FormElementWrapper);

export {
  _FormElementWrapper as FormElementWrapper,
};
