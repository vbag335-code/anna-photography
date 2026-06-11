import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import { getProject, getAdjacentProjects, getAllProjects, getSiteSettings } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const projects = await getAllProjects();
    return (projects ?? []).map((p: { slug: string }) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

const WIDE_AT = new Set([0, 1, 6]);

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, adjacent, settings] = await Promise.all([
    getProject(params.slug),
    getAdjacentProjects(params.slug),
    getSiteSettings(),
  ]);

  if (!project) notFound();

  const allPhotos = [project.coverImage, ...(project.photos ?? [])].filter(Boolean);
  const email = settings?.email ?? "hello@annaphotography.com";

  return (
    <>
      <Header variant="project" />
      <main>
        <div className="project-head">
          <div className="crumbs mono">
            <Link href="/#work">← All work</Link>
            <span>{project.code}</span>
          </div>
          <h1 className="project-title">{project.title}</h1>
          <div className="project-meta mono">
            <div><span className="meta-label">Category</span>{project.category}</div>
            <div><span className="meta-label">Location</span>{project.location}</div>
            <div><span className="meta-label">Year</span>{project.year}</div>
            <div>
              <span className="meta-label">Frames</span>
              [{String(allPhotos.length).padStart(2, "0")}]
            </div>
          </div>
          <p className="project-desc">{project.description}</p>
        </div>

        <div className="gallery">
          {allPhotos.map((photo: object, i: number) => {
            const isWide = WIDE_AT.has(i);
            return (
              <div key={i} className={`gallery-img-wrap ${isWide ? "wide" : "half"}`}>
                <Image
                  src={urlFor(photo).width(isWide ? 1600 : 800).height(isWide ? 900 : 1000).url()}
                  alt={`${project.title} — photo ${i + 1}`}
                  width={isWide ? 1600 : 800}
                  height={isWide ? 900 : 1000}
                  className="photo-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority={i === 0}
                />
              </div>
            );
          })}
        </div>

        {adjacent.prev && adjacent.next && (
          <nav className="project-pager mono" aria-label="Projects">
            <Link href={`/project/${adjacent.prev.slug}`} className="pager-link">
              <span className="pager-dir">← Previous</span>
              <span className="pager-title">{adjacent.prev.title}</span>
            </Link>
            <Link href={`/project/${adjacent.next.slug}`} className="pager-link">
              <span className="pager-dir">Next →</span>
              <span className="pager-title">{adjacent.next.title}</span>
            </Link>
          </nav>
        )}
      </main>

      <footer className="footer">
        <div className="footer-bottom mono">
          <span>&copy; {new Date().getFullYear()} Anna Photography</span>
          <a className="footer-mail" href={`mailto:${email}`}>{email}</a>
        </div>
      </footer>
    </>
  );
}
