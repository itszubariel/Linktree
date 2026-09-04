import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `toast-notification`,
  head: `Toast`,
  word: `Notifications.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-js`, label: `JavaScript` },
    { icon: `fa-brands fa-css3-alt`, label: `CSS` },
    { icon: `fa-brands fa-html5`, label: `HTML` },
  ],
  subtitle: `Lightweight toast notifications with \`success\`, \`error\`, \`warning\`, and \`info\` types. Auto-dismiss after 3 seconds no dependencies.`,
  info: [
    { head: `// how to use`, body: `Call \`toast("message", "type")\` from anywhere in your JS. Types: \`success\`, \`error\`, \`warning\`, \`info\`. Stack multiple at once.` },
    { head: `// credits`, body: `A zero-dependency toast system. Inspired by libraries like react-hot-toast but written in ~20 lines of vanilla JS.` },
  ],
  files: [
    { name: `toast.html`, lang: `html`, code: `<div style="display:flex;gap:.5rem;flex-wrap:wrap;">
  <button onclick="toast('Saved!','success')">Success</button>
  <button onclick="toast('Something went wrong','error')">Error</button>
  <button onclick="toast('Heads up!','warning')">Warning</button>
  <button onclick="toast('FYI: new update','info')">Info</button>
</div>
<div id="toast-container"></div>

<style>
  #toast-container { position:fixed; bottom:1.5rem; right:1.5rem; display:flex; flex-direction:column; gap:.5rem; }
  .toast {
    padding:.75rem 1.25rem; border-radius:8px; font-size:.875rem;
    color:#fff; animation:fadeIn .3s ease; min-width:180px;
  }
  .toast.success { background:#16a34a; }
  .toast.error   { background:#dc2626; }
  .toast.warning { background:#d97706; }
  .toast.info    { background:#2563eb; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
</style>

<script>
  function toast(msg, type = 'info') {
    const el = document.createElement('div');
    el.className = \`toast \\\${type}\`;
    el.textContent = msg;
    document.getElementById('toast-container').appendChild(el);
    setTimeout(() => el.remove(), 3000);
  }
</script>` },
  ],
  prev: { label: `dark/light mode toggle`, to: `/snippet/web/darkmode-toggle` },
  next: { label: `animated background`, to: `/snippet/web/background` },
};

export function ToastNotifications() {
  return <SnippetDocShell doc={doc} />;
}
