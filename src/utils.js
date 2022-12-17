export function addMask(value, prevValue) {
  if (value.length > prevValue.length) {
    if (!(/[0-9]/.test(value[value?.length - 1]))) {
      return prevValue;
    }
    if (value.length === 2 || value.length === 7 || value.length === 10) {
      return `${value.slice(0, value.length - 1)}-${value[value.length - 1]}`;
    }
    if (value.length === 13) {
      return value.slice(0, value.length - 1);
    }
    return value;
  }
  return value;
}