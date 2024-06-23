import { useEffect } from 'react';


interface HandleOnEscapeHookProps {
  active?: boolean;
  onEscape?: () => void;
}

export const useHandleOnEscapeHook = (
  {
    active,
    onEscape,
  }: HandleOnEscapeHookProps,
) => {
  const handleEscapePress = (event: KeyboardEvent) => {
    if (onEscape && event.key === 'Escape') {
      onEscape();
    }
  };

  useEffect(() => {
    if (active) {
      window.addEventListener('keydown', handleEscapePress);

      return () => {
        window.removeEventListener('keydown', handleEscapePress);
      };
    }
  }, [active]);
};
