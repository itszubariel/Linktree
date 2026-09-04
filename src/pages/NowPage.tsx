import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

const FOCUS = [
  {
    name: "life rn",
    tag: "main focus",
    desc: "uni + an actual full-time-ish job now, so coding's taken a real back seat. still poke at my projects here and there when i get the itch, but it's rare these days. not dead, just slow.",
  },
];

export function NowPage() {
  return (
    <main>
      <Seo
        title="Zubariel | Now"
        ogTitle="Now"
        description="Checkout what Zubariel is doing now (inspired by nownownow.com)"
        keywords="HTML, CSS, JS, Now, Developer, Zubariel"
      />
      <section className="page-hero now-hero">
        <p className="kicker">// sept 2026</p>
        <h1>
          What I'm Doing <span className="gradient-word">Now</span>
        </h1>
        <p className="page-hero-sub">
          A living snapshot of what I'm focused on, updated whenever things
          change.
        </p>
      </section>

      <section className="section now-section">
        <div className="now-focus">
          {FOCUS.map((f, i) => (
            <div key={f.name} className="now-item rise" style={{ animationDelay: `${0.05 * i}s` }}>
              <div className="now-item-head">
                <span className="now-name">{f.name}</span>
                <span className="now-tag">{f.tag}</span>
              </div>
              <p className="now-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="now-footer">
          <p>
            Check out <Link to="/projects" className="now-link">/projects</Link>{" "}
            for everything else I've built.
          </p>
          <span className="now-footnote">
            // a living snapshot. updated whenever things change.
          </span>
        </div>
      </section>
    </main>
  );
}
