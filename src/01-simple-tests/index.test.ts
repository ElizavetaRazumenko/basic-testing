import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 3, b: 0, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: -5, b: 2, action: Action.Add })).toBe(-3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 1, action: Action.Subtract })).toBe(2);
    expect(simpleCalculator({ a: -1, b: -5, action: Action.Subtract })).toBe(4);
    expect(simpleCalculator({ a: -5, b: 10, action: Action.Subtract })).toBe(-15);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(4);
    expect(simpleCalculator({ a: -5, b: 1, action: Action.Multiply })).toBe(-5);
    expect(simpleCalculator({ a: 15, b: 0, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 5, b: 5, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: -10, b: 2, action: Action.Divide })).toBe(-5);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Divide })).toBe(0);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: Action.Exponentiate })).toBe(2);
    expect(simpleCalculator({ a: 5, b: 0, action: Action.Exponentiate })).toBe(1);
    expect(simpleCalculator({ a: 3, b: 5, action: Action.Exponentiate })).toBe(243);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 1, action: 'Unknown action' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: null, b: 1, action: 'Unknown action' })).toBeNull();
  });
});
