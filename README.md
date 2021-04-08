[![Issue][issue-image]][issue-url]

[issue-image]: https://img.shields.io/github/issues/vespaiach/just-hooks
[issue-url]: https://github.com/vespaiach/just-hooks/issues

# just-hooks

Just a collection of useful React Hooks.

# Usage

```
npm install just-hooks --save
yarn add just-hooks -S

import { useTransferList } from 'just-hooks';
```

# Hooks

## Transfering List

Given two lists `startList` and `endList`, we want to transfer their items back and forth.

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
