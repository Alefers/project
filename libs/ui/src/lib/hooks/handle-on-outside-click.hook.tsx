import { useEffect, useRef } from 'react';


interface HandleOnOutsideClickHookProps {
  active?: boolean;
  onClick?: () => void;
}

export const useHandleOnOutsideClickHook = (
  {
    active,
    onClick,
  }: HandleOnOutsideClickHookProps,
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent) => {
    if (onClick && containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onClick();
    }
  };

  useEffect(() => {
    if (containerRef.current && active) {
      document.body.addEventListener('click', handleClick);

      return () => {
        document.body.removeEventListener('click', handleClick);
      }
    }
  }, [active, containerRef.current, onClick]);

  return {
    containerRef,
  };
};
