import { isBefore, isEqual } from 'date-fns';

import { Report } from '../types';

export const today = new Date();

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((previous, currentItem) => {
    const group = key(currentItem);

    if (!previous[group]) {
      previous[group] = [];
    }
    previous[group].push(currentItem);

    return previous;
  }, {} as Record<K, T[]>);

export const getSortedReports = (reports: Report[]) =>
  [...reports].sort((a, b) =>
    isBefore(a.start, b.start) ? -1 : isEqual(a.start, b.start) ? 0 : 1,
  );

export const getTotal = (report: Report) =>
  report.end.getTime() - report.start.getTime() - report.breakLength;
