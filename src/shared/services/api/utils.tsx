import type { APIError, TEndpoint } from "./types";
import endpoints from './endpoints';
import type {Method} from 'axios';
import {forOwn} from 'lodash';
import type { IEndpoint } from "./endpoints";

export const defaultError: APIError = {
  title: 'Goblin attack!',
  message: 'An unknown error has occurred :(',
};

export function EndpointService(end: TEndpoint | IEndpoint): Endpoint {
  if(typeof end === 'string') {
    const output = (endpoints as any)[end];
    return new Endpoint(output);
  }
  return new Endpoint(end);
}

export class Endpoint {
  method: Method;
  url: string;

  constructor(input?: TEndpoint) {
    if(!input) {
      throw new Error("Input missing");
    }
    const [url, method="get"] = input;
    this.method = method;
    this.url = url;
  }

  fromArray([url, method]: TEndpoint) {
    this.method = method || 'get';
    this.url = url;
  }

  static from(e: IEndpoint): Endpoint {
    return new Endpoint(endpoints[e]);
  }

  getFinalUrl(data: Record<string, any>): string {
    let output = '';
    forOwn(data, (value, param) => {
      output = this.url?.replace(new RegExp(`{${param}}`, 'g'), () =>
        String(value),
      );
    });
    return output;
  }
}
