import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, useCdn, token } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
  stega: {
    studioUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000") + "/studio",
  },
  token: token,
});

// Create a client for server-side operations with token
export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Always false for server-side
  token: token,
  perspective: "published",
});
