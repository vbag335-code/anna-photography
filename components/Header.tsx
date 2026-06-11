import Link from "next/link";

type Props = { variant?: "home" | "project" };

export default function Header({ variant = "home" }: Props) {
  return (
    <header className="topbar">
      <nav className="site-nav mono" aria-label="Main">
        {variant === "project" && (
          <Link href="/" className="logo logo-small" style={{ color: "var(--ink)" }}>ANNA</Link>
        )}
        <Link href="/#work" className="active">[WORK]</Link>
        <Link href="/#about">ABOUT</Link>
        <Link href="/#contact">CONTACT</Link>
      </nav>
      <Link className="btn-outline mono" href="/#contact">CONTACT</Link>
    </header>
  );
}
