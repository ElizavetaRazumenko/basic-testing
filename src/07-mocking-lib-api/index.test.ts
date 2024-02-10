import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const queryParam = '/posts';
    const spy = jest.spyOn(axios, 'create');
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: null });
    await throttledGetDataFromApi(queryParam);
    expect(spy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const queryParam = '/posts';
    const axiosGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: null });
    await throttledGetDataFromApi(queryParam);
    jest.runOnlyPendingTimers();
    expect(axiosGetSpy).toHaveBeenCalledWith(queryParam);
  });

  test('should return response data', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: [{ id: 1 }] });
    const result = await throttledGetDataFromApi('/posts');
    expect(result[0].id).toEqual(1);
  });
});
