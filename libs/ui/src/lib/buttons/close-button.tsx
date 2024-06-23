import type { FC } from 'react';
import { SvgIcon, svgIconsMap } from '@lib/icons';


interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: FC<CloseButtonProps> = (
  {
    onClick,
  }
) => {
  return (
    <button
      className="ui-close-button"
      onClick={onClick}
      role="button"
    >
      <SvgIcon icon={svgIconsMap.Close} />
    </button>
  );
};
