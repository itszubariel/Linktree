import { Hero } from "../components/Hero";
import { LinkGrid } from "../components/LinkGrid";
import { Seo } from "../components/Seo";

export function Linktree() {
  return (
    <main>
      <Seo
        title="@_zubr.l"
        ogTitle="Linktree"
        description="This is a linktree for Zubariel."
        keywords="HTML, CSS, JS, Portfolio, Developer, Zubariel"
      />
      <Hero />
      <LinkGrid />
    </main>
  );
}
