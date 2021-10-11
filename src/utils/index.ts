export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (
  object: { [key: string]: unknown },
  excludeZero = false
) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if ((excludeZero && !value) || isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const stringToNumber = (value: string) =>
  isNaN(Number(value)) ? 0 : Number(value);
