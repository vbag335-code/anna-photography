import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import { getSiteSettings, getAllProjects } from "@/sanity/lib/queries";

export const dynamic = "force-dynamic";

const FALLBACK_SETTINGS = {
  siteName: "ANNA",
  tagline: "Photography — people, places & the in-between",
  statement: "Moments don't repeat.\nPhotographs do.",
  aboutText: "I'm Anna — a photographer working between portrait, documentary and everything that refuses to sit still. I photograph people the way they are when they forget the camera is in the room.",
  aboutPortrait: undefined,
  basedIn: "Lisbon, PT",
  working: "Worldwide",
  since: "2018",
  focus: "People & places",
  bookingStatus: "Booking 2026",
  email: "hello@annaphotography.com",
  instagram: undefined,
  behance: undefined,
  vsco: undefined,
};

export default async function HomePage() {
  const [rawSettings, projects] = await Promise.all([
    getSiteSettings(),
    getAllProjects(),
  ]);

  const settings = rawSettings ?? FALLBACK_SETTINGS;

  return (
    <>
      <Header variant="home" />
      <Hero
        siteName={settings.siteName ?? FALLBACK_SETTINGS.siteName}
        tagline={settings.tagline ?? FALLBACK_SETTINGS.tagline}
        statement={settings.statement ?? FALLBACK_SETTINGS.statement}
      />
      <WorkSection projects={projects ?? []} />
      <AboutSection s={settings} />
      <Footer s={settings} />
    </>
  );
}
