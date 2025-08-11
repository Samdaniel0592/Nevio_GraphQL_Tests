import { getAccessToken } from '../../src/services/token.service.mjs';

test('token endpoint is healthy', async () => {
  const token = await getAccessToken();
  expect(typeof token).toBe('string');
  expect(token.length).toBeGreaterThan(10);
});
