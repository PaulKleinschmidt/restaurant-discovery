import { z } from 'zod';

const Location = z.object({
  lat: z.number(),
  lng: z.number(),
});

const Geometry = z.object({
  location: Location,
  viewport: z.object({
    northeast: Location,
    southwest: Location,
  }),
});

const OpeningHours = z.object({
  open_now: z.boolean(),
});

const Photo = z.object({
  height: z.number(),
  html_attributions: z.string().array(),
  photo_reference: z.string(),
  width: z.number(),
});

const PlusCode = z.object({
  compound_code: z.string(),
  global_code: z.string(),
});

export const Restaurant = z.object({
  // Required
  place_id: z.string(),
  geometry: Geometry,
  user_ratings_total: z.number(),
  name: z.string(),
  rating: z.number(),
  // Optional
  business_status: z.string().optional(),
  formatted_address: z.string().optional(),
  icon: z.string().url().optional(),
  icon_background_color: z.string().optional(),
  icon_mask_base_uri: z.string().url().optional(),
  opening_hours: OpeningHours.optional(),
  photos: z.array(Photo).optional(),
  plus_code: PlusCode.optional(),
  price_level: z.number().optional(),
  reference: z.string().optional(),
  types: z.string().array().optional(),
  image: z.string().optional(),
});
export const RestaurantResults = z.array(Restaurant);

export type Restaurant = z.infer<typeof Restaurant>;
export type RestaurantResults = z.infer<typeof RestaurantResults>;
