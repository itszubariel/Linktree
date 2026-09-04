import { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../../components/Seo";
import { highlight, type SnippetLang } from "../../lib/highlight";

export interface SnippetTag {
  icon: string;
  label: string;
}

export interface SnippetFile {
  name: string;
  lang: SnippetLang;
  code: string;
}

export interface SnippetInfoCard {
  head: string;
  body: string;
}

export interface SnippetDoc {
  slug: string;
  head: string;
  word: string;
  tail: string;
  badge: string;
  tags: SnippetTag[];
  subtitle: string;
  info: SnippetInfoCard[];
  files: SnippetFile[];
  prev?: { label: string; to: string };
  next?: { label: string; to: string };
}

function renderInline(text: string) {
  const parts = text.split("`");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code className="subtitle-code" key={i}>
        {part}
      </code>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function SnippetDocShell({ doc }: { doc: SnippetDoc }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const file = doc.files[active];
  const docTitle = `${doc.head}${doc.word}${doc.tail}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(file.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <main>
      <Seo title={`Zubariel | ${docTitle}`} />
      <section className="snippet-doc">
        <Link to="/snippet" className="back-link">
          <i className="fa-solid fa-arrow-left" /> /snippet
        </Link>

        <div className="meta-row">
          {doc.tags.map((t) => (
            <span key={t.label} className="meta-tag">
              {t.icon && <i className={t.icon} />} {t.label}
            </span>
          ))}
          <span className="meta-tag accent">{doc.badge}</span>
        </div>

        <h1 className="doc-title">
          {doc.head} <span className="gradient-word">{doc.word}</span>
          {doc.tail}
        </h1>

        <p className="doc-subtitle">{renderInline(doc.subtitle)}</p>

        <div className="info-grid">
          {doc.info.map((card) => (
            <div className="info-card" key={card.head}>
              <h4>{card.head}</h4>
              <p>{renderInline(card.body)}</p>
            </div>
          ))}
        </div>

        <div className="code-block">
          <div className="tab-bar">
            {doc.files.map((f, i) => (
              <button
                key={f.name}
                className={`tab-btn ${i === active ? "active" : ""}`}
                onClick={() => {
                  setActive(i);
                  setCopied(false);
                }}
              >
                {f.name}
              </button>
            ))}
          </div>

          <div className="code-topbar">
            <div className="dots">
              <span className="d-r" />
              <span className="d-y" />
              <span className="d-g" />
            </div>
            <button className={`copy-btn${copied ? " copied" : ""}`} onClick={copy}>
              <i className={`fa-${copied ? "solid fa-check" : "regular fa-copy"}`} />
              {copied ? " Copied!" : " Copy"}
            </button>
          </div>

          <pre className="doc-pre">
            <code>{highlight(file.code, file.lang)}</code>
          </pre>
        </div>

        <div className="snippet-nav">
          {doc.prev ? (
            <Link to={doc.prev.to} className="snav-btn">
              <i className="fa-solid fa-arrow-left" /> {doc.prev.label}
            </Link>
          ) : (
            <span />
          )}
          {doc.next ? (
            <Link to={doc.next.to} className="snav-btn">
              {doc.next.label} <i className="fa-solid fa-arrow-right" />
            </Link>
          ) : null}
        </div>
      </section>
    </main>
  );
}
