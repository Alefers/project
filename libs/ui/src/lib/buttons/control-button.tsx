import type { FC } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { SvgIcon, svgIconsMap } from '@lib/icons';
import { appRoutes } from '@lib/helper';


interface ControlButtonsProps {
  buttonType: 'cancel' | 'back';
  position?: 'left' | 'right';
  disabled?: boolean;
  onClick?: () => void;
}

export const ControlButton: FC<ControlButtonsProps> = (
  {
    buttonType,
    position,
    disabled,
    onClick,
  }
) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    navigate(appRoutes.home);
  };

  return (
    <button
      className={clsx(
        'control-button',
        position && `control-button--${position}`,
        disabled && 'control-button--disabled'
      )}
      onClick={handleClick}
    >
      {buttonType === 'back' && (
        <>
          <SvgIcon icon={svgIconsMap.Arrow} />
          Back
        </>
      )}
      {buttonType === 'cancel' && (
        <>
          Cancel
        </>
      )}
    </button>
  );
};
