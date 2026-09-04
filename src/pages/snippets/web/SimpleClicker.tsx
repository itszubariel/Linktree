import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `clicker`,
  head: `Simple`,
  word: `Clicker Game.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-js`, label: `JavaScript` },
    { icon: `fa-brands fa-html5`, label: `HTML` },
  ],
  subtitle: `A basic idle clicker with upgrades and \`localStorage\` persistence. Click to earn, spend clicks on upgrades that double your multiplier.`,
  info: [
    { head: `// how to use`, body: `Progress is saved automatically via \`localStorage\`. Click "Reset" to wipe the save. Extend with more upgrade tiers or auto-clicker logic.` },
    { head: `// credits`, body: `Inspired by cookie clicker-style idle games. A solid project for learning localStorage, state management, and game loops.` },
  ],
  files: [
    { name: `clicker.html`, lang: `html`, code: `<div style="text-align:center;font-family:sans-serif;">
  <h2>Clicks: <span id="count">0</span></h2>
  <button id="btn" style="font-size:3rem;background:none;border:none;cursor:pointer;">🖱️</button>
  <p style="color:#aaa;font-size:.85rem;">per click: <span id="mult">1</span></p>
  <button onclick="upgrade()" id="upg">Upgrade (cost: <span id="cost">10</span>)</button>
  <br><button onclick="reset()" style="margin-top:.5rem;font-size:.75rem;">Reset</button>
</div>

<script>
  let state = JSON.parse(localStorage.getItem('clicker')) || { clicks:0, mult:1, cost:10 };
  function save() { localStorage.setItem('clicker', JSON.stringify(state)); }
  function render() {
    document.getElementById('count').textContent = state.clicks;
    document.getElementById('mult').textContent  = state.mult;
    document.getElementById('cost').textContent  = state.cost;
  }
  document.getElementById('btn').addEventListener('click', () => {
    state.clicks += state.mult; save(); render();
  });
  function upgrade() {
    if (state.clicks < state.cost) return;
    state.clicks -= state.cost; state.mult *= 2; state.cost = Math.round(state.cost * 3);
    save(); render();
  }
  function reset() { state = { clicks:0, mult:1, cost:10 }; save(); render(); }
  render();
</script>` },
  ],
  prev: { label: `memory match game`, to: `/snippet/web/memory` },
  next: { label: `custom advancement`, to: `/snippet/mc/advancement` },
};

export function SimpleClicker() {
  return <SnippetDocShell doc={doc} />;
}
