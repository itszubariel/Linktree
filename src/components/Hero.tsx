export function Hero() {
  return (
    <section id="home" className="hero" style={{ paddingBottom: "2rem" }}>
      <h1
        className="rise"
        style={{
          animationDelay: "0.05s",
          marginBottom: "1rem",
          marginTop: "6rem",
        }}
      >
        Hi, I'm <span className="gradient-word">Zubariel</span>
        <br />
      </h1>

      <p className="hero-sub rise" style={{ animationDelay: "0.1s" }}>
        A self-taught developer who builds whatever catches my interest: apps,
        scripts, bots, and more. Always open to cool collaborations.
      </p>

      <div
        className="hero-actions rise"
        style={{ animationDelay: "0.15s", marginBottom: "0" }}
      >
        <a href="/portfolio" className="btn btn-primary">
          View my portfolio <i className="fa-solid fa-arrow-right" />
        </a>
        <a href="/projects" className="btn btn-ghost">
          Browse projects
        </a>
      </div>
    </section>
  );
}
