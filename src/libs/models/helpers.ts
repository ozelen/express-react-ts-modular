import { defaults, camelCase, snakeCase, isArray, map, toPairs, fromPairs, isObject, isDate, flow, toUpper, filter, isUndefined } from 'lodash/fp';

// Converts keys to other format (like camelcase to snakecase or back)
const processKeys = (processor: (v: string) => string): any => (input: any) =>
  isArray(input)
    ? map(processKeys(processor))(input)
    : isObject(input) && !isDate(input)
      ? flow(
          toPairs,
          map(([key, val]) => [processor(key), processKeys(processor)(val)]),
          fromPairs,
        )(input)
      : input;

// Converts DB values to JS types
export const serializeValues = (payload: any): any =>
  flow(
    toPairs,
    map(([key, val]) => [
      key,
      isDate(val)
        ? new Date(val).getTime()
        : isDate(val) ? val
        : isObject(val)
          ? JSON.stringify(val)
          : val
    ]),
    fromPairs,
  )(payload);

export const postProcessResponse = processKeys(camelCase);

export const wrapIdentifier = (value: string, origImpl: (v: string) => string) =>
  value === '*' ? value : origImpl(toUpper(snakeCase(value)));

export const ifCond = (obj: any) =>
  flow(
    toPairs,
    filter(([key, val]) => !isUndefined(val)),
    fromPairs
  )(obj);
