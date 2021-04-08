import { useState } from 'react';

const equalityCompare: (item: any, addOrRemoveItem: any) => boolean = (
  item,
  addOrRemoveItem
) => {
  const typeofItem = typeof item;
  const typeofAddOrRemoveItem = typeof addOrRemoveItem;

  if (
    (typeofItem === 'number' && typeofAddOrRemoveItem === 'number') ||
    (typeofItem === 'string' && typeofAddOrRemoveItem === 'string')
  ) {
    return item === addOrRemoveItem;
  }

  return item.id === addOrRemoveItem.id;
};

export interface KeyedObject {
  id: string | number;
}

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
export default function useTransferList<
  T extends number | string | KeyedObject
>(initialStartList: T[], initialEndList?: T[]) {
  const [startList, setStartList] = useState<T[]>(initialStartList);
  const [endList, setEndList] = useState<T[]>(initialEndList || []);

  const transfer = (item: T) => {
    const index = startList.findIndex(it => equalityCompare(it, item));
    if (index > -1) {
      const items = startList.splice(index, 1);
      setEndList([...endList, ...items]);
      setStartList(startList);
    }
  };

  const withdraw = (item: T) => {
    const index = endList.findIndex(it => equalityCompare(it, item));
    if (index > -1) {
      const items = endList.splice(index, 1);
      setStartList([...startList, ...items]);
      setEndList(endList);
    }
  };

  return {
    startList,
    endList,
    transfer,
    withdraw,
  };
}
