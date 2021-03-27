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
export default function useTransferList<T extends number | string | KeyedObject>(initialList: T[], equalityCompareFn?: (item: T, addOrRemoveItem: T) => boolean): {
    start: T[];
    end: T[];
    add: (item: T) => void;
    remove: (item: T) => void;
};
