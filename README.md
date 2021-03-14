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
- add: add() function will move item from start to end
- remove: remove() function will move item back from end to start
- equalityCompareFn: is optional. This function will compare item in list with item being added or removed to see if they are matched
