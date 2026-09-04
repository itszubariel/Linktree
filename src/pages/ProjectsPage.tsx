import { useState } from "react";
import type { CSSProperties } from "react";
import {
  featuredProjects,
  moreProjects,
  oldProjects,
  type Project,
} from "../data/projects";
import { Seo } from "../components/Seo";

interface ProjectCardProps {
  project: Project;
  className?: string;
  style?: CSSProperties;
}

function ProjectCard({ project, className, style }: ProjectCardProps) {
  return (
    <article className={`project-card ${className || ""}`} style={style}>
      <div className="project-cover">
        <img src={project.image} alt={project.name} loading="lazy" />
      </div>

      <div className="project-body">
        <h3>{project.name}</h3>
        <p className="project-category">{project.category}</p>

        <p className="project-desc">{project.desc}</p>

        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t.label} className="tech-tag">
              <i className={t.icon} />
              {t.label}
            </span>
          ))}
        </div>

        <div className="project-actions">
          <a
            href={project.href}
            target={project.href.startsWith("http") ? "_blank" : undefined}
            rel={project.href.startsWith("http") ? "noreferrer" : undefined}
            className="btn btn-ghost project-view"
          >
            View Project
            <i className="fa-solid fa-arrow-up-right-from-square" />
          </a>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost project-github"
              aria-label="GitHub repository"
            >
              <i className="fa-brands fa-github" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

interface SectionProps {
  kicker: string;
  title: string;
  count: number;
  items: Project[];
  staggered?: boolean;
}

function Section({ kicker, title, count, items, staggered = true }: SectionProps) {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="kicker">{kicker}</p>
          <h2>{title}</h2>
        </div>
        <span className="count">
          {String(count).padStart(2, "0")} project{count !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid-projects">
        {items.map((p, i) => (
          <ProjectCard
            key={p.name}
            project={p}
            className={staggered ? "rise" : undefined}
            style={staggered ? { animationDelay: `${(i % 6) * 0.04}s` } : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export function ProjectsPage() {
  const [showOld, setShowOld] = useState(false);

  return (
    <main>
      <Seo
        title="Zubariel | Projects"
        ogTitle="Projects"
        description="A collection of projects and contributions by Zubariel."
        keywords="HTML, CSS, JS, Code, Snippet, Portfolio, Developer, Zubariel"
      />
      <section className="page-hero">
        <p className="kicker">// what I've built</p>
        <h1>
          My Projects &amp; <span className="gradient-word">Contributions</span>
        </h1>
        <p className="page-hero-sub">
          A collection of projects I've developed, roles I've taken on, and
          contributions I've made across various platforms.
        </p>
      </section>

      <Section
        kicker="// pinned projects"
        title="Featured Projects"
        count={featuredProjects.length}
        items={featuredProjects}
      />

      <Section
        kicker="// other projects"
        title="More Projects"
        count={moreProjects.length}
        items={moreProjects}
      />

      <div className="section" style={{ paddingTop: 0, textAlign: "center" }}>
        <button
          className="btn btn-ghost"
          onClick={() => setShowOld((s) => !s)}
        >
          {showOld ? "// hide older projects" : `// show older projects (${oldProjects.length})`}
        </button>
      </div>

      {showOld && (
        <Section
          kicker="// archive"
          title="Old Projects"
          count={oldProjects.length}
          items={oldProjects}
        />
      )}
    </main>
  );
}
