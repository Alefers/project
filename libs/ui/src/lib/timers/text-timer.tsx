import { useEffect, useState, forwardRef, ForwardedRef, useImperativeHandle } from 'react';
import clsx from 'clsx';


export interface TextTimerForward {
  reset: () => void;
}

const withZero = (val: number) => val < 10 ? `0${val}` : val;

interface TextTimerProps {
  interval?: number;
  asClock?: boolean;
  cn?: string;
  onFinish: () => void;
}

export const TextTimer = forwardRef((
    {
      interval,
      asClock,
      cn,
      onFinish,
    }: TextTimerProps, ref: ForwardedRef<TextTimerForward>
) => {
  const [time, setTime] = useState(interval || 60);

  useImperativeHandle(ref, () => ({
    reset() {
      setTime(interval || 60);
    }
  }), []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    } else {
      onFinish();
    }

    return () => {
      clearTimeout(timer);
    }
  }, [time]);

  return (
      <span
        className={clsx(
          'ui-text-timer',
          `ui-text-timer--${time % 2 ? 'blink' : 'reblink'}`,
          cn
        )}
      >
        {asClock ? (
          <>
            {withZero(Math.floor(time / 60))}:{withZero(time % 60 )}
          </>
        ) : time}
      </span>
  );
});
