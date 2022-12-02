// A simple function to only retain certain keys from an obj
export const pick = (obj, keys) =>
  Object.keys(obj)
    .filter((i) => keys.includes(i))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});
