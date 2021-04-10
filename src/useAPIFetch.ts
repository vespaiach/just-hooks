import { APIResponse, safeFetch } from './wrapFetch';

export type ParamProperties = Record<string, string | number | boolean | null>;

const toQueryString = (params: ParamProperties) =>
  Object.entries(params).reduce(
    (acc, p) => `${acc}${acc === '' ? '' : '&'}${p}`,
    ''
  );

export default function useAPIFetch(
  commonOptions?: Omit<RequestInit, 'method'>
) {
  const request = async <T>(
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'HEAD',
    params?: ParamProperties,
    headers?: Record<string, string>
  ) => {
    let endpoint = url;
    let body = undefined;
    if (params) {
      if (method === 'GET' || method === 'HEAD') {
        endpoint =
          url.indexOf('?') > -1
            ? `${url}&${toQueryString(params)}`
            : `${url}?${toQueryString(params)}`;
      } else {
        body = JSON.stringify(params);
      }
    }

    return safeFetch<T>(endpoint, {
      ...commonOptions,
      headers: Object.assign({}, commonOptions?.headers, headers, {
        'Content-Type': 'application/json;charset=utf-8',
      }),
      method,
      body,
    });
  };

  const get = <T>(
    url: string,
    params?: ParamProperties,
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> => {
    return request<T>(url, 'GET', params, headers);
  };

  const post = <T>(
    url: string,
    params?: ParamProperties,
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> => {
    return request<T>(url, 'POST', params, headers);
  };

  const del = <T>(
    url: string,
    params?: ParamProperties,
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> => {
    return request<T>(url, 'DELETE', params, headers);
  };

  const head = <T>(
    url: string,
    params?: ParamProperties,
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> => {
    return request<T>(url, 'HEAD', params, headers);
  };

  const patch = <T>(
    url: string,
    params?: ParamProperties,
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> => {
    return request<T>(url, 'PATCH', params, headers);
  };

  const put = <T>(
    url: string,
    params?: ParamProperties,
    headers?: Record<string, string>
  ): Promise<APIResponse<T>> => {
    return request<T>(url, 'PUT', params, headers);
  };

  return {
    get,
    post,
    put,
    del,
    head,
    patch,
  };
}
