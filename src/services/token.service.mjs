import { request as pwRequest } from 'playwright';
import { cfg } from '../config/env.mjs';

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
  
  const cookies = await ctx.storageState();
  await ctx.dispose();
  
  // Look for AuthToken in cookies
  const authTokenCookie = cookies.cookies.find(c => c.name === 'AuthToken');
  if (authTokenCookie) {
    return authTokenCookie.value;
  }
  
  throw new Error('AuthToken cookie not found');
}
