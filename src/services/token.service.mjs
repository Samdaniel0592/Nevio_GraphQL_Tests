import { request as pwRequest } from 'playwright';
import { cfg } from '../config/env.mjs';

/**
 * Adjust body/headers if your IDP expects x-www-form-urlencoded:
 *   const body = new URLSearchParams({
 *     client_id: cfg.auth.clientId,
 *     client_secret: cfg.auth.clientSecret,
 *     grant_type: 'client_credentials',
 *     scope: cfg.auth.scope
 *   }).toString();
 *   headers: { 'content-type': 'application/x-www-form-urlencoded' }
 */
export async function getAccessToken() {
  const ctx = await pwRequest.newContext({
    baseURL: cfg.tokenBaseUrl,
    extraHTTPHeaders: { 'content-type': 'application/json' }
  });

  const res = await ctx.post('', {
    data: {
      client_id: cfg.auth.clientId,
      client_secret: cfg.auth.clientSecret,
      grant_type: 'client_credentials',
      scope: cfg.auth.scope
    }
  });
  const body = await res.json();
  await ctx.dispose();
  if (!res.ok()) throw new Error(`Token error: ${res.status()} ${JSON.stringify(body)}`);
  if (!body.access_token) throw new Error(`No access_token in response: ${JSON.stringify(body)}`);
  return body.access_token;
}
