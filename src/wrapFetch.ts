export class APIError<T> extends Error {
  public data: T | undefined;
  private code: string | undefined;

  constructor(message: string, code?: string, data?: T) {
    super(message);

    this.code = code || 'Unknown';
    this.data = data;
  }

  public toString() {
    return `[${this.code}] ${this.message}`;
  }
}

const getResponseType = (contentType: string) => {
  if (
    contentType.indexOf('application/json') > -1 ||
    contentType.indexOf('application/ld+json') > -1 ||
    contentType.indexOf('application/vnd.api+json') > -1
  ) {
    return 'json';
  } else if (
    contentType.indexOf('text/') > -1 ||
    contentType.indexOf('application/javascript') > -1
  ) {
    return 'text';
  } else if (contentType.indexOf('multipart/form-data') > -1) {
    return 'formData';
  } else if (
    contentType.indexOf('image/') > -1 ||
    contentType.indexOf('audio/') > -1 ||
    contentType.indexOf('application/zip') > -1 ||
    contentType.indexOf('application/pdf') > -1 ||
    contentType.indexOf('application/msword') > -1
  ) {
    return 'blob';
  } else {
    return null;
  }
};

export type APIResponse<T = unknown> =
  | {
      ok: true;
      data: T;
      origin: Response;
    }
  | {
      ok: false;
      error: APIError<T>;
      origin?: Response;
    };

export async function safeFetch<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<APIResponse<T>> {
  try {
    const response = await fetch(input, init);
    const contenttype = response.headers.get('Content-Type');
    const responseType = contenttype
      ? getResponseType(contenttype.toLocaleLowerCase())
      : null;

    let data;
    let ok = response.ok;
    if (responseType) {
      try {
        data = (await response[responseType]()) as T;
        if (!response.ok) {
          data = new APIError(
            response.statusText,
            String(response.status),
            data
          );
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
        data: data as T,
        origin: response,
      };
    } else {
      return {
        ok: false,
        error: data as APIError<T>,
        origin: response,
      };
    }
  } catch {
    return {
      ok: false,
      error: new APIError('Unexpected error'),
    };
  }
}
