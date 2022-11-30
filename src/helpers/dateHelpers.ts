import { minutesToMilliseconds } from 'date-fns';

/**
 * Returns rounded number
 */
const roundToNearest = (n: number, roundTo: number) =>
  Math.round(n / roundTo) * roundTo;

/**
 * Returns random limited number
 */
const generateRandom = (min: number, max: number) =>
  min + Math.random() * (max - min);

/**
 * Returns random limited date
 */
export const generateRandomDate = (start: Date, end: Date) => {
  const startMs = start.getTime();
  const endMs = end.getTime();

  return new Date(generateRandom(startMs, endMs));
};

/**
 * Returns random limited and rounded ms
 */
export const generateRandomMs = (
  min: number,
  max: number,
  roundTo?: number,
) => {
  const rand = generateRandom(min, max);
  const rounded = roundToNearest(rand, roundTo ?? 1);

  return minutesToMilliseconds(rounded);
};
