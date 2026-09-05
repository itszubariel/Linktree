import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

const IMG = "https://zubs.me/images";

function SkillBar({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="pf-skill">
      <div className="pf-skill-head">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="pf-bar">
        <div
          className="pf-bar-fill"
          data-on={on}
          style={{ "--fill": `${value}%` } as CSSProperties}
        />
      </div>
    </div>
  );
}

const ABOUT: {
  icon: string;
  title: string;
  type: "list" | "skills" | "tech" | "stats" | "term" | "qual" | "gitlog";
  items: string[];
}[] = [
  {
    icon: "fa-solid fa-terminal",
    title: "Personal Info",
    type: "term",
    items: [],
  },
  {
    icon: "fa-solid fa-graduation-cap",
    title: "Qualifications",
    type: "qual",
    items: [
      "Currently studying Computer Science at Western Sydney University",
      "Founder and Developer at ZBRLang",
      "Wiki Contributor, Translator & Staff Member at BDFD",
      "Open to freelance work",
      "5 years of coding experience",
    ],
  },
  {
    icon: "fa-solid fa-chart-line",
    title: "By the Numbers",
    type: "stats",
    items: [],
  },
  {
    icon: "fa-solid fa-screwdriver-wrench",
    title: "Skills",
    type: "skills",
    items: [],
  },
  {
    icon: "fa-solid fa-globe",
    title: "Languages & Tech",
    type: "tech",
    items: [
      "TypeScript",
      "Rust",
      "Python",
      "Java",
      "C",
      "C++",
      "SQL",
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Node.js",
      "PyTorch",
      "Vosk",
      "Fabric API",
      "Vite",
      "Docker",
      "PostgreSQL",
      "Supabase",
      "Git",
      "AWS",
      "Android SDK",
    ],
  },
  {
    icon: "fa-solid fa-code-branch",
    title: "Open Source",
    type: "gitlog",
    items: [
      "Maintainer of several personal open source projects across web tools, bots, and libraries",
      "Member of TypeSnippet & ZBRLang orgs on GitHub",
      "Contributed to rustlings, BDFD, and other open source projects",
      "Active in the open source community, helping others with code and project guidance",
    ],
  },
];

const TERM = [
  { cmd: "whoami", out: "zubariel" },
  { cmd: "pronouns()", out: "he/him" },
  { cmd: "pwd", out: "/home/zub · nsw, australia" },
  { cmd: "cat languages.txt", out: "English (and some others)" },
];

const STATS = [
  { value: "5K+", label: "GitHub contributions" },
  { value: "40+", label: "Pull requests merged" },
  { value: "80+", label: "Repositories maintained" },
  { value: "331+", label: "GitHub stars received" },
  { value: "5", label: "Years of coding XP" },
  { value: "Rust", label: "Top language" },
];

const SKILLS = [
  { label: "Web Development", value: 94 },
  { label: "Bot Development", value: 86 },
  { label: "Database Management", value: 47 },
  { label: "App Development", value: 25 },
];

const TECH_ICONS: Record<string, string> = {
  TypeScript: "fa-solid fa-code",
  Rust: "fa-brands fa-rust",
  Python: "fa-brands fa-python",
  Java: "fa-brands fa-java",
  C: "fa-solid fa-code",
  "C++": "fa-solid fa-code",
  SQL: "fa-solid fa-database",
  HTML: "fa-brands fa-html5",
  CSS: "fa-brands fa-css3-alt",
  React: "fa-brands fa-react",
  "Next.js": "fa-solid fa-server",
  "Node.js": "fa-brands fa-node-js",
  PyTorch: "fa-solid fa-brain",
  Vosk: "fa-solid fa-wave-square",
  "Fabric API": "fa-solid fa-terminal",
  Vite: "fa-solid fa-bolt",
  Docker: "fa-brands fa-docker",
  PostgreSQL: "fa-solid fa-database",
  Supabase: "fa-solid fa-database",
  Git: "fa-brands fa-git-alt",
  AWS: "fa-brands fa-aws",
  "Android SDK": "fa-brands fa-android",
};

const PROJECTS = [
  {
    img: "zbr-website.png",
    alt: "ZBR",
    label: "Custom Scripting Language",
    title: "ZBR",
    desc: "The scripting language for Discord bots. Write commands as plain .zbr files, no boilerplate, no event handlers, no framework knowledge required.",
    tags: [
      { icon: "fa-brands fa-rust", label: "Rust" },
      { icon: "fa-brands fa-discord", label: "Serenity" },
      { icon: "fa-solid fa-database", label: "SQLite" },
    ],
    href: "https://zbr-website.vercel.app",
  },
  {
    img: "trackbirthdays.png",
    alt: "Track Birthdays",
    label: "PWA & Android App",
    title: "Track Birthdays",
    desc: "Never miss a birthday again. Track birthdays with push notifications, group organisation, AI gift ideas, and a clean dark UI.",
    tags: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-solid fa-bolt", label: "Vite" },
      { icon: "fa-solid fa-database", label: "Supabase" },
    ],
    href: "https://trackbirthdays.zubs.me",
  },
  {
    img: "bdtools.png",
    alt: "BDTools",
    label: "Web Application",
    title: "BDTools",
    desc: "Collection of free and open source web-based tools for Bot Designer for Discord (BDFD).",
    tags: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-brands fa-css3-alt", label: "Tailwind CSS" },
    ],
    href: "https://bdtools.xyz",
  },
  {
    img: "scrobbler.png",
    alt: "scrobbler",
    label: "Verified Discord Bot",
    title: "scrobbler",
    desc: "A Last.fm-powered Discord bot for tracking music activity, stats, and listening history.",
    tags: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-brands fa-discord", label: "Discord.js" },
      { icon: "fa-solid fa-database", label: "Prisma & PostgreSQL" },
    ],
    href: "https://scrobbler.is-a.bot",
  },
  {
    img: "hol.png",
    alt: "Heart of Life",
    label: "Minecraft Mod",
    title: "Heart of Life",
    desc: "Adds a single-player heart progression system inspired by Lifesteal.",
    tags: [
      { icon: "fa-brands fa-java", label: "Java" },
      { icon: "fa-solid fa-cubes", label: "Fabric API" },
      { icon: "fa-solid fa-mountain", label: "Modrinth" },
    ],
    href: "https://modrinth.com/mod/hol",
  },
  {
    img: "statify.png",
    alt: "Statify",
    label: "VS Code Extension",
    title: "Statify",
    desc: "A Visual Studio Code extension that provides useful project statistics and insights directly inside your editor.",
    tags: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-solid fa-code", label: "VS Code" },
    ],
    href: "https://marketplace.visualstudio.com/items?itemName=zubariel.statify",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Working with Zubariel on Auora was genuinely one of the best dev experiences I've had. He just gets things done, properly. Clean code, fast turnaround, and he actually cares about what he's building",
    img: "savior-pfp.png",
    alt: "Saviour",
    name: "Saviour",
    role: "Developer & Partner at Auora HQ",
    href: null as string | null,
  },
  {
    quote:
      "Zubariel takes even a rough idea and runs with it in ways you wouldn't expect. Threw some vague design thoughts his way and he turned them into something that actually looked good and worked. Easy person to work with.",
    img: "placeholder.png",
    alt: "Cam Brown",
    name: "Cam Brown",
    role: "Designer & Client",
    href: "https://github.com/cam-br0wn",
  },
  {
    quote:
      "Zubariel's one of those devs who just ships. Not just talks about stuff, actually builds it, puts it out there, and moves on to the next thing. The stuff he's made speaks for itself",
    img: "stargraze-pfp.png",
    alt: "riv",
    name: "riv",
    role: "Developer",
    href: "https://servermaker.xyz/developer",
  },
  {
    quote:
      "Building Statify with Zubariel was pretty smooth honestly. He knows what he wants out of a project and he moves fast. The extension went from a rough idea to something genuinely useful in no time",
    img: "placeholder.png",
    alt: "Oliver",
    name: "Oliver",
    role: "Developer & Client",
    href: null,
  },
];

interface CardListProps {
  items: string[];
}
function CardList({ items }: CardListProps) {
  return (
    <ul className="pf-list">
      {items.map((item) => {
        const idx = item.indexOf(":");
        if (idx > -1) {
          return (
            <li key={item}>
              <strong>{item.slice(0, idx)}:</strong>
              {item.slice(idx + 1)}
            </li>
          );
        }
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PortfolioPage() {
  return (
    <main>
      <Seo
        title="Zubariel | Portfolio"
        ogTitle="Portfolio"
        description="This is the portfolio for Zubariel."
        keywords="HTML, CSS, JS, Portfolio, Developer, Zubariel"
      />

      <section
        id="home"
        className="pf-hero"
        style={{ paddingTop: "12rem", paddingBottom: "6rem" }}
      >
        <div className="pf-hero-grid">
          <div>
            <p className="pf-hello">Hello, I'm Zubariel.</p>

            <h1 className="pf-title">
              Self-Taught
              <br />
              Developer &amp; Creator<span className="pf-hero-dot">.</span>
            </h1>

            <p className="pf-intro">
              I've been building software for about <strong>5 years</strong>,
              ranging from Discord bots and scripting languages to web tools,
              mods, and apps. I don't follow a set stack, I just build what I
              need and keep learning along the way.
            </p>

            <div className="pf-hero-actions pf-hero-actions-left">
              <Link to="/contact" className="btn btn-primary">
                <i className="fa-solid fa-paper-plane" /> Contact Me
              </Link>
              <button
                onClick={() => scrollToId("about")}
                className="btn btn-ghost"
              >
                <i className="fa-solid fa-folder-open" /> View My Work
              </button>
            </div>

            <div className="pf-socials pf-socials-left">
              <a
                href="https://github.zubs.me"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="pf-social"
              >
                <i className="fa-brands fa-github" />
              </a>
              <a
                href="https://discord.zubs.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="pf-social"
              >
                <i className="fa-brands fa-discord" />
              </a>
              <a
                href="https://insta.zubs.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="pf-social"
              >
                <i className="fa-brands fa-instagram" />
              </a>
              <a
                href="https://youtube.zubs.me"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="pf-social"
              >
                <i className="fa-brands fa-youtube" />
              </a>
              <a
                href="https://spotify.zubs.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Spotify"
                className="pf-social"
              >
                <i className="fa-brands fa-spotify" />
              </a>
            </div>
          </div>

          <div className="pf-hero-ring">
            <img src={`${IMG}/1pfp.jpg`} alt="Zubariel's Profile" />
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">// who I am</p>
            <h2>About Me</h2>
          </div>
          <span className="count">01</span>
        </div>

        <div className="pf-about">
          {ABOUT.map((c, i) => (
            <div
              key={c.title}
              className="glass-card rise"
              style={{ animationDelay: `${(i % 6) * 0.05}s` }}
            >
              <h3 className="pf-card-title">
                <i className={c.icon} /> {c.title}
              </h3>
              {c.type === "list" && <CardList items={c.items} />}
              {c.type === "qual" && (
                <ul className="pf-qual">
                  {c.items.map((item, idx) => (
                    <li key={item}>
                      <span className="pf-qual-num">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {c.type === "gitlog" && (
                <ul className="pf-git">
                  {c.items.map((item) => (
                    <li key={item}>
                      <span className="pf-git-plus">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {c.type === "term" && (
                <div className="pf-term">
                  <div className="pf-term-bar">
                    <span className="pf-term-dot" />
                    <span className="pf-term-dot" />
                    <span className="pf-term-dot" />
                    <span className="pf-term-title">zub@zubs ~ —zsh</span>
                  </div>
                  <div className="pf-term-body">
                    {TERM.map((t) => (
                      <p key={t.cmd} className="pf-term-line">
                        <b>{t.cmd}</b> → {t.out}
                      </p>
                    ))}
                    <p className="pf-term-line">
                      <b>status()</b> → online, probably working
                      <span className="pf-term-cursor">▊</span>
                    </p>
                  </div>
                </div>
              )}
              {c.type === "stats" && (
                <div className="pf-stats">
                  {STATS.map((s) => (
                    <div key={s.label} className="pf-stat">
                      <span className="pf-stat-value">{s.value}</span>{" "}
                      <span className="pf-stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {c.type === "skills" && (
                <div className="pf-skills">
                  {SKILLS.map((s) => (
                    <SkillBar key={s.label} label={s.label} value={s.value} />
                  ))}
                </div>
              )}
              {c.type === "tech" && (
                <div className="pf-techs">
                  {c.items.map((t) => (
                    <span key={t} className="tech-tag">
                      <i className={TECH_ICONS[t]} /> {t}
                    </span>
                  ))}
                  <span className="tech-tag">& more...</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">// things I've built</p>
            <h2>Featured Projects</h2>
          </div>
          <span className="count">
            {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid-projects">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="project-card rise"
              style={{ animationDelay: `${(i % 6) * 0.04}s` }}
            >
              <div className="project-cover">
                <img src={`${IMG}/${p.img}`} alt={p.alt} loading="lazy" />
              </div>
              <div className="project-body">
                <h3>{p.title}</h3>
                <p className="project-category">{p.label}</p>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tags.map((t) => (
                    <span key={t.label} className="tech-tag">
                      <i className={t.icon} /> {t.label}
                    </span>
                  ))}
                </div>
                <div className="project-actions">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-ghost pf-project-view"
                  >
                    View Project
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pf-center">
          <Link to="/projects" className="btn btn-ghost">
            <i className="fa-solid fa-folder-open" /> Other Projects
          </Link>
        </div>
      </section>

      <section id="testimonials" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">// kind words</p>
            <h2>What Others Say</h2>
          </div>
          <span className="count">
            {String(TESTIMONIALS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="pf-test-grid">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name}
              className="pf-testimonial rise"
              style={{ animationDelay: `${(i % 4) * 0.05}s` }}
            >
              <div className="pf-quote-mark" aria-hidden="true">
                ”
              </div>
              <p className="pf-quote">{t.quote}</p>
              <figcaption className="pf-cap">
                <img
                  src={`${IMG}/${t.img}`}
                  alt={t.alt}
                  className="pf-cap-img"
                />
                <div>
                  {t.href ? (
                    <a
                      href={t.href}
                      target="_blank"
                      rel="noreferrer"
                      className="pf-cap-name"
                    >
                      {t.name}
                    </a>
                  ) : (
                    <p className="pf-cap-name">{t.name}</p>
                  )}
                  <p className="pf-cap-role">{t.role}</p>
                </div>
              </figcaption>
            </div>
          ))}
        </div>
      </section>

      <section id="interests" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">// off the clock</p>
            <h2>Beyond Coding</h2>
          </div>
          <span className="count">04</span>
        </div>

        <div className="pf-interest-grid">
          <div className="glass-card rise">
            <h3 className="pf-card-title">
              <i className="fa-solid fa-clapperboard" /> Anime, Manga & TV
            </h3>
            <ul className="pf-qual">
              <li>
                <span className="pf-qual-num">01</span>
                <span>
                  <b>Top animes:</b> Bleach, Code Geass, Vinland Saga
                </span>
              </li>
              <li>
                <span className="pf-qual-num">02</span>
                <span>
                  <b>Also watching:</b> Horimiya, SNAFU
                </span>
              </li>
              <li>
                <span className="pf-qual-num">03</span>
                <span>
                  <b>Genres:</b> Seinen, psychological thrillers, historical
                  epics
                </span>
              </li>
              <li>
                <span className="pf-qual-num">04</span>
                <span>
                  <b>MCU:</b> Loki, Moon Knight
                </span>
              </li>
            </ul>
          </div>

          <div className="glass-card rise" style={{ animationDelay: "0.05s" }}>
            <h3 className="pf-card-title">
              <i className="fa-solid fa-gamepad" /> Games & Music
            </h3>
            <ul className="pf-qual">
              <li>
                <span className="pf-qual-num">01</span>
                <span>
                  <b>Genres:</b> RPG, souls-like, open world
                </span>
              </li>
              <li>
                <span className="pf-qual-num">02</span>
                <span>
                  <b>All-time faves:</b> Minecraft, God of War, RDR2
                </span>
              </li>
              <li>
                <span className="pf-qual-num">03</span>
                <span>
                  <b>Competitive:</b> Valorant, COD
                </span>
              </li>
              <li>
                <span className="pf-qual-num">04</span>
                <span>
                  <b>On repeat:</b> The 1975, Olivia Rodrigo, Noah Kahan
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="thanks" className="section">
        <div className="section-head">
          <div>
            <p className="kicker">// gratitude</p>
            <h2>Acknowledgements</h2>
          </div>
          <span className="count">04</span>
        </div>

        <div className="pf-thanks-grid">
          <div className="glass-card rise">
            <h3 className="pf-card-title">
              <i className="fa-solid fa-people-group" /> Collaborators
            </h3>
            <p className="pf-card-sub">
              Thanks to everyone who's built alongside me and pushed these
              projects further than I could have alone.
            </p>
            <ul className="pf-shout">
              <li>
                <span>
                  <span className="pf-shout-name">Saviour</span>: Co-built Auora
                  with me
                </span>
              </li>
              <li>
                <span>
                  <span className="pf-shout-name">Cam Brown</span>: Design input
                  on earlier projects
                </span>
              </li>
              <li>
                <span>
                  <span className="pf-shout-name">Oliver</span>: Collaborated on
                  Statify, concept to launch
                </span>
              </li>
            </ul>
          </div>

          <div className="glass-card rise" style={{ animationDelay: "0.05s" }}>
            <h3 className="pf-card-title">
              <i className="fa-solid fa-heart" /> Special Thanks
            </h3>
            <p className="pf-card-sub">
              And to the people who've been there outside of any one project.
            </p>
            <ul className="pf-shout">
              <li>
                <span>
                  <span className="pf-shout-name">riv</span>: One of my closest
                  friends, always down to talk ideas through
                </span>
              </li>
              <li>
                <span>
                  <span className="pf-shout-name">Kyll</span>: Pushed me to
                  keep learning and trying new things
                </span>
              </li>
              <li>
                <span>
                  <span className="pf-shout-name">BDFD Community</span>:
                  Supported the work across all these years
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
