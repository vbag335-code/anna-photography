import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteName", title: "Site Name", type: "string", initialValue: "ANNA" }),
    defineField({ name: "tagline", title: "Tagline (below logo)", type: "string", initialValue: "Photography — people, places & the in-between" }),
    defineField({ name: "statement", title: "Hero statement", type: "text", rows: 2, initialValue: "Moments don't repeat.\nPhotographs do." }),

    defineField({ name: "aboutText", title: "About paragraph", type: "text", rows: 4 }),
    defineField({ name: "aboutPortrait", title: "About portrait photo", type: "image", options: { hotspot: true } }),

    defineField({ name: "basedIn", title: "Based in", type: "string" }),
    defineField({ name: "working", title: "Working", type: "string" }),
    defineField({ name: "since", title: "Since (year)", type: "string" }),
    defineField({ name: "focus", title: "Focus", type: "string" }),
    defineField({ name: "bookingStatus", title: "Booking status", type: "string" }),

    defineField({ name: "email", title: "Contact email", type: "string" }),
    defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
    defineField({ name: "behance", title: "Behance URL", type: "url" }),
    defineField({ name: "vsco", title: "VSCO URL", type: "url" }),
  ],
  preview: { select: { title: "siteName" } },
});
