import fs from 'fs';
import path from 'path';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const delay = 100;
    const spy = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(cb, delay);
    expect(spy).toHaveBeenCalledWith(cb, delay);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    const delay = 100;
    doStuffByTimeout(cb, delay);
    expect(cb).not.toHaveBeenCalled();
    jest.runOnlyPendingTimers();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const delay = 100;
    const spyInterval = jest.spyOn(global, 'setInterval');
    doStuffByInterval(cb, delay);
    expect(spyInterval).toHaveBeenCalledTimes(1);
    expect(spyInterval).toHaveBeenCalledWith(cb, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const delay = 100;
    doStuffByInterval(cb, delay);
    expect(cb).not.toHaveBeenCalled();
    jest.advanceTimersByTime(delay);
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(delay);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const rfFake = jest.fn(() => Promise.resolve());
    const spy = jest.spyOn(path, 'join');
    jest.mock('fs/promises', () => ({
      readFile: rfFake,
    }));
    await readFileAsynchronously('./index.ts');
    expect(spy).toHaveBeenCalledWith(expect.any(String), './index.ts');
  });

  test('should return null if file does not exist', async () => {
    const mockSync = jest.fn().mockReturnValue(false);
    jest.doMock('fs/promises', () => ({ mockSync }));
    expect(await readFileAsynchronously('nonexistent.txt')).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    const innerText = 'inner text';
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(innerText);
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

    expect(await readFileAsynchronously('./index.ts')).toBe(innerText);
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), './index.ts');
    expect(fs.existsSync).toHaveBeenCalledWith(expect.any(String));
    expect(fs.promises.readFile).toHaveBeenCalled();
  });
});
