import { AxiosHeaders } from 'axios';
declare global {
  type HttpResponse<T> = {
    data: T;
    headers: AxiosHeaders;
    request: XMLHttpRequest;
    status: number;
    statusText: string;
  };
}
