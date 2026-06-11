import { client } from "./client";

export async function getSiteSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      siteName, tagline, statement,
      aboutText, aboutPortrait,
      basedIn, working, since, focus, bookingStatus,
      email, instagram, behance, vsco
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getAllProjects() {
  return client.fetch(
    `*[_type == "project"] | order(order asc){
      _id, title, "slug": slug.current,
      code, category, year, location, tagline,
      coverImage
    }`,
    {},
    { next: { revalidate: 60 } }
  );
}

export async function getProject(slug: string) {
  return client.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      _id, title, "slug": slug.current,
      code, category, year, location, tagline, description,
      coverImage, photos
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export async function getAdjacentProjects(slug: string) {
  const all = await getAllProjects();
  const idx = all.findIndex((p: { slug: string }) => p.slug === slug);
  const n = all.length;
  return {
    prev: all[(idx - 1 + n) % n],
    next: all[(idx + 1) % n],
  };
}
