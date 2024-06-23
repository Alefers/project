import { memo, useMemo } from 'react';
import type { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { CloseButton } from '../buttons';
import { useHandleOnOutsideClickHook, useHandleOnEscapeHook } from '../hooks';


export type UIPortalType = 'base' | 'notice';
export type UIPortalModifier = 'exclude-left-menu';

export interface ModalPortalProps {
  portalType?: UIPortalType;
  modifiers?: UIPortalModifier[];
  customClass?: string;
  closeOnEscape?: boolean;
  closeOnOutsideClick?: boolean;
  onClose?: () => void;
  onToggle?: (state: boolean) => void;
}

const ModalPortalInner: FC<PropsWithChildren<ModalPortalProps>> = (
  {
    children,
    portalType,
    modifiers,
    customClass,
    closeOnEscape,
    closeOnOutsideClick,
    onClose,
    onToggle,
  },
) => {
  const localOnClose = useMemo(() => {
    if (onClose) return onClose;
    if (onToggle) return () => onToggle(false);
  }, [onClose, onToggle]);

  const { containerRef } = useHandleOnOutsideClickHook({
    active: closeOnOutsideClick,
    onClick: localOnClose,
  });

  useHandleOnEscapeHook({
    active: closeOnEscape,
    onEscape: localOnClose,
  });

  return (
    <div
      className={clsx(
        'ui-modal-portal',
        `ui-modal-portal--${portalType || 'base'}`,
        ...(modifiers || []).map((mod) => `ui-modal-portal--${mod}`),
        customClass,
      )}
    >
      <div
        className="ui-modal-portal__content"
        ref={containerRef}
      >
        {!!localOnClose && (
          <CloseButton onClick={localOnClose} />
        )}
        {children}
      </div>
    </div>
  );
};

const _ModalPortalInner = memo(ModalPortalInner);

export {
  _ModalPortalInner as ModalPortalInner,
};
