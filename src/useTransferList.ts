import { useState } from 'react';

const defaultEqualityCompare: (item: any, addOrRemoveItem: any) => boolean = (
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
export default function useTransferList<
  T extends number | string | KeyedObject
>(
  initialList: T[],
  equalityCompareFn: (
    item: T,
    addOrRemoveItem: T
  ) => boolean = defaultEqualityCompare
) {
  const [start, setStart] = useState<T[]>(initialList);
  const [end, setEnd] = useState<T[]>([]);

  const add = (item: T) => {
    const index = start.findIndex(it => equalityCompareFn(it, item));
    if (index > -1) {
      setStart(start.filter(it => !equalityCompareFn(item, it)));
      setEnd([...end, item]);
    }
  };

  const remove = (item: T) => {
    const index = end.findIndex(it => equalityCompareFn(it, item));
    if (index > -1) {
      setStart([...start, item]);
      setEnd(end.filter(it => !equalityCompareFn(item, it)));
    }
  };

  return {
    start,
    end,
    add,
    remove,
  };
}
