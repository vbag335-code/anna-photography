"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

type Project = {
  _id: string;
  title: string;
  slug: string;
  code: string;
  category: string;
  year: string;
  tagline: string;
  coverImage: object;
};

export default function WorkSection({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <main id="work">
      <div className="work-toolbar mono">
        <span className="work-count">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M1 2.5h4l1.2 1.5H13v6.5H1z" />
          </svg>
          <span>All work [{String(projects.length).padStart(2, "0")}]</span>
        </span>
        <div className="view-toggle" role="tablist" aria-label="View">
          <button type="button" className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>Grid</button>
          <button type="button" className={view === "list" ? "active" : ""} onClick={() => setView("list")}>List</button>
        </div>
      </div>

      {/* Grid view */}
      <div id="work-grid" className="work-grid" hidden={view !== "grid"}>
        {projects.map((p) => (
          <Link key={p._id} href={`/project/${p.slug}`} className="work-card" style={{ display: "block" }}>
            <div className="card-img-wrap">
              {p.coverImage && (
                <Image
                  src={urlFor(p.coverImage).width(900).height(1125).url()}
                  alt={p.title}
                  width={900}
                  height={1125}
                  className="photo-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <div className="card-caption mono">
              <div className="card-row">
                <h3>{p.title}</h3>
                <span className="code">{p.code}</span>
              </div>
              <p className="card-tag">{p.tagline}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* List view */}
      <div id="work-list" className="work-list" hidden={view !== "list"}>
        {projects.map((p) => (
          <Link key={p._id} href={`/project/${p.slug}`} className="work-row mono">
            <span className="row-code">{p.code}</span>
            <span className="row-title">{p.title}</span>
            <span className="row-cat">{p.category}</span>
            <span className="row-year">{p.year}</span>
            <span className="row-arrow">→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
