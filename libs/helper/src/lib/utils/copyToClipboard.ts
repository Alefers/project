import { displayNotice } from './notifications';


export enum ECopyType {
  STRING,
  NUMBER,
  BOOL,
}

export interface ICopyProp {
  name: string;
  type: ECopyType;
  default: unknown;
}

export const copyToClipboard = (text: string) => {
  void navigator.clipboard.writeText(text);
  displayNotice('Copied to clipboard', 'success');
};

export const clearTextFromLineBreaks = (val: unknown): string => {
  if (typeof val === 'number' && !isNaN(val)) {
    return `${val}`;
  }
  if (typeof val === 'string') {
    return val.replace(/[\r\n]/gm, '');
  }
  if (typeof val === 'boolean') {
    return val ? 'Yes' : 'No';
  }
  return '';
};

export const copyArrayOfObjectsToClipboard = (data: Object[], propsToCopy: string[], id?: string, idField?: string) => {
  const mainField = idField || 'id';
  let text = '';
  try {
    data.forEach((row) => {
      // @ts-ignore
      if (!id || id === row[mainField]) {
        // @ts-ignore
        propsToCopy.forEach((prop, idx) => text += `${idx ? '\t' : ''}${clearTextFromLineBreaks(row[prop])}`);
        text += ' \n';
      }
    });
    copyToClipboard(text);
  } catch (e) {
    displayNotice('Failed to copy');
    console.log(e);
  }
}
