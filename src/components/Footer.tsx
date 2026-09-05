export function Footer() {
  return (
    <footer className="footer footer-giant">
      <div
        className="footer-giant-text"
        aria-hidden="true"
        style={{ opacity: 0.5 }}
      >
        ZUB<span className="footer-giant-full">ARIEL</span>
      </div>
      <span
        className="footer-copy"
        style={{
          opacity: 0.5,
          position: "absolute",
          bottom: ".5rem",
          right: "1.5rem",
        }}
      >
        © 2026 · built by zubariel
      </span>
    </footer>
  );
}
