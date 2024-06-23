import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  createElement,
} from 'react';
import type {
  ComponentType,
  FC,
} from 'react';
import clsx from 'clsx';
import { EclipseLoader } from '../loaders';
import { useHandleOnEscapeHook, useHandleOnOutsideClickHook } from '../hooks';
import type { Zorm } from 'react-zorm';
import { UiSelectItem, InputModifier } from '@lib/helper';
import { SvgIcon, svgIconsMap } from '@lib/icons';


const identicalAsStrings = (val1?: string, val2?: string): boolean =>
  `${val1}`.toLowerCase() === `${val2}`.toLowerCase()

interface UISelectProps {
  value?: string;
  name?: string;
  items: UiSelectItem[];
  modifiers?: InputModifier[];
  placeholder?: string;
  error?: boolean;
  dataLoading?: boolean;
  allowClearBtn?: boolean;
  template?: ComponentType<any>;
  selectedTemplate?: ComponentType<any>;
  useTemplateForSelected?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  emptyText?: string;
  zo?: Zorm<any>;
  dataTest?: string;
  onChange?: (value: string) => void;
}

const Select: FC<UISelectProps> = (
  {
    value = '',
    name,
    items,
    modifiers,
    placeholder = '',
    error,
    dataLoading,
    allowClearBtn,
    template,
    selectedTemplate,
    useTemplateForSelected,
    disabled,
    searchable,
    emptyText,
    zo,
    dataTest,
    onChange,
  }
) => {
  const [isOpen, toggleOpen] = useState(false);
  const [itemsList, updateList] = useState<UiSelectItem[]>([]);
  const [currentValue, setCurrentValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [showInnerTop, setShowInnerTop] = useState(false);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const innerRef = useRef<HTMLInputElement>(null);

  // This solution can create problems, but now it can catch infinite loop if value and currentValue
  // has different types after some data processing, like '1' and 1, 'GBP' and 'Gbp' etc.
  // If this happened, check incoming data first before any changes inside component.
  useEffect(() => {
    if (!identicalAsStrings(value, currentValue)) {
      setCurrentValue(value || '');
    }
  }, [value])

  useEffect(() => {
    if (dataLoading && isOpen) {
      toggleOpen(false);
    }
  }, [dataLoading]);

  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = currentValue;
      if (zo && zo.validation !== null) {
        zo.validate();
      }
    }
  }, [currentValue]);

  const onEscape = useCallback(() => toggleOpen(false), []);

  useHandleOnEscapeHook({
    active: isOpen,
    onEscape,
  });

  const { containerRef } = useHandleOnOutsideClickHook({
    active: isOpen,
    onClick: onEscape,
  });

  const activeItem = currentValue !== undefined
    ? (itemsList || []).find((item) => identicalAsStrings(item.value, currentValue))
    : undefined;

  useEffect(() => updateList(items), [items]);

  useEffect(() => {
    if (!isOpen) {
      setSearchValue('');
      setShowInnerTop(false);
    }
  }, [isOpen]);

  const changeItem = (item: UiSelectItem) => {
    if (!disabled && item) {
      setCurrentValue(item.value);
      toggleOpen(false);
      if (onChange) {
        onChange(item.value);
      }
    }
  };

  const onOuterClick = () => {
    if (disabled || dataLoading) {
      return;
    }
    toggleOpen(!isOpen);
  };

  const finalList = useMemo(() =>
    searchable && searchValue.trim()
      ? itemsList.filter((item) => {
        const searchIn = `${item.searchContent || item.label}`.toLowerCase();
        const searchFor = searchValue.toLowerCase();
        return searchIn.includes(searchFor);
      })
      : itemsList
  , [itemsList, searchable, searchValue]);

  //@ts-ignore
  const onClearClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentValue('');
    if (onChange) {
      onChange('');
    }
    toggleOpen(false);
    if (onChange) {
      onChange('');
    }
  };

  useLayoutEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (isOpen && containerRef.current && innerRef.current) {
      const innerRect = innerRef.current.getBoundingClientRect();
      const clientHeight = window.innerHeight;

      if (innerRect.bottom - 20 > clientHeight) {
        const containerRect = containerRef.current.getBoundingClientRect();

        if ((containerRect.top - innerRect.height - 100) > 0) {
          setShowInnerTop(true);
        }
      }
    }
  }, [isOpen]);

  const templateForSelected = template && useTemplateForSelected ? template : selectedTemplate;

  return (
    <>
      {name && (
        <input
          hidden
          name={name}
          ref={hiddenInputRef}
        />
      )}
      <div
        ref={containerRef}
        className={clsx(
          'ui-select',
          isOpen && 'ui-select--open',
          disabled && 'ui-select--disabled',
          error && 'ui-select--error',
          searchable && 'ui-select--with-search',
          dataLoading && 'ui-select--loading',
          ...(modifiers || []).map((mod) => `ui-select--${mod}`),
        )}
        data-test={dataTest}
      >
        <div
          className={clsx(
            'ui-select__outer',
            activeItem && 'ui-select__outer--selected',
          )}
          onClick={onOuterClick}
          tabIndex={-1}
        >
          {dataLoading && (
            <div className="ui-select__loader">
              <EclipseLoader small />
            </div>
          )}
          <div
            className="ui-select__outer-text"
          >
            {activeItem ? (
              <>
                {templateForSelected ? (
                  createElement(templateForSelected, { item: activeItem })
                ) : activeItem.label}
              </>
            ) : placeholder}
          </div>
          <div className="ui-select__arrow">
            <SvgIcon icon={svgIconsMap.Arrow} />
          </div>
          {allowClearBtn && currentValue && (
            <div
              className="ui-select__clear-btn"
              onClick={onClearClick}
            >
              <SvgIcon icon={svgIconsMap.Close} />
            </div>
          )}
        </div>

        {!disabled && isOpen && (
          <div
            className={clsx(
              'ui-select__inner',
              showInnerTop && 'ui-select__inner--top',
            )}
            ref={innerRef}
          >
            {searchable && (
              <div
                className="ui-select__search"
                data-test={`${dataTest}search`}
              >
                <input
                  ref={searchInputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <div
                  role="button"
                  className={clsx(
                    'ui-select__clear-search',
                    searchValue && 'ui-select__clear-search--visible',
                  )}
                  onClick={() => setSearchValue('')}
                >
                  <SvgIcon icon={svgIconsMap.Close} />
                </div>
                <SvgIcon
                  className="ui-select__search-icon"
                  icon={svgIconsMap.Search}
                />
              </div>
            )}
            {finalList.length ? (
              <div className="ui-select__list">
                {finalList.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => changeItem(item)}
                    className={clsx(
                      'ui-select__list-item',
                      item.marked && 'ui-select__list-item--marked',
                      currentValue === item.value && 'ui-select__list-item--active',
                    )}
                    data-value={item.value}
                    data-text={item.label}
                  >
                    {template
                      ? createElement(template, { item, active: currentValue === item.value })
                      : item.label}
                  </div>
                ))}
              </div>
            ) : (
              <div className="ui-select__empty-list">
                {emptyText || 'No items'}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const _Select = memo(Select);

export  {
  _Select as Select,
};
