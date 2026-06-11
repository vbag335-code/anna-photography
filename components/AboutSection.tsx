import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Settings = {
  aboutText: string;
  aboutPortrait?: object;
  basedIn?: string;
  working?: string;
  since?: string;
  focus?: string;
  bookingStatus?: string;
};

export default function AboutSection({ s }: { s: Settings }) {
  const facts = [
    { dt: "Based in", dd: s.basedIn },
    { dt: "Working", dd: s.working },
    { dt: "Since", dd: s.since },
    { dt: "Focus", dd: s.focus },
    { dt: "Status", dd: s.bookingStatus },
  ].filter((f) => f.dd);

  return (
    <section id="about" className="about">
      <p className="about-label mono">[ About ]</p>
      <div className="about-body">
        <p className="about-lede">{s.aboutText}</p>
        <div className="about-grid">
          <div className="about-portrait-wrap">
            {s.aboutPortrait ? (
              <Image
                src={urlFor(s.aboutPortrait).width(700).height(933).url()}
                alt="About portrait"
                width={700}
                height={933}
                className="photo-img"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "var(--panel)" }} />
            )}
          </div>
          <dl className="facts mono">
            {facts.map((f) => (
              <div key={f.dt} className="fact">
                <dt>{f.dt}</dt>
                <dd>{f.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
