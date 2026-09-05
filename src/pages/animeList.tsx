import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

interface Anime {
  title: string;
  japanese_title: string;
  status: string;
  genres: string[];
  rating?: number;
  episodes?: number;
  image_url: string;
  synopsis: string;
  mal_score?: number;
  type?: string;
  year?: number;
}

const STATUS_LABELS: Record<string, string> = {
  completed: "Completed",
  watching: "Watching",
  "plan-to-watch": "Plan to Watch",
  "on-hold": "On Hold",
  dropped: "Dropped",
};

const FALLBACK_IMG = "https://placehold.co/200x300/111/444?text=No+Image";

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Harem",
  "Horror",
  "Isekai",
  "Magic",
  "Mecha",
  "Mystery",
  "Psychological",
  "Romance",
  "School",
  "Sci-Fi",
  "Shounen",
  "Shoujo",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller",
];

const STATUSES = [
  "all",
  "watching",
  "completed",
  "on-hold",
  "plan-to-watch",
  "dropped",
];

function getPP() {
  const w = window.innerWidth;
  const cols =
    w <= 520
      ? 3
      : w <= 900
        ? Math.floor((w - 36) / 138)
        : Math.floor((1300 - 80) / 159);
  return Math.max(cols, 3) * 6;
}

export function AnimeList() {
  const [data, setData] = useState<Anime[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("def");
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState<Anime | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    fetch("/anime_data.json")
      .then((r) => r.json())
      .then((cache) => {
        setData(
          (cache.anime as Record<string, unknown>[]).map((a) => ({
            title: a.title as string,
            japanese_title: (a.japanese_title as string) || "",
            status: a.status as string,
            genres: a.genres as string[],
            rating: a.rating as number | undefined,
            episodes: a.episodes as number | undefined,
            image_url: a.image_url as string,
            synopsis: (a.synopsis as string) || "",
            mal_score: a.mal_score as number | undefined,
            type: (a.type as string) || "",
            year: a.year as number | undefined,
          })),
        );
      })
      .catch((err) => console.error("Failed to load anime_data.json:", err))
      .finally(() => setLoaded(true));
  }, []);

  const filtered = useMemo(() => {
    let list = [...data];
    if (status !== "all") list = list.filter((a) => a.status === status);
    if (genre !== "all")
      list = list.filter((a) =>
        a.genres.some((g) => g.toLowerCase() === genre),
      );
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(q));
    }
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "za") list.sort((a, b) => b.title.localeCompare(a.title));
    if (sort === "top") list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sort === "low") list.sort((a, b) => (a.rating || 0) - (b.rating || 0));
    if (sort === "eps")
      list.sort((a, b) => (b.episodes || 0) - (a.episodes || 0));
    return list;
  }, [data, query, status, genre, sort]);

  const stats = useMemo(() => {
    const rated = data.filter((a) => a.rating);
    const avg = rated.length
      ? (rated.reduce((s, r) => s + (r.rating || 0), 0) / rated.length).toFixed(
          1,
        )
      : "0";
    return {
      total: data.length,
      done: data.filter((a) => a.status === "completed").length,
      watching: data.filter((a) => a.status === "watching").length,
      avg,
    };
  }, [data]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / getPP()));
  const pp = getPP();
  const start = (page - 1) * pp;
  const items = filtered.slice(start, start + pp);

  function goPage(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openDetail(a: Anime) {
    setSel(a);
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    setSel(null);
    document.body.style.overflow = "";
  }

  function closeInfo() {
    setInfoOpen(false);
    document.body.style.overflow = "";
  }

  function openInfo() {
    setInfoOpen(true);
    document.body.style.overflow = "hidden";
  }

  function buildPages(cur: number, total: number): (number | string)[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const p: (number | string)[] = [1];
    if (cur > 3) p.push("…");
    for (let i = Math.max(2, cur - 1); i <= Math.min(total - 1, cur + 1); i++)
      p.push(i);
    if (cur < total - 2) p.push("…");
    p.push(total);
    return p;
  }

  return (
    <main>
      <Seo
        title="Zubariel | Anime List"
        ogTitle="Anime List"
        description="Every anime watched, dropped, or queued tracked since 2015."
        keywords="anime, list, myanimelist, zubariel"
      />

      <section className="anime-hero">
        <p className="anime-eyebrow">Personal Collection</p>
        <h1 className="anime-title">
          My <span className="gradient-word">Anime</span> List.
        </h1>
        <p className="anime-sub">
          Every anime watched, dropped, or queued tracked since 2015.
        </p>
        <div className="anime-stats">
          <div className="anime-hs">
            <span className="anime-hs-n">{stats.total}</span>
            <span className="anime-hs-l">Total</span>
          </div>
          <div className="anime-hs">
            <span className="anime-hs-n">{stats.done}</span>
            <span className="anime-hs-l">Completed</span>
          </div>
          <div className="anime-hs">
            <span className="anime-hs-n">{stats.watching}</span>
            <span className="anime-hs-l">Watching</span>
          </div>
          <div className="anime-hs">
            <span className="anime-hs-n">{stats.avg}</span>
            <span className="anime-hs-l">Avg Score</span>
          </div>
        </div>
      </section>

      <div className="anime-controls">
        <div className="anime-ctrl-inner">
          <div className="anime-search-wrap">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              type="text"
              placeholder="Search by title…"
              autoComplete="off"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="anime-frow">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`anime-pill ${status === s ? "on" : ""}`}
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
              >
                {s === "all" ? "All" : STATUS_LABELS[s]}
              </button>
            ))}
            <span className="anime-vsep" />
            <select
              className="anime-pill"
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g.toLowerCase()}>
                  {g}
                </option>
              ))}
            </select>
            <select
              className="anime-pill"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="def">Default</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
              <option value="top">Top Rated</option>
              <option value="low">Lowest Rated</option>
              <option value="eps">Most Episodes</option>
            </select>
            <button
              className="anime-pill anime-info-btn"
              onClick={openInfo}
              aria-label="Info"
            >
              <i className="fa-solid fa-circle-info" /> Info
            </button>
            <span className="anime-rcount">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      <div className="anime-gsection">
        <div className="anime-grid">
          {!loaded ? (
            <div className="anime-empty">Loading anime list…</div>
          ) : !items.length ? (
            <div className="anime-empty">
              No anime matched your filters.
              <br />
              Try adjusting search or filters.
            </div>
          ) : (
            items.map((a) => (
              <article
                key={a.title}
                className="anime-card"
                onClick={() => openDetail(a)}
              >
                <div className="anime-cimgw">
                  <img
                    className="anime-cimg"
                    src={a.image_url || FALLBACK_IMG}
                    alt={a.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
                    }}
                  />
                  <span className="anime-badge-s">
                    {STATUS_LABELS[a.status] || a.status}
                  </span>
                  {a.rating ? (
                    <span className="anime-badge-r">{a.rating}</span>
                  ) : null}
                </div>
                <div className="anime-cbody">
                  <p className="anime-ctitle">{a.title}</p>
                  <p className="anime-cep">
                    <i className="fa-solid fa-play" />{" "}
                    {a.episodes ? `${a.episodes} eps` : "Ongoing"}
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="anime-pag">
          <button
            className="anime-pg"
            disabled={page === 1}
            onClick={() => goPage(page - 1)}
          >
            ← Prev
          </button>
          {buildPages(page, totalPages).map((p, i) =>
            p === "…" ? (
              <span key={`d${i}`} className="anime-pg-dot">
                …
              </span>
            ) : (
              <button
                key={`p${p}`}
                className={`anime-pg ${p === page ? "on" : ""}`}
                onClick={() => goPage(p as number)}
              >
                {p}
              </button>
            ),
          )}
          <button
            className="anime-pg"
            disabled={page === totalPages}
            onClick={() => goPage(page + 1)}
          >
            Next →
          </button>
        </div>
      )}

      {sel && (
        <div className="anime-ovl" onClick={closeDetail}>
          <div className="anime-detail" onClick={(e) => e.stopPropagation()}>
            <button className="anime-d-close" onClick={closeDetail}>
              ✕
            </button>
            <img
              className="anime-d-banner"
              src={sel.image_url || FALLBACK_IMG}
              alt=""
            />
            <div className="anime-d-body">
              <div className="anime-d-head">
                <img
                  className="anime-d-poster"
                  src={sel.image_url || FALLBACK_IMG}
                  alt={sel.title}
                />
                <div className="anime-d-info">
                  <h2 className="anime-d-title">{sel.title}</h2>
                  {sel.japanese_title && (
                    <p className="anime-d-jp">{sel.japanese_title}</p>
                  )}
                  <div className="anime-d-tags">
                    <span className="anime-dtag">
                      {STATUS_LABELS[sel.status] || sel.status}
                    </span>
                    {sel.type && <span className="anime-dtag">{sel.type}</span>}
                    {sel.year && <span className="anime-dtag">{sel.year}</span>}
                  </div>
                </div>
              </div>
              <div className="anime-d-stats">
                {sel.rating ? (
                  <div className="anime-ds">
                    <span className="anime-ds-v">{sel.rating}</span>
                    <span className="anime-ds-k">My Rating</span>
                  </div>
                ) : null}
                {sel.mal_score ? (
                  <div className="anime-ds">
                    <span className="anime-ds-v">{sel.mal_score}</span>
                    <span className="anime-ds-k">MAL Score</span>
                  </div>
                ) : null}
                <div className="anime-ds">
                  <span className="anime-ds-v">{sel.episodes || "?"}</span>
                  <span className="anime-ds-k">Episodes</span>
                </div>
                {sel.year ? (
                  <div className="anime-ds">
                    <span className="anime-ds-v">{sel.year}</span>
                    <span className="anime-ds-k">Year</span>
                  </div>
                ) : null}
              </div>
              <p className="anime-d-desc">
                {sel.synopsis || "No description available."}
              </p>
              <div className="anime-d-genres">
                {sel.genres.map((g) => (
                  <span key={g} className="anime-dg">
                    {g}
                  </span>
                ))}
              </div>
              <div className="anime-d-links">
                <a
                  href={`https://myanimelist.net/search/all?q=${encodeURIComponent(
                    sel.title,
                  )}&cat=anime`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anime-dlink"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square" /> MAL
                </a>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    sel.title + " anime",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="anime-dlink"
                >
                  <i className="fa-solid fa-magnifying-glass" /> Search
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {infoOpen && (
        <div className="anime-ovl" onClick={closeInfo}>
          <div
            className="anime-info-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="anime-d-close"
              onClick={closeInfo}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="anime-i-banner">
              <img
                src="https://zubs.me/images/banner.png"
                alt=""
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="anime-i-body">
              <div className="anime-i-av-row">
                <div className="anime-i-av-wrap">
                  <img
                    className="anime-i-av"
                    src="https://zubs.me/images/1pfp.jpg"
                    alt="Zubariel"
                  />
                  <div className="anime-i-status" />
                </div>
                <div className="anime-i-text-col">
                  <p className="anime-i-name">Zubariel</p>
                  <p className="anime-i-handle">_zubr.l</p>
                </div>
              </div>

              <div className="anime-i-divider" />

              <p className="anime-i-section-title">Statistics</p>
              <div className="anime-i-grid">
                <div className="anime-istat">
                  <div className="anime-istat-v">{stats.total}</div>
                  <div className="anime-istat-k">Anime</div>
                </div>
                <div className="anime-istat">
                  <div className="anime-istat-v">75</div>
                  <div className="anime-istat-k">Manga</div>
                </div>
                <div className="anime-istat">
                  <div className="anime-istat-v">{stats.avg}</div>
                  <div className="anime-istat-k">Avg</div>
                </div>
              </div>

              <p className="anime-i-section-title">About</p>
              <div className="anime-i-details">
                <div className="anime-irow">
                  <span className="anime-ik">Favorite Anime</span>
                  <span className="anime-iv">Code Geass</span>
                </div>
                <div className="anime-irow">
                  <span className="anime-ik">Current Fav</span>
                  <span className="anime-iv">My Teen Rom-Com SNAFU</span>
                </div>
                <div className="anime-irow">
                  <span className="anime-ik">Favorite Genre</span>
                  <span className="anime-iv">Shounen / Romcom</span>
                </div>
                <div className="anime-irow">
                  <span className="anime-ik">Watching Since</span>
                  <span className="anime-iv">2015</span>
                </div>
                <div className="anime-irow">
                  <span className="anime-ik">Last Updated</span>
                  <span className="anime-iv">2026</span>
                </div>
              </div>

              <p className="anime-i-section-title">Links</p>
              <div className="anime-i-links">
                <Link className="anime-ilink" to="/manga-list">
                  Manga List
                </Link>
                <a
                  className="anime-ilink"
                  href="https://discord.zubs.me"
                  target="_blank"
                  rel="noreferrer"
                >
                  Discord
                </a>
                <Link className="anime-ilink" to="/portfolio">
                  Portfolio
                </Link>
                <Link className="anime-ilink" to="/">
                  Linktree
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
