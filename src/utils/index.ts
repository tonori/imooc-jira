export const isFalsy = (value: unknown): boolean =>
  value === 0 ? false : !value;

export const cleanObject = (object: { [key: string]: unknown }) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (!!value) {
      delete result[key];
    }
  });
  return result;
};

export const selectValueToNumber = (value: unknown) =>
  isNaN(Number(value)) ? undefined : Number(value);
