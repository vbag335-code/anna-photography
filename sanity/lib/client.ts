import { createClient, SanityClient } from "next-sanity";

let _client: SanityClient | null = null;

export function getClient(): SanityClient | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "oggp809l";
  if (!_client) {
    _client = createClient({
      projectId,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_API_READ_TOKEN,
    });
  }
  return _client;
}

export const client = new Proxy({} as SanityClient, {
  get(_target, prop) {
    const c = getClient();
    if (!c) return () => Promise.resolve(null);
    const value = (c as unknown as Record<string | symbol, unknown>)[prop];
    if (typeof value === "function") {
      return (value as Function).bind(c);
    }
    return value;
  },
});
