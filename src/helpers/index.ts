import { intervalToDuration, isBefore, isSameDay } from 'date-fns';

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
    isBefore(a.start, b.start) ? -1 : isSameDay(a.start, b.start) ? 0 : 1,
  );

export const getTotal = (report: Report) =>
  report.end.getTime() - report.start.getTime() - report.breakLength;

export const getTotalFrom = (data: Report[], idx: number) => {
  if (idx === -1) {
    return '0h';
  }

  const total = [...data]
    .slice(idx + 1)
    .reduce((accum, curr) => accum + getTotal(curr), 0);

  const { hours, minutes } = intervalToDuration({
    start: 0,
    end: total,
  });

  return `${hours}h ${minutes}m`;
};
