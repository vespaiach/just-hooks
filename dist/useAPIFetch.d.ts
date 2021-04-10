import { APIResponse } from './wrapFetch';
export declare type ParamProperties = Record<string, string | number | boolean | null>;
export default function useAPIFetch(commonOptions?: Omit<RequestInit, 'method'>): {
    get: <T>(url: string, params?: Record<string, string | number | boolean | null> | undefined, headers?: Record<string, string> | undefined) => Promise<APIResponse<T>>;
    post: <T_1>(url: string, params?: Record<string, string | number | boolean | null> | undefined, headers?: Record<string, string> | undefined) => Promise<APIResponse<T_1>>;
    put: <T_2>(url: string, params?: Record<string, string | number | boolean | null> | undefined, headers?: Record<string, string> | undefined) => Promise<APIResponse<T_2>>;
    del: <T_3>(url: string, params?: Record<string, string | number | boolean | null> | undefined, headers?: Record<string, string> | undefined) => Promise<APIResponse<T_3>>;
    head: <T_4>(url: string, params?: Record<string, string | number | boolean | null> | undefined, headers?: Record<string, string> | undefined) => Promise<APIResponse<T_4>>;
    patch: <T_5>(url: string, params?: Record<string, string | number | boolean | null> | undefined, headers?: Record<string, string> | undefined) => Promise<APIResponse<T_5>>;
};
