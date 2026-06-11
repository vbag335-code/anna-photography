"use client";

type Settings = {
  email?: string;
  instagram?: string;
  behance?: string;
  vsco?: string;
};

export default function Footer({ s }: { s: Settings }) {
  const email = s.email || "hello@annaphotography.com";
  const socials = [
    { label: "Instagram ↗", href: s.instagram },
    { label: "Behance ↗", href: s.behance },
    { label: "VSCO ↗", href: s.vsco },
  ].filter((x) => x.href);

  return (
    <footer id="contact" className="footer">
      <div className="footer-main">
        <p className="footer-label mono">[ Contact ]</p>
        <div>
          <a className="footer-cta" href={`mailto:${email}`}>
            Let&rsquo;s<br />talk
          </a>
          <div className="footer-cols">
            <a className="footer-mail mono" href={`mailto:${email}`}>{email}</a>
            {socials.length > 0 && (
              <ul className="socials mono">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href!} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom mono">
        <span>&copy; {new Date().getFullYear()} Anna Photography</span>
        <button
          type="button"
          className="to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
