[![Issue][issue-image]][issue-url]

[issue-image]: https://img.shields.io/github/issues/vespaiach/just-hooks
[issue-url]: https://github.com/vespaiach/just-hooks/issues

# just-hooks

A collection of useful React Hooks and utility functions help to speed up web development.

# Usage

```
npm install just-hooks --save
yarn add just-hooks -S

import { useTransferList, safeFetch, useLocalStoragej } from 'just-hooks';
```

# List of just-hooks

## Transfering List

Given two lists `startList` and `endList`, this hook will help to their items back and forth.

```
const {
  startList,
  endList,
  transfer,
  withdraw
} = useTransferList(initialStartList, [initialEndList])
```

- startList: start list (can be list of number, string or object that has an id key)
- endList: end list (can be list of number, string or object that has an id key)
- transfer: transfer() function will move item from `startList` to `endList`
- withdraw: withdraw() function will move item back from `endList` to `startList`
- [initialEndList]: is optional.

## Wrap Fetch Function

A utility function help to combine fetch's two-stage calls into one call and make sure all exceptions are catched. Response of this function will give either `data` or `error`:

```
import { useTransferList, safeFetch } from 'just-hooks';
const response = await safeFetch('url/api');

// success
{
  ok: true,
  data: 'response data', // <- response from server
  origin: Response // <- response instance of fetch request
}

// fail
{
  ok: false,
  error: 'response data', // <- response from server
  origin: Response // <- response instance of fetch request
}
```

The response's error is an instance of APIError:

```
if (!response.ok) {
  /**
   * Instance of APIError has three members:
   *   - `message`: error message
   *   - `code`: Http status, some unexpected error will give `unknown` code
   *   - `data`: error data that server has returned
   */
  response.error
}
```

### Use Local Storage

A React Hook helps to synchronize state to local storage.

```
const [value, setValue] = useLocalStorage(stringKeyOrFunction, initialValue, options)
```

Parameters:

- `stringKeyOrFunction`: storage key. It can be either a string or a function that return a string
- `initialValue`: start value
- `options`: is optional. It is an object with two possible functions:
  - `parse(string) => value`: by default, it is `JSON.parse`
  - `stringify(value) => string`: by default, it is `JSON.stringify`

Example:

```
const [loaded, setLoaded] = useLocalStorage<boolean>(()=> 'KEY', true, {
  parse: (str) => str === '1',
  stringify: (val) => val ? '1' : '0',
})
```

# Support Browsers List

[defaults, not IE 11](https://browserslist.dev/?q=ZGVmYXVsdHMsIG5vdCBJRSAxMQ%3D%3D)
