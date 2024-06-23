import { UiPageTab } from "@lib/helper";


export enum EUserViewTabs {
  INFO,
  EDIT
}

export const boUserViewTabsMap: UiPageTab[] = [
  {
    value: EUserViewTabs.INFO,
    label: 'Info',
  },
  {
    value: EUserViewTabs.EDIT,
    label: 'Edit',
  },
];
