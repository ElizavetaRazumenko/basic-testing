import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual('./index');
  return {
    ...originalModule,
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const fakeLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(fakeLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const fakeLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(fakeLog).toHaveBeenCalled();
  });
});
