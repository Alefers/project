import { UiSelectItem } from './types';


export const getUISelectItemsFromStringArray = (strings: string[]): UiSelectItem[] =>
  strings.map((val) => ({
    value: val,
    label: val,
  }));

export const booleanSelectItems: UiSelectItem[] = [
  {
    value: '1',
    label: 'Yes',
  },
  {
    value: '0',
    label: 'No',
  },
];
