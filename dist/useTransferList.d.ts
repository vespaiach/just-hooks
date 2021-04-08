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
export default function useTransferList<T extends number | string | KeyedObject>(initialStartList: T[], initialEndList?: T[]): {
    startList: T[];
    endList: T[];
    transfer: (item: T) => void;
    withdraw: (item: T) => void;
};
