/**
 * Save and retrieve value from local storage
 * @param keyOrFn {string | function} local storage key
 * @param initialValue {T} initial value
 * @param options {Object} provide two optional functions for parsing string to object and stringify object to string.
 */
export default function useLocalStorage<T>(keyOrFn: string | (() => string), initialValue: T, options?: {
    parse?: (strVal: string) => T;
    stringify?: (val: T) => string;
}): [T, (val: T) => void];
