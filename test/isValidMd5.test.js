import isValidMd5 from '../utils/isValidMd5';

test('non-hex format', () => {
  expect(isValidMd5('123456A8B01234567890123G56789012')).toBe(false);
});

test('hex format', () => {
  expect(isValidMd5('ea2fd9732bf0a85522e8c11ce00d3371')).toBe(true);
});

test('length more than 32', () => {
  expect(isValidMd5('ea2fd9732bf0a85522e8c11ce00d3371h')).toBe(false);
});

test('length less than 32', () => {
  expect(isValidMd5('ea2fd9732bf0a85522e8c11ce00d337')).toBe(false);
});

test('alphabet "a" 32 letters', () => {
  expect(isValidMd5('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBe(true);
});
