import { generateToken } from '../src/utils';

test('token 1', () => {
  expect(generateToken()).not.toBeFalsy();
});

test('token 2', () => {
  expect(generateToken()).not.toBeFalsy();
});
