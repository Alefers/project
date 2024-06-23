import type { ReactNode } from 'react';


export const splitStringWithDelimiter = (code: string | undefined, delimiter = '-', caret = 2): string => {
  const regStr = `.{1,${caret}}`;
  const reg = new RegExp(regStr,'g');
  return code ? (code.match(reg) || []).join(delimiter) : '';
}

type AllowedTagsToReplace = 'br' | 'p';

export const replaceNewLinesWithTag = (str: string, tag: AllowedTagsToReplace = 'p'): ReactNode => {
  const parts = (str || '').split(/[\r\n]+/).filter(Boolean);
  switch (tag) {
    case 'br':
      return (
        <>
          {parts.join(' <br />')}
        </>
      );
    default:
      return (
        <>
          {parts.map((part) => (
            <p>
              {part}
            </p>
          ))}
        </>
      );
  }
};

export const transformStringToShort = (str: string, delimiter = ' '): string => {
  const arr = (str || '').split(delimiter).filter(Boolean);
  return arr.length > 1
    ? `${arr[0].charAt(0)}${arr[1].charAt(0)}`
    : (arr[0] || '').slice(0, 2);
};

export const replaceParamsInsideString = (text: string, params: Record<string, string | number>) => {
  let result = text;
  Object.keys(params).forEach((key) => {
    result = result.replace(`%${key}%`, `${params[key]}`);
  });
  return result;
};

export const stringToFloat = (val?: string): string => {
  if (!val || typeof val !== 'string') {
    return '';
  }
  const clearedVal = val.replace(/[^.0-9]/g, '');
  if (/^(?:\d+)?\.?(?:\d+)?$/.test(clearedVal)) {
    const separate = clearedVal.split('.');
    if (separate.length > 1) {
      return `${separate[0]}.${separate[1]}`;
    } else {
      return clearedVal;
    }
  }
  return '';
}

export const anyToNumber = (val: unknown): number => Number(val || '0') || 0;

export const getShortName = (name?: string): string => {
  if (!name) return '';

  const nameMap = name.split(' ');

  return nameMap[0].charAt(0) + (nameMap[1] ? nameMap[1].charAt(0) : '');
}

export const getOnlyDigits = (val: string): string => val.replace(/[^0-9]/g, '');
