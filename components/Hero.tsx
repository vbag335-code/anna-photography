type Props = {
  siteName: string;
  tagline: string;
  statement: string;
};

export default function Hero({ siteName, tagline, statement }: Props) {
  const lines = statement.split("\n");
  return (
    <section className="hero">
      <h1 className="logo">{siteName}</h1>
      <div className="hero-bottom">
        <p className="logo-sub mono">{tagline}</p>
        <p className="statement">
          {lines.map((l, i) => (
            <span key={i}>{l}{i < lines.length - 1 && <br />}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
