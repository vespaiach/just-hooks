/**
 * @jest-environment jsdom
 */
import { act, renderHook } from '@testing-library/react-hooks';
import useLocalStorage from './useLocalStorage';

const STORAGE_KEY = 'STORAGE_KEY';

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    writable: true,
    value: {
      data: {},
      length: 0,
      setItem(name: string, value: string) {
        this.data[name] = value;
        this.length = Object.keys(this.data).length;
      },
      getItem(name: string) {
        return this.data[name];
      },
      removeItem(name: string) {
        delete this.data[name];
        this.length = Object.keys(this.data).length;
      },
    },
  });
});

test('should set initial value to local storage', () => {
  const { result } = renderHook(() =>
    useLocalStorage<{ name: string }>(STORAGE_KEY, { name: 'test' })
  );

  expect(result.current[0]).toEqual({ name: 'test' });
  expect(window.localStorage.data).toEqual({
    [STORAGE_KEY]: JSON.stringify({ name: 'test' }),
  });
});

test('should store value to local storage', () => {
  const { result } = renderHook(() =>
    useLocalStorage<{ name: string }>(STORAGE_KEY, { name: 'test' })
  );

  act(() => {
    result.current[1]({ name: 'test1' });
  });

  expect(result.current[0]).toEqual({ name: 'test1' });
  expect(window.localStorage.data).toEqual({
    [STORAGE_KEY]: JSON.stringify({ name: 'test1' }),
  });
});

test('should working with string value', () => {
  const { result } = renderHook(() =>
    useLocalStorage<string>(STORAGE_KEY, 'test value')
  );

  expect(result.current[0]).toBe('test value');

  act(() => {
    result.current[1]('test value 1');
  });

  expect(window.localStorage.data).toEqual({
    [STORAGE_KEY]: JSON.stringify('test value 1'),
  });
});

test('should working with boolean value', () => {
  const { result } = renderHook(() =>
    useLocalStorage<boolean>(STORAGE_KEY, true)
  );

  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1](false);
  });

  expect(window.localStorage.data).toEqual({
    [STORAGE_KEY]: JSON.stringify(false),
  });
});

test('storage key function should work', () => {
  const { result } = renderHook(() =>
    useLocalStorage<{ name: string }>(() => STORAGE_KEY, { name: 'test' })
  );

  expect(window.localStorage.data).toEqual({
    [STORAGE_KEY]: JSON.stringify({ name: 'test' }),
  });

  act(() => {
    result.current[1]({ name: 'test1' });
  });

  expect(window.localStorage.data).toEqual({
    [STORAGE_KEY]: JSON.stringify({ name: 'test1' }),
  });
});

test('custom parse and stringify should work', () => {
  const { result } = renderHook(() =>
    useLocalStorage<boolean>(() => STORAGE_KEY, true, {
      parse: s => s === '1',
      stringify: v => (v ? '1' : '0'),
    })
  );

  expect(result.current[0]).toBe(true);

  act(() => {
    result.current[1](false);
  });

  expect(result.current[0]).toBe(false);

  expect(window.localStorage.data).toEqual({
    [STORAGE_KEY]: '0',
  });
});
