import { GqlClient } from '../utils/gqlClient.mjs';

/**
 * Example offers query – adjust field names to match your schema
 */
export async function getOffers({ baseURL, token, offerRequest }) {
  const client = new GqlClient({
    baseURL,
    headers: { Authorization: token }
  });
  await client.init();
  const query = `
    query GetOffers($req: OfferRequest!) {
      getOffers(OfferRequest: $req) {
        response {
          connections {
            flightProducts {
              flightSKUs { SKUId SKUCode SKUName seatsLeft }
            }
          }
        }
      }
    }`;
  const data = await client.execute({ query, variables: { req: offerRequest } });
  await client.dispose();
  return data.getOffers.response;
}
