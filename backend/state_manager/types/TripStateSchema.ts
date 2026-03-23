import { z } from 'zod';

export const TripStateSchema = z.object({
  trip_id: z.string(),
  metadata: z.object({
    status: z.enum(['draft', 'active', 'completed', 'cancelled']),
    current_tier: z.number().int().min(1).max(5),
    last_updated: z.string().datetime(),
  }),
  tier_1_raw: z.record(z.any()).optional(),
  tier_2_nlp: z.object({
    intent: z.string(),
    parameters: z.record(z.any()),
  }).optional(),
  tier_3_logistics: z.object({
    itinerary: z.array(z.any()),
    cost_audit: z.record(z.any()),
  }).optional(),
  tier_4_alerts: z.array(z.any()).optional(),
  tier_5_ui: z.object({
    active_filter: z.string(),
    persona_data: z.record(z.any()),
  }).optional(),
});

export type TripState = z.infer<typeof TripStateSchema>;
