export function validate(value: any) {
  const regexp = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
  return typeof value === 'string' && regexp.test(value);
}
