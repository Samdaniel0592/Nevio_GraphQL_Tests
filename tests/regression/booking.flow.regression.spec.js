import { cfg } from '../../src/config/env.mjs';
import { getAccessToken } from '../../src/services/token.service.mjs';
import { getOffers } from '../../src/services/shop.service.mjs';
import { OffersResponseSchema } from '../../src/schemas/offer.schema.mjs';
import offers from '../../src/data/offers.json' assert { type: 'json' };
.
describe('Booking flow (regression)', () => {
  let token;
  beforeAll(async () => { token = await getAccessToken(); });

  test('can retrieve offers and validate SKU structure', async () => {
    const resp = await getOffers({ baseURL: cfg.shopUrl, token, offerRequest: offers });

    // Optional Zod validation to catch regressions early
    const parsed = OffersResponseSchema.safeParse(resp);
    if (!parsed.success) {
      throw new Error('Offer response schema mismatch: ' + JSON.stringify(parsed.error.issues, null, 2));
    }

    const skus = resp?.connections?.[0]?.flightProducts?.[0]?.flightSKUs ?? [];
    expect(skus.length).toBeGreaterThan(0);
    expect(skus[0].SKUId).toBeTruthy();
  });

  // TODO: Extend with end-to-end:
  // 1) checkoutInitiate -> capture checkoutId
  // 2) checkoutPassengers -> add ADT/CHD/INF as needed
  // 3) checkoutUpdate -> choose SKUs, baggage, seats
  // 4) checkoutConfirm -> assert totals and status
  // 5) retrieveOrder -> verify orderId, pax, segments, totals
});
