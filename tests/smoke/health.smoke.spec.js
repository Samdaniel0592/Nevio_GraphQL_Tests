import { getAccessToken } from '../../src/services/token.service.mjs';

describe('🏥 Health Checks - Smoke Tests', () => {
  test('🔐 Token endpoint should be healthy and return valid token', async () => {
    console.log('🔍 Testing authentication endpoint...');
    
    const token = await getAccessToken();
    
    console.log('✅ Authentication successful');
    console.log(`📏 Token length: ${token.length} characters`);
    
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(10);
    
    // Additional validation for token format
    expect(token).not.toContain(' '); // No spaces in tokens
    expect(token.trim()).toBe(token); // No leading/trailing whitespace
  });
});
