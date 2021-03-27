import { useState } from 'react';

var defaultEqualityCompare = function defaultEqualityCompare(item, addOrRemoveItem) {
  var typeofItem = typeof item;
  var typeofAddOrRemoveItem = typeof addOrRemoveItem;

  if (typeofItem === 'number' && typeofAddOrRemoveItem === 'number' || typeofItem === 'string' && typeofAddOrRemoveItem === 'string') {
    return item === addOrRemoveItem;
  }

  return item.id === addOrRemoveItem.id;
};
/**
 *
 * @param initialList list of initial items. Item's type can be number, string or object that has an `id` field
 * @param equalityCompareFn (optional) comparing function filter out items that are removed from lists. Return true will keep items or false to remove them
 * @returns
 * {
 *   start: list of initial items,
 *   end: list of items that have been transfered to,
 *   add(): transfer item to end list,
 *   remove(): transfer item back to start list
 * }
 */


function useTransferList(initialList, equalityCompareFn) {
  if (equalityCompareFn === void 0) {
    equalityCompareFn = defaultEqualityCompare;
  }

  var _useState = useState(initialList),
      start = _useState[0],
      setStart = _useState[1];

  var _useState2 = useState([]),
      end = _useState2[0],
      setEnd = _useState2[1];

  var add = function add(item) {
    var index = start.findIndex(function (it) {
      return equalityCompareFn(it, item);
    });

    if (index > -1) {
      setStart(start.filter(function (it) {
        return !equalityCompareFn(item, it);
      }));
      setEnd([].concat(end, [item]));
    }
  };

  var remove = function remove(item) {
    var index = end.findIndex(function (it) {
      return equalityCompareFn(it, item);
    });

    if (index > -1) {
      setStart([].concat(start, [item]));
      setEnd(end.filter(function (it) {
        return !equalityCompareFn(item, it);
      }));
    }
  };

  return {
    start: start,
    end: end,
    add: add,
    remove: remove
  };
}

export { useTransferList };
//# sourceMappingURL=just-hooks.esm.js.map
