import { createClient, SanityClient } from "next-sanity";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!projectId) return null;
  if (!_client) {
    _client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: process.env.NODE_ENV === "production",
      token: process.env.SANITY_API_READ_TOKEN,
    });
  }
  return _client;
}

// Keep a named export for the studio config which needs a real client
export const client = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const c = getClient();
    if (!c) return () => Promise.resolve(null);
    return (c as unknown as Record<string | symbol, unknown>)[prop];
  },
});
