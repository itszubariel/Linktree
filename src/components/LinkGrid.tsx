import { Link } from "react-router-dom";

const EXPLORE = [
  {
    icon: "fa-solid fa-house",
    title: "Linktree",
    desc: "the whole point of this site",
    href: "/",
    internal: true,
  },
  {
    icon: "fa-solid fa-code",
    title: "Projects",
    desc: "things i've actually built",
    href: "/projects",
    internal: true,
  },
  {
    icon: "fa-solid fa-briefcase",
    title: "Portfolio",
    desc: "the fancy extended resume",
    href: "/portfolio",
  },
  {
    icon: "fa-solid fa-scissors",
    title: "Snippets",
    desc: "useful code scraps",
    href: "/snippet",
    internal: true,
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Now",
    desc: "what i'm focused on right now",
    href: "/now",
    internal: true,
  },
  {
    icon: "fa-solid fa-envelope",
    title: "Contact",
    desc: "shout at me about this page",
    href: "/contact",
    internal: true,
  },
  {
    icon: "fa-solid fa-clapperboard",
    title: "Anime List",
    desc: "everything i've watched",
    href: "/anime-list",
  },
  {
    icon: "fa-solid fa-book",
    title: "Manga List",
    desc: "everything i've read",
    href: "/manga-list",
  },
];

const ELSEWHERE = [
  {
    icon: "fa-brands fa-github",
    label: "GitHub",
    href: "https://github.zubs.me",
  },
  {
    icon: "fa-brands fa-spotify",
    label: "Spotify",
    href: "https://spotify.zubs.me",
  },
  {
    icon: "fa-solid fa-envelope",
    label: "Contact",
    href: "/contact",
    internal: true,
  },
  {
    icon: "fa-brands fa-discord",
    label: "Discord",
    href: "https://discord.zubs.me",
  },
  {
    icon: "fa-brands fa-instagram",
    label: "Instagram",
    href: "https://insta.zubs.me",
  },
  {
    icon: "fa-brands fa-youtube",
    label: "YouTube",
    href: "https://youtube.zubs.me",
  },
];

export function LinkGrid() {
  return (
    <>
      <section id="explore" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">Explore</p>
            <h2>Where to go</h2>
          </div>
          <span className="count">
            {String(EXPLORE.length).padStart(2, "0")} places
          </span>
        </div>

        <div className="grid-links">
          {EXPLORE.map((c, i) => {
            const content = (
              <>
                <span className="card-path">
                  ~/{c.title.toLowerCase().replace(/ /g, "-")}
                </span>
                <span className="card-body">
                  <span className="card-desc">{c.desc}</span>
                </span>
                <i className="fa-solid fa-arrow-right card-arrow" />
              </>
            );
            const cls = "card rise";
            const style = { animationDelay: `${0.05 * i}s` };
            return c.internal ? (
              <Link key={c.href} to={c.href} className={cls} style={style}>
                {content}
              </Link>
            ) : (
              <a key={c.href} href={c.href} className={cls} style={style}>
                {content}
              </a>
            );
          })}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <p className="kicker">Elsewhere</p>
            <h2>Find me on the web</h2>
          </div>
        </div>

        <div className="social-grid">
          {ELSEWHERE.map((s, i) =>
            s.internal ? (
              <Link
                key={s.href}
                to={s.href}
                className="social-tile rise"
                style={{ animationDelay: `${0.05 * i}s` }}
                aria-label={s.label}
              >
                <i className={s.icon} />
              </Link>
            ) : (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="social-tile rise"
                style={{ animationDelay: `${0.05 * i}s` }}
                aria-label={s.label}
              >
                <i className={s.icon} />
              </a>
            ),
          )}
        </div>
      </section>
    </>
  );
}
