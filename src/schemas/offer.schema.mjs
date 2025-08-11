import { z } from 'zod';

export const FlightSkuSchema = z.object({
  SKUId: z.string(),
  SKUCode: z.string().optional(),
  SKUName: z.string().optional(),
  seatsLeft: z.number().int().nonnegative().optional()
});

export const OffersResponseSchema = z.object({
  connections: z.array(z.object({
    flightProducts: z.array(z.object({
      flightSKUs: z.array(FlightSkuSchema)
    }))
  }))
});
