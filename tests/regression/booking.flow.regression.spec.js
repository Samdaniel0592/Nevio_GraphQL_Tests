import { cfg } from '../../src/config/env.mjs';
import { getAccessToken } from '../../src/services/token.service.mjs';
import { getOffers } from '../../src/services/shop.service.mjs';
import { OffersResponseSchema } from '../../src/schemas/offer.schema.mjs';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const testData = JSON.parse(fs.readFileSync(join(__dirname, '../../src/data/testdata.json'), 'utf8'));

describe('🛫 Booking Flow - Regression Tests', () => {
  let token;
  
  beforeAll(async () => { 
    console.log('🔐 Authenticating for regression tests...');
    token = await getAccessToken(); 
  });

  test.each(testData)('🎫 Should retrieve offers for $name', async ({ name, ...offerRequest }) => {
    console.log(`🔍 Testing route: ${offerRequest.trips.origin} → ${offerRequest.trips.destination}`);
    console.log(`📅 Departure: ${offerRequest.trips.departureDateTime}`);
    console.log(`👥 Passenger Type: ${offerRequest.passengers.passengerTypeCode}`);
    console.log(`🎯 Fare Type: ${offerRequest.fareTypes}`);
    
    const resp = await getOffers({ baseURL: cfg.shopUrl, token, offerRequest });

    // Schema validation with detailed error reporting
    const parsed = OffersResponseSchema.safeParse(resp);
    if (!parsed.success) {
      console.error('❌ Schema validation failed:', JSON.stringify(parsed.error.issues, null, 2));
      throw new Error('Offer response schema mismatch: ' + JSON.stringify(parsed.error.issues, null, 2));
    }

    const skus = resp?.connections?.[0]?.flightProducts?.[0]?.flightSKUs ?? [];
    console.log(`✅ Found ${skus.length} SKUs for ${name}`);
    
    expect(skus.length).toBeGreaterThan(0);
    expect(skus[0].SKUId).toBeTruthy();
    
    // Log success metrics
    if (skus.length > 0) {
      console.log(`📊 First SKU: ${skus[0].SKUId} - ${skus[0].SKUName || 'Unnamed'}`);
      if (skus[0].seatsLeft !== undefined) {
        console.log(`🪑 Seats available: ${skus[0].seatsLeft}`);
      }
    }
  });

  // TODO: Extend with end-to-end:
  // 1) checkoutInitiate -> capture checkoutId
  // 2) checkoutPassengers -> add ADT/CHD/INF as needed
  // 3) checkoutUpdate -> choose SKUs, baggage, seats
  // 4) checkoutConfirm -> assert totals and status
  // 5) retrieveOrder -> verify orderId, pax, segments, totals
});
