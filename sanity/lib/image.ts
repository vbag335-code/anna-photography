import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function urlFor(source: SanityImageSource) {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const imageBuilder = createImageUrlBuilder({ projectId, dataset });
  return imageBuilder.image(source);
}
