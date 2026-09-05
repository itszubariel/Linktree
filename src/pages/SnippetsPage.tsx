import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import {
  SNIPPET_CATEGORIES,
  type Snippet,
  type SnippetCategory,
} from "../data/snippets";
import { Seo } from "../components/Seo";

interface SnippetCardProps {
  snippet: Snippet;
  style?: CSSProperties;
}

function SnippetCard({ snippet, style }: SnippetCardProps) {
  return (
    <article className="project-card rise" style={style}>
      <div className="project-body snippet-body">
        <div className="snippet-head">
          <h3>{snippet.title}</h3>
          <span className="code-tag">{">_"}</span>
        </div>

        <div className="snippet-tags">
          {snippet.tags.map((t) => (
            <span key={t} className="snippet-tag">
              {t}
            </span>
          ))}
        </div>

        <p className="project-desc">{snippet.desc}</p>

        <div className="project-actions">
          <Link
            to={`/snippet/${snippet.link}`}
            className="btn btn-ghost project-view"
          >
            View Snippet
            <i className="fa-solid fa-code" />
          </Link>
        </div>
      </div>
    </article>
  );
}

interface SectionProps {
  category: SnippetCategory;
}

function Section({ category }: SectionProps) {
  return (
    <section className="section">
      <div className="section-head">
        <div>
          <p className="kicker">{category.kicker}</p>
          <h2>{category.label}</h2>
        </div>
        <span className="count">
          {String(category.snippets.length).padStart(2, "0")} snippet
          {category.snippets.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid-projects">
        {category.snippets.map((s, i) => (
          <SnippetCard
            key={s.title}
            snippet={s}
            style={{ animationDelay: `${(i % 6) * 0.04}s` }}
          />
        ))}
      </div>
    </section>
  );
}

export function SnippetsPage() {
  const total = SNIPPET_CATEGORIES.reduce(
    (sum, c) => sum + c.snippets.length,
    0,
  );

  return (
    <main>
      <Seo
        title="Zubariel | Snippets"
        ogTitle="Snippets"
        description="A collection of code snippets and mini-projects by Zubariel."
      />
      <section className="page-hero">
        <p className="kicker">// tinkering & building</p>
        <h1>
          My Code <span className="gradient-word">Snippets</span>
        </h1>
        <p className="page-hero-sub">
          A collection of small projects, examples, and reusable code for web
          and Discord bot development. {total} snippets across three categories.
        </p>
      </section>

      {SNIPPET_CATEGORIES.map((c) => (
        <Section key={c.id} category={c} />
      ))}
    </main>
  );
}
