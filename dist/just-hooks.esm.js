import { useState } from 'react';

var equalityCompare = function equalityCompare(item, addOrRemoveItem) {
  var typeofItem = typeof item;
  var typeofAddOrRemoveItem = typeof addOrRemoveItem;

  if (typeofItem === 'number' && typeofAddOrRemoveItem === 'number' || typeofItem === 'string' && typeofAddOrRemoveItem === 'string') {
    return item === addOrRemoveItem;
  }

  return item.id === addOrRemoveItem.id;
};
/**
 *
 * @param initialStartList list of initial start items. Item's type can be number, string or object that has an `id` field
 * @param initialEndList (optional) list of initial end items. Item's type can be number, string or object that has an `id` field
 * @returns
 * {
 *   startList: list of initial items,
 *   endList: list of items that have been transfered to,
 *   transfer(): transfer item to end list,
 *   withdraw(): withdraw item back to start list
 * }
 */


function useTransferList(initialStartList, initialEndList) {
  var _useState = useState(initialStartList),
      startList = _useState[0],
      setStartList = _useState[1];

  var _useState2 = useState(initialEndList || []),
      endList = _useState2[0],
      setEndList = _useState2[1];

  var transfer = function transfer(item) {
    var index = startList.findIndex(function (it) {
      return equalityCompare(it, item);
    });

    if (index > -1) {
      var items = startList.splice(index, 1);
      setEndList([].concat(endList, items));
      setStartList(startList);
    }
  };

  var withdraw = function withdraw(item) {
    var index = endList.findIndex(function (it) {
      return equalityCompare(it, item);
    });

    if (index > -1) {
      var items = endList.splice(index, 1);
      setStartList([].concat(startList, items));
      setEndList(endList);
    }
  };

  return {
    startList: startList,
    endList: endList,
    transfer: transfer,
    withdraw: withdraw
  };
}

export { useTransferList };
//# sourceMappingURL=just-hooks.esm.js.map
