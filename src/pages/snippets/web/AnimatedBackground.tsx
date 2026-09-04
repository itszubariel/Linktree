import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `background`,
  head: `Animated SVG`,
  word: `Background.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-html5`, label: `HTML` },
    { icon: `fa-brands fa-css3-alt`, label: `CSS (SVG)` },
  ],
  subtitle: `A lightweight animated SVG wave background using \`&lt;animateTransform&gt;\`. Three layered waves with different speeds for depth, plus a parallax scroll effect.`,
  info: [
    { head: `// how to use`, body: `Drop the SVG into your page. Tweak the \`stop-color\` values to match your brand. The parallax script is optional remove it if you don't need scroll movement.` },
    { head: `// credits`, body: `The same animated wave used across this site. Pure SVG no canvas, no JS animation libraries.` },
  ],
  files: [
    { name: `background.html`, lang: `html`, code: `<svg id="bg" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 1600 900"
     preserveAspectRatio="xMidYMax slice"
     style="position:fixed;inset:0;width:100%;height:100%;z-index:-1;">
  <defs>
    <linearGradient id="waveGrad">
      <stop offset="0%"   stop-color="rgba(139,92,246,0.06)"/>
      <stop offset="50%"  stop-color="rgba(139,92,246,0.12)"/>
      <stop offset="100%" stop-color="rgba(139,92,246,0.06)"/>
    </linearGradient>
    <path id="wave" fill="url(#waveGrad)"
      d="M-363,502s237-42,505,0s372,39,576,0s294-39,505,6s494,48,717-5v560H-363Z"/>
  </defs>
  <g>
    <use href="#wave" opacity=".3">
      <animateTransform attributeName="transform" type="translate"
        dur="10s" repeatCount="indefinite"
        values="270 230;-334 180;270 230"/>
    </use>
    <use href="#wave" opacity=".6">
      <animateTransform attributeName="transform" type="translate"
        dur="8s" repeatCount="indefinite"
        values="-270 230;243 220;-270 230"/>
    </use>
    <use href="#wave" opacity=".9">
      <animateTransform attributeName="transform" type="translate"
        dur="6s" repeatCount="indefinite"
        values="0 230;-140 200;0 230"/>
    </use>
  </g>
</svg>

<!-- Parallax scroll -->
<script>
  window.addEventListener("scroll", () => {
    document.getElementById("bg").style.transform =
      \`translateY(\\\${window.pageYOffset * 0.2}px)\`;
  });
</script>` },
  ],
  prev: { label: `toast notifications`, to: `/snippet/web/toast-notification` },
  next: { label: `simple calculator`, to: `/snippet/web/calculator` },
};

export function AnimatedBackground() {
  return <SnippetDocShell doc={doc} />;
}
