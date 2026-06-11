// Seeds all 6 projects from the original HTML site into Sanity
// Uploads each image from picsum.photos as a Sanity asset, then creates project documents

import https from "https";
import http from "http";
import { createClient } from "@sanity/client";

const PROJECT_ID = "oggp809l";
const DATASET = "production";
const TOKEN = "skFQE8R5dnxfwRmNYUbs0mjyz3lijAGI4Vhv86xr9vpkVvWx0RjYrbaj4qwxZI2DtfikNQOhQogiUcFf1";

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const PROJECTS = [
  {
    slug: "quiet-faces",
    title: "Quiet Faces",
    tagline: "A study of stillness in twelve strangers",
    code: "POR-0126",
    category: "Portrait",
    year: "2026",
    location: "Lisbon, PT",
    description: "Twelve strangers, one chair, no direction. Each sitter was given five minutes of silence before the first frame — the series begins where the posing ends.",
    cover: "https://picsum.photos/id/1027/900/1125",
    photos: [
      "https://picsum.photos/id/1005/1600/900",
      "https://picsum.photos/id/64/800/1000",
      "https://picsum.photos/id/65/800/1000",
      "https://picsum.photos/id/91/800/1000",
      "https://picsum.photos/id/338/800/1000",
      "https://picsum.photos/id/823/1600/900",
      "https://picsum.photos/id/660/800/1000",
    ],
    order: 1,
  },
  {
    slug: "the-vows",
    title: "The Vows",
    tagline: "Weddings shot like documentaries",
    code: "WED-0925",
    category: "Wedding",
    year: "2025",
    location: "Sintra, PT",
    description: "No staged kisses, no jumping group shots. A season of weddings photographed from the inside — the hands, the waiting, the two minutes nobody remembers but everybody felt.",
    cover: "https://picsum.photos/id/1019/900/1125",
    photos: [
      "https://picsum.photos/id/1035/1600/900",
      "https://picsum.photos/id/1043/800/1000",
      "https://picsum.photos/id/1044/800/1000",
      "https://picsum.photos/id/152/800/1000",
      "https://picsum.photos/id/158/800/1000",
      "https://picsum.photos/id/1045/1600/900",
      "https://picsum.photos/id/1041/800/1000",
    ],
    order: 2,
  },
  {
    slug: "city-of-strangers",
    title: "City of Strangers",
    tagline: "Street photography, one winter, one city",
    code: "STR-0825",
    category: "Street",
    year: "2025",
    location: "Porto, PT",
    description: "Four months of walking the same six streets at the same hour. The city never repeated itself once.",
    cover: "https://picsum.photos/id/1058/900/1125",
    photos: [
      "https://picsum.photos/id/1047/1600/900",
      "https://picsum.photos/id/1067/800/1000",
      "https://picsum.photos/id/122/800/1000",
      "https://picsum.photos/id/129/800/1000",
      "https://picsum.photos/id/142/800/1000",
      "https://picsum.photos/id/167/1600/900",
      "https://picsum.photos/id/171/800/1000",
    ],
    order: 3,
  },
  {
    slug: "north",
    title: "North",
    tagline: "A travel diary without people in it",
    code: "TRV-0625",
    category: "Travel",
    year: "2025",
    location: "Iceland & Faroe",
    description: "Three weeks driving north until the road ran out. Landscapes photographed the way you meet strangers — briefly, and without asking too much.",
    cover: "https://picsum.photos/id/1015/900/1125",
    photos: [
      "https://picsum.photos/id/1016/1600/900",
      "https://picsum.photos/id/1018/800/1000",
      "https://picsum.photos/id/1039/800/1000",
      "https://picsum.photos/id/29/800/1000",
      "https://picsum.photos/id/110/800/1000",
      "https://picsum.photos/id/1040/1600/900",
      "https://picsum.photos/id/116/800/1000",
    ],
    order: 4,
  },
  {
    slug: "studio-sessions",
    title: "Studio Sessions",
    tagline: "Editorial portraits on one grey backdrop",
    code: "EDT-0425",
    category: "Editorial",
    year: "2025",
    location: "Studio, Lisbon",
    description: "One backdrop, one light, twenty sessions. When everything else is held constant, all that is left in the frame is the person.",
    cover: "https://picsum.photos/id/823/900/1125",
    photos: [
      "https://picsum.photos/id/824/1600/900",
      "https://picsum.photos/id/219/800/1000",
      "https://picsum.photos/id/334/800/1000",
      "https://picsum.photos/id/433/800/1000",
      "https://picsum.photos/id/553/800/1000",
      "https://picsum.photos/id/627/1600/900",
      "https://picsum.photos/id/835/800/1000",
    ],
    order: 5,
  },
  {
    slug: "one-day",
    title: "One Day",
    tagline: "A single day, photographed every hour",
    code: "DOC-0224",
    category: "Documentary",
    year: "2024",
    location: "Lisbon, PT",
    description: "From the first ferry to the last tram: one ordinary Tuesday, one frame every hour, no second takes. A document of the day nothing happened.",
    cover: "https://picsum.photos/id/1011/900/1125",
    photos: [
      "https://picsum.photos/id/1057/1600/900",
      "https://picsum.photos/id/1059/800/1000",
      "https://picsum.photos/id/1060/800/1000",
      "https://picsum.photos/id/1062/800/1000",
      "https://picsum.photos/id/177/800/1000",
      "https://picsum.photos/id/203/1600/900",
      "https://picsum.photos/id/870/800/1000",
    ],
    order: 6,
  },
];

function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    const follow = (u, redirects = 0) => {
      if (redirects > 5) return reject(new Error("Too many redirects"));
      const mod = u.startsWith("https") ? https : http;
      mod.get(u, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return follow(res.headers.location, redirects + 1);
        }
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers["content-type"] || "image/jpeg" }));
        res.on("error", reject);
      }).on("error", reject);
    };
    follow(url);
  });
}

async function uploadImage(url) {
  console.log(`  Uploading: ${url}`);
  const { buffer, contentType } = await fetchBuffer(url);
  const asset = await client.assets.upload("image", buffer, {
    contentType,
    filename: url.split("/").slice(-3).join("-") + ".jpg",
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function deleteExistingProjects() {
  const existing = await client.fetch('*[_type == "project"]._id');
  if (existing.length > 0) {
    console.log(`Deleting ${existing.length} existing project(s)...`);
    for (const id of existing) {
      await client.delete(id);
    }
  }
}

async function main() {
  console.log("Starting seed...\n");
  await deleteExistingProjects();

  for (const p of PROJECTS) {
    console.log(`\nProject [${p.order}/6]: ${p.title}`);

    console.log("  Cover image...");
    const coverImage = await uploadImage(p.cover);

    const photoAssets = [];
    for (let i = 0; i < p.photos.length; i++) {
      console.log(`  Photo ${i + 1}/${p.photos.length}...`);
      photoAssets.push(await uploadImage(p.photos[i]));
    }

    const doc = {
      _type: "project",
      _id: `project-${p.slug}`,
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      tagline: p.tagline,
      code: p.code,
      category: p.category,
      year: p.year,
      location: p.location,
      description: p.description,
      coverImage,
      photos: photoAssets,
      order: p.order,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${p.title} saved`);
  }

  console.log("\n✓ All 6 projects seeded successfully!");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
