import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 3, b: 0, action: Action.Add, expected: 3 },
    { a: -5, b: 2, action: Action.Add, expected: -3 },
    { a: 3, b: 1, action: Action.Subtract, expected: 2 },
    { a: -1, b: -5, action: Action.Subtract, expected: 4 },
    { a: -5, b: 10, action: Action.Subtract, expected: -15 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: -5, b: 1, action: Action.Multiply, expected: -5 },
    { a: 15, b: 0, action: Action.Multiply, expected: 0 },
    { a: 5, b: 5, action: Action.Divide, expected: 1 },
    { a: -10, b: 2, action: Action.Divide, expected: -5 },
    { a: 0, b: 2, action: Action.Divide, expected: 0 },
    { a: 2, b: 1, action: Action.Exponentiate, expected: 2 },
    { a: 5, b: 0, action: Action.Exponentiate, expected: 1 },
    { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },
    { a: 2, b: 1, action: 'Unknown action', expected: null },
    { a: null, b: 1, action: Action.Exponentiate, expected: null },
    
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'must perform algebraic functions, returning null in case of error',
    ({ expected, a, action, b }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
