import { memo, useMemo, useRef } from 'react';
import type { FC, PropsWithChildren, SyntheticEvent } from 'react';
import DatePicker from 'react-datepicker';
import clsx from 'clsx';
import { InputModifier, UiSelectItem } from '@lib/helper';
import { SvgIcon, svgIconsMap } from '@lib/icons';


interface DatepickerProps {
  selected?: Date | null;
  minDate?: Date | null;
  maxDate?: Date | null;
  selectsStart?: boolean;
  selectsEnd?: boolean;
  startDate?: Date | null;
  endDate?: Date | null;
  placeholder?: string;
  modifiers?: InputModifier[];
  withReset?: boolean;
  intervalSelectItems?: UiSelectItem[];
  onChange: (date: Date | null, event: SyntheticEvent<any, Event> | undefined) => void;
  onIntervalSelect?: (val: string) => void;
}

const Datepicker: FC<PropsWithChildren<DatepickerProps>> = (
  {
    selected,
    minDate,
    maxDate,
    selectsStart,
    selectsEnd,
    startDate,
    endDate,
    placeholder,
    modifiers,
    withReset,
    intervalSelectItems,
    onChange,
    onIntervalSelect,
  }
) => {
  const ref = useRef(null);

  const mods = useMemo(() =>
      (modifiers || []).map((mod) => `ui-datepicker--${mod}`)
    , [modifiers]);

  const hasIntervalSelect = !!(intervalSelectItems && onIntervalSelect);

  const handleIntervalSelect = (val: string) => {
    if (onIntervalSelect) {
      onIntervalSelect(val);
      if (ref.current) {
        // @ts-ignore
        ref.current.setOpen(false);
      }
    }
  };

  return (
    <div
      className={clsx(
        'ui-datepicker',
        withReset && 'ui-datepicker--with-reset',
        hasIntervalSelect && 'ui-datepicker--with-interval-select',
        ...mods
      )}
    >
      <SvgIcon
        className="ui-datepicker__icon"
        icon={svgIconsMap.CalendarBase}
      />
      <DatePicker
        placeholderText={placeholder}
        dateFormat="dd/MM/yyyy"
        className="ui-datepicker__input"
        selectsStart={selectsStart}
        selectsEnd={selectsEnd}
        selected={selected}
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        calendarStartDay={1}
        ref={ref}
      >
        {hasIntervalSelect && (
          <div className="ui-datepicker__interval-select">
            {intervalSelectItems.map((item) => (
              <div
                key={item.value}
                className="ui-datepicker__interval-select-item"
                onClick={() => handleIntervalSelect(item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </DatePicker>
      {withReset && selected && (
        <div
          className="ui-datepicker__reset-icon"
          onClick={() => onChange(null, {} as SyntheticEvent<any>)}
        >
          <SvgIcon icon={svgIconsMap.Close} />
        </div>
      )}
    </div>
  );
};

const _Datepicker = memo(Datepicker);

export {
  _Datepicker as Datepicker,
};