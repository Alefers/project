import type { ReactNode } from 'react';


export interface ITokens {
  access: CookieType;
  refresh: CookieType;
}

export interface CookieType {
  token: string;
  expires: Date;
}

export type InputModifier = 'default'
  | 'small'
  | 'text-center'
  | 'phone-code'
  | 'white-bg'
  | 'full'
  | 'text-left'
  | 'with-clear';

export interface UiSelectItem extends Record<string, unknown>{
  value: string;
  label: string;
  searchContent?: string;
  disabled?: boolean;
  marked?: boolean;
}

export type NoticeType = 'error' | 'warning' | 'success' | 'info';

export interface IGlobalNotice {
  noticeType?: NoticeType;
  title?: string;
  content: string | ReactNode;
  buttonText?: string;
}

export interface UiPageTab {
  value: number;
  label: string;
  disabled?: boolean;
  sub?: string;
}
