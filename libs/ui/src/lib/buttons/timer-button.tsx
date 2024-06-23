import { useEffect, useState } from 'react';
import type { FC, PropsWithChildren } from 'react';
import { Button, ButtonModifiers } from './button';


export const TIMER_BUTTON_TIME_PHRASE = '%time%';

interface TimerButtonProps {
  seconds?: number;
  textOnReady: string;
  textOnTimer: string;
  startImmediately?: boolean;
  modifiers?: ButtonModifiers[];
  disabled?: boolean;
  cn?: string;
  onClick: () => void;
}

export const TimerButton: FC<PropsWithChildren<TimerButtonProps>> = (
  {
    seconds = 60,
    textOnReady,
    textOnTimer,
    startImmediately,
    modifiers,
    disabled,
    cn,
    onClick,
  }
) => {
  const [time, setTime] = useState(seconds);
  const [timerActive, setTimerActiveState] = useState(!!startImmediately);

  const clickHandler = () => {
    onClick();
    setTimerActiveState(true);
    setTime(seconds);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (timerActive) {
      timeout = setTimeout(() => setTime(time - 1), 999);
    }

    return () => {
      clearTimeout(timeout);
    }
  }, [timerActive, time]);

  useEffect(() => {
    if (time <= 0) {
      setTimerActiveState(false);
      if (seconds > 0) {
        setTime(seconds);
      }
    }
  }, [time]);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  const timerText = textOnTimer.includes(TIMER_BUTTON_TIME_PHRASE)
    ? textOnTimer.replace(TIMER_BUTTON_TIME_PHRASE, `${time}`)
    : `${textOnTimer} ${time}`;

  return (
    <Button
      onClick={clickHandler}
      disabled={timerActive || disabled}
      modifiers={modifiers}
      className={cn}
    >
      {timerActive ? timerText : textOnReady}
    </Button>
  );
};
