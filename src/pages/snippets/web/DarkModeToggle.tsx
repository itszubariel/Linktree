import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `darkmode-toggle`,
  head: `Dark/Light`,
  word: `Mode Toggle.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-js`, label: `JavaScript` },
    { icon: `fa-brands fa-css3-alt`, label: `CSS` },
    { icon: `fa-brands fa-html5`, label: `HTML` },
  ],
  subtitle: `A smooth dark/light mode toggle that persists via \`localStorage\`. Animates between ☀️ and 🌙 icons with a CSS transition on the body.`,
  info: [
    { head: `// how to use`, body: `Add \`data-theme\` CSS variables to your \`:root\` and \`[data-theme="dark"]\` selectors. The script handles the rest automatically on load.` },
    { head: `// credits`, body: `A standard pattern for theme toggling built with only CSS variables and localStorage. No dependencies.` },
  ],
  files: [
    { name: `toggle.html`, lang: `html`, code: `<button id="toggle" aria-label="Toggle theme">🌙</button>

<style>
  :root { --bg:#fff; --text:#111; }
  [data-theme="dark"] { --bg:#111; --text:#f5f5f5; }
  body { background:var(--bg); color:var(--text); transition:background .3s, color .3s; }
  #toggle {
    font-size:1.5rem; background:none; border:none;
    cursor:pointer; transition:transform .3s;
  }
  #toggle:hover { transform:rotate(20deg) scale(1.2); }
</style>

<script>
  const btn = document.getElementById("toggle");
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
  btn.textContent = saved === "dark" ? "☀️" : "🌙";

  btn.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    btn.textContent = next === "dark" ? "☀️" : "🌙";
  });
</script>` },
  ],
  prev: { label: `frosted profile`, to: `/snippet/web/frosted-profile` },
  next: { label: `toast notifications`, to: `/snippet/web/toast-notification` },
};

export function DarkModeToggle() {
  return <SnippetDocShell doc={doc} />;
}
