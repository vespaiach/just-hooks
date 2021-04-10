export declare class APIError<T> extends Error {
    data: T | undefined;
    private code;
    constructor(message: string, code?: number, data?: T);
    toString(): string;
}
export declare type APIResponse<T = unknown> = {
    ok: true;
    data: T;
    origin: Response;
} | {
    ok: false;
    error: APIError<T>;
    origin?: Response;
};
export declare function safeFetch<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<APIResponse<T>>;
