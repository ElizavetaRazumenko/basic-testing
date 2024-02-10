import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const testValue = 'Some test value';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(await resolveValue(testValue)).toBe(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(testValue)).toThrowError(testValue);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
