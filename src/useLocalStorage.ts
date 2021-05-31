import { useCallback, useState } from 'react';

/**
 * Save and retrieve value from local storage
 * @param keyOrFn {string | function} local storage key
 * @param initialValue {T} initial value
 * @param options {Object} provide two optional functions for parsing string to object and stringify object to string.
 */
export default function useLocalStorage<T>(
  keyOrFn: string | (() => string),
  initialValue: T,
  options?: { parse?: (strVal: string) => T; stringify?: (val: T) => string }
): [T, (val: T) => void] {
  const { parse = JSON.parse, stringify = JSON.stringify } = options || {};
  const storageKey = typeof keyOrFn === 'function' ? keyOrFn() : keyOrFn;

  const [val, setVal] = useState<T>(() => {
    try {
      const storedVal = localStorage.getItem(storageKey);
      if (storedVal !== null && storedVal !== undefined) {
        return parse(storedVal);
      } else {
        localStorage.setItem(storageKey, stringify(initialValue));
      }
    } catch (err) {
      if (__DEV__) {
        console.error(err);
      }
    }
    return initialValue;
  });

  const saveVal = useCallback(
    (val: T) => {
      try {
        setVal(val);
        localStorage.setItem(storageKey, stringify(val));
      } catch (err) {
        if (__DEV__) {
          console.error(err);
        }
      }
    },
    [setVal, storageKey, stringify]
  );

  return [val, saveVal];
}
