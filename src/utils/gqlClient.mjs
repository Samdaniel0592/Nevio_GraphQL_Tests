import { request as pwRequest } from 'playwright';

/**
 * Minimal GraphQL client over Playwright's APIRequestContext
 * baseURL should be the absolute GraphQL endpoint (POST)
 */
export class GqlClient {
  constructor({ baseURL, headers = {} }) {
    this.baseURL = baseURL;
    this.headers = { 'content-type': 'application/json', ...headers };
    this.ctx = null;
  }
  async init() {
    this.ctx = await pwRequest.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: this.headers
    });
  }
  async execute({ query, variables }) {
    const res = await this.ctx.post('', { data: { query, variables } });
    const json = await res.json();
    if (!res.ok()) throw new Error(`HTTP ${res.status()}: ${JSON.stringify(json)}`);
    if (json.errors?.length) throw new Error(`GraphQL: ${JSON.stringify(json.errors)}`);
    return json.data;
  }
  async dispose() {
    await this.ctx?.dispose();
  }
}
