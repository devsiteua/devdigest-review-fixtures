import { describe, expect, it } from 'vitest';
import { createRouter, type RequestContext } from '../src/http/router';

const noopHandler = (_request: RequestContext): null => null;

describe('createRouter', () => {
  it('records registered routes in order', () => {
    const router = createRouter();

    router.get('/orders', noopHandler);
    router.post('/orders', noopHandler);

    expect(router.routes).toEqual([
      { method: 'GET', path: '/orders', handler: noopHandler },
      { method: 'POST', path: '/orders', handler: noopHandler },
    ]);
  });

  it('starts without routes', () => {
    expect(createRouter().routes).toHaveLength(0);
  });
});
