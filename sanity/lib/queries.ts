import { client } from "./client";

const isSanityConfigured = () => !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export async function getSiteSettings() {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(
      `*[_type == "siteSettings"][0]{
        siteName, tagline, statement,
        aboutText, aboutPortrait,
        basedIn, working, since, focus, bookingStatus,
        email, instagram, behance, vsco
      }`,
      {},
      { cache: "no-store" }
    );
  } catch { return null; }
}

export async function getAllProjects() {
  if (!isSanityConfigured()) return [];
  try {
    return await client.fetch(
      `*[_type == "project"] | order(order asc){
        _id, title, "slug": slug.current,
        code, category, year, location, tagline,
        coverImage
      }`,
      {},
      { cache: "no-store" }
    );
  } catch { return []; }
}

export async function getProject(slug: string) {
  if (!isSanityConfigured()) return null;
  try {
    return await client.fetch(
      `*[_type == "project" && slug.current == $slug][0]{
        _id, title, "slug": slug.current,
        code, category, year, location, tagline, description,
        coverImage, photos
      }`,
      { slug },
      { cache: "no-store" }
    );
  } catch { return null; }
}

export async function getAdjacentProjects(slug: string) {
  const all = await getAllProjects();
  if (!all || all.length === 0) return { prev: null, next: null };
  const idx = all.findIndex((p: { slug: string }) => p.slug === slug);
  const n = all.length;
  return {
    prev: all[(idx - 1 + n) % n],
    next: all[(idx + 1) % n],
  };
}
