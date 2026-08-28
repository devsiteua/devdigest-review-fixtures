import type { User } from '../domain/models';

export type HttpMethod = 'GET' | 'POST';

export interface RequestContext {
  user: User;
  params: Readonly<Record<string, string>>;
}

export type Handler = (request: RequestContext) => unknown;

export interface Route {
  method: HttpMethod;
  path: string;
  handler: Handler;
}

export interface Router {
  get(path: string, handler: Handler): void;
  post(path: string, handler: Handler): void;
  readonly routes: readonly Route[];
}

export function createRouter(): Router {
  const routes: Route[] = [];

  return {
    get(path: string, handler: Handler): void {
      routes.push({ method: 'GET', path, handler });
    },
    post(path: string, handler: Handler): void {
      routes.push({ method: 'POST', path, handler });
    },
    routes,
  };
}
