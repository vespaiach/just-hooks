[![MIT license][license-image]][npm-url] [![Issue][issue-image]][issue-url]

[license-image]: https://img.shields.io/github/license/vespaiach/just-hooks
[npm-url]: https://www.npmjs.com/package/just-hooks
[issue-image]: https://img.shields.io/github/issues/vespaiach/just-hooks
[issue-url]: https://github.com/vespaiach/just-hooks/issues

# just-hooks

Just a collection of useful React Hooks.

## Transfering List

Given two lists `start` and `end` and we want to transfer their items back and forth.

```
const {
  start,
  end,
  add,
  remove
} = useTransferList(initialList, equalityCompareFn)
```

- start: start list (can be list of number, string or object that has an id key)
- end: end list (can be list of number, string or object that has an id key)
- add: add() function will move item from `start` to `end`
- remove: remove() function will move item back from `end` to `start`
- equalityCompareFn: is optional function which is used to compare items in list with items being added or removed to see if they are matched. Default is `===`.
