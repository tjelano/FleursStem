console.log("Vercel build: NEXT_PUBLIC_SANITY_DATASET =", process.env.NEXT_PUBLIC_SANITY_DATASET);

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-31";

export const dataset = "production";

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const useCdn = false;

// CORS configuration
export const corsOrigins = process.env.SANITY_CORS_ORIGINS 
  ? process.env.SANITY_CORS_ORIGINS.split(',') 
  : ['http://localhost:3000', 'http://localhost:3001'];

export const token = process.env.SANITY_API_TOKEN;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
