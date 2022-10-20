/* eslint-disable no-param-reassign */
export default function sortObject(
  obj: any,
  keyOrder: string[],
  dontSortByUnicode: boolean
) {
  const res: {
    [index: string]: string;
  } = {};
  if (keyOrder) {
    keyOrder.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        res[key] = obj[key];
        delete obj[key];
      }
    });
  }
  const keys = Object.keys(obj);

  // eslint-disable-next-line no-unused-expressions
  !dontSortByUnicode && keys.sort();
  keys.forEach((key) => {
    res[key] = obj[key];
  });
  return res;
}
