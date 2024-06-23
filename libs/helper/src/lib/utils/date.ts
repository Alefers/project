import { format } from 'date-fns';


export const minAllowedDate = new Date(2022, 8, 1);

export enum EDateFormat {
  ISO_ONLY_DATE = 'yyyy-MM-dd',
}

export const baseDateFormat = (date: string): string =>
  format(new Date(date), 'yyyy-MM-dd hh:mm');

export const helperDateFormat = (date: Date, dateFormat?: string | EDateFormat): string => {
  const formatString = dateFormat || EDateFormat.ISO_ONLY_DATE;
  return format(date, formatString);
}
