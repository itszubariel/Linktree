import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `frosted-profile`,
  head: `Frosted-Glass`,
  word: `Profile Card.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-html5`, label: `HTML` },
    { icon: `fa-brands fa-css3-alt`, label: `CSS` },
  ],
  subtitle: `A glassmorphism profile card built with \`backdrop-filter: blur()\`. Animated background blobs, hover lift effect, and a glass button no JS needed.`,
  info: [
    { head: `// how to use`, body: `Drop this into any dark-background page. Swap the avatar URL, name, and bio. The blobs are pure CSS adjust colors and sizes to match your palette.` },
    { head: `// credits`, body: `Inspired by the glassmorphism design trend. Uses CSS \`backdrop-filter\` for the frosted effect supported in all modern browsers.` },
  ],
  files: [
    { name: `profile.html`, lang: `html`, code: `<div class="bg">
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="card">
    <img src="https://i.pravatar.cc/100" class="avatar"/>
    <h2>Zubariel</h2>
    <p>Full-stack dev & tinkerer</p>
    <button>Follow</button>
  </div>
</div>

<style>
  .bg { position:relative; display:grid; place-items:center; min-height:100vh; overflow:hidden; background:#0d0d0d; }
  .blob { position:absolute; border-radius:50%; filter:blur(60px); opacity:.5; }
  .b1 { width:300px; height:300px; background:#7c3aed; top:10%; left:10%; }
  .b2 { width:250px; height:250px; background:#2563eb; bottom:10%; right:10%; }
  .card {
    position:relative; z-index:1; text-align:center;
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(16px);
    border:1px solid rgba(255,255,255,0.15);
    border-radius:1.25rem; padding:2.5rem 2rem;
    color:#fff; transition:transform .3s;
  }
  .card:hover { transform:translateY(-6px); }
  .avatar { border-radius:50%; width:80px; margin-bottom:1rem; }
  button {
    margin-top:1rem; padding:0.5rem 1.5rem;
    border-radius:99px; border:1px solid rgba(255,255,255,0.3);
    background:rgba(255,255,255,0.1); color:#fff; cursor:pointer;
    backdrop-filter:blur(8px);
  }
  button:hover { background:rgba(255,255,255,0.2); }
</style>` },
  ],
  prev: { label: `login/signup form`, to: `/snippet/web/signup` },
  next: { label: `dark/light mode toggle`, to: `/snippet/web/darkmode-toggle` },
};

export function FrostedProfile() {
  return <SnippetDocShell doc={doc} />;
}
