'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

const equalityCompare = (item, addOrRemoveItem) => {
  const typeofItem = typeof item;
  const typeofAddOrRemoveItem = typeof addOrRemoveItem;

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
  const [startList, setStartList] = react.useState(initialStartList);
  const [endList, setEndList] = react.useState(initialEndList || []);

  const transfer = item => {
    const index = startList.findIndex(it => equalityCompare(it, item));

    if (index > -1) {
      const items = startList.splice(index, 1);
      setEndList([...endList, ...items]);
      setStartList(startList);
    }
  };

  const withdraw = item => {
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
    withdraw
  };
}

class APIError extends Error {
  constructor(message, code, data) {
    super(message);
    this.code = code || 'Unknown';
    this.data = data;
  }

  toString() {
    return `[${this.code}] ${this.message}`;
  }

}

const getResponseType = contentType => {
  if (contentType.indexOf('application/json') > -1 || contentType.indexOf('application/ld+json') > -1 || contentType.indexOf('application/vnd.api+json') > -1) {
    return 'json';
  } else if (contentType.indexOf('text/') > -1 || contentType.indexOf('application/javascript') > -1) {
    return 'text';
  } else if (contentType.indexOf('multipart/form-data') > -1) {
    return 'formData';
  } else if (contentType.indexOf('image/') > -1 || contentType.indexOf('audio/') > -1 || contentType.indexOf('application/zip') > -1 || contentType.indexOf('application/pdf') > -1 || contentType.indexOf('application/msword') > -1) {
    return 'blob';
  } else {
    return null;
  }
};

async function safeFetch(input, init) {
  try {
    const response = await fetch(input, init);
    const contenttype = response.headers.get('Content-Type');
    const responseType = contenttype ? getResponseType(contenttype.toLocaleLowerCase()) : null;
    let data;
    let ok = response.ok;

    if (responseType) {
      try {
        data = await response[responseType]();

        if (!response.ok) {
          data = new APIError(response.statusText, String(response.status), data);
        }
      } catch (error) {
        ok = false;
        data = new APIError(error.toString());
      }
    } else {
      data = new APIError('Unsupport header content-type: ' + contenttype);
      ok = false;
    }

    if (ok) {
      return {
        ok: true,
        data: data,
        origin: response
      };
    } else {
      return {
        ok: false,
        error: data,
        origin: response
      };
    }
  } catch {
    return {
      ok: false,
      error: new APIError('Unexpected error')
    };
  }
}

exports.APIError = APIError;
exports.safeFetch = safeFetch;
exports.useTransferList = useTransferList;
//# sourceMappingURL=just-hooks.cjs.development.js.map
