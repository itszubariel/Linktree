import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const NAV: { label: string; to: string; internal: boolean }[] = [
  { label: "Home", to: "/", internal: true },
  { label: "Portfolio", to: "/portfolio", internal: true },
  { label: "Now", to: "/now", internal: true },
  { label: "Snippets", to: "/snippet", internal: true },
  { label: "Projects", to: "/projects", internal: true },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="header">
      <div className="nav-wrap">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <img src="https://zubs.me/images/1pfp.jpg" alt="" />
          </span>
          <span className="mono">zubariel</span>
        </Link>

        <nav className="nav-desktop">
          {NAV.map((n) => (
            <NavLink
              key={n.label}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <Link to="/contact" className="nav-cta nav-cta-desktop">
          Contact me <i className="fa-solid fa-arrow-right" />
        </Link>

        <button
          className="nav-burger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <i className={open ? "fa-solid fa-xmark" : "fa-solid fa-bars"} />
        </button>
      </div>

      {open && (
        <div className="mobile-panel">
          {NAV.map((n) => (
            <NavLink
              key={n.label}
              to={n.to}
              end={n.to === "/"}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)}>
            Contact me
          </Link>
        </div>
      )}
    </header>
  );
}
