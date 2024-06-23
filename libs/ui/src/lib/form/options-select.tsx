import { FC, memo } from 'react';
import clsx from 'clsx';


interface OptionsSelectProps {
  items: {
    value: string | number;
    label: string;
    [key: string]: unknown;
  }[];
  selected?: string | number;
  onChange: (newValue: string | number) => void;
}

const OptionsSelect: FC<OptionsSelectProps> = (
  {
    items,
    selected,
    onChange,
  }
) => {
  return (
    <div className="ui-options-select">
      {items.map((item) => (
        <div
          key={item.value}
          className={clsx(
            'ui-options-select__item',
            selected === item.value && 'ui-options-select__item--selected',
          )}
          onClick={() => onChange(item.value)}
        >
          <div className="ui-options-select__item-text">
            {item.label}
          </div>
          <span />
        </div>
      ))}
    </div>
  );
};

const _OptionsSelect = memo(OptionsSelect);

export {
  _OptionsSelect as OptionsSelect,
};