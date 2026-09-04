import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `calculator`,
  head: `Simple`,
  word: `Calculator.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-js`, label: `JavaScript` },
    { icon: `fa-brands fa-html5`, label: `HTML` },
    { icon: `fa-brands fa-css3-alt`, label: `CSS` },
  ],
  subtitle: `A minimal dark-themed calculator with a 4-column grid layout. Supports +, −, ×, ÷, %, backspace, and decimal all in vanilla JS with \`eval()\`.`,
  info: [
    { head: `// how to use`, body: `Paste into any page. Extend the button grid to add scientific functions like \`Math.sqrt()\` or trig. Swap \`eval()\` for a safer parser if needed.` },
    { head: `// credits`, body: `A beginner project for practising grid layouts and event handling. Inspired by standard calculator UIs.` },
  ],
  files: [
    { name: `calculator.html`, lang: `html`, code: `<div class="calc">
  <input id="display" readonly/>
  <div class="keys">
    <button onclick="clr()">C</button>
    <button onclick="app('%')">%</button>
    <button onclick="bksp()">⌫</button>
    <button onclick="app('/')">÷</button>
    <button onclick="app('7')">7</button><button onclick="app('8')">8</button><button onclick="app('9')">9</button>
    <button onclick="app('*')">×</button>
    <button onclick="app('4')">4</button><button onclick="app('5')">5</button><button onclick="app('6')">6</button>
    <button onclick="app('-')">−</button>
    <button onclick="app('1')">1</button><button onclick="app('2')">2</button><button onclick="app('3')">3</button>
    <button onclick="app('+')">+</button>
    <button onclick="app('0')" style="grid-column:span 2">0</button>
    <button onclick="app('.')">.</button>
    <button onclick="calc()">=</button>
  </div>
</div>

<style>
  .calc { width:260px; background:#111; border-radius:12px; padding:1rem; box-shadow:0 8px 32px #0008; }
  #display { width:100%; background:#000; color:#a78bfa; font-size:1.5rem; text-align:right; padding:.5rem .75rem; border:none; border-radius:8px; margin-bottom:.75rem; }
  .keys { display:grid; grid-template-columns:repeat(4,1fr); gap:6px; }
  .keys button { padding:.6rem; background:#1e1e1e; color:#e4e4e7; border:none; border-radius:8px; cursor:pointer; font-size:1rem; transition:background .15s; }
  .keys button:hover { background:#2e2e2e; }
</style>

<script>
  let expr = "";
  const d = () => document.getElementById("display");
  const app  = v => { expr += v; d().value = expr; };
  const clr  = ()  => { expr = ""; d().value = ""; };
  const bksp = ()  => { expr = expr.slice(0, -1); d().value = expr; };
  const calc = ()  => {
    try { expr = String(eval(expr)); d().value = expr; }
    catch { d().value = "Error"; expr = ""; }
  };
</script>` },
  ],
  prev: { label: `animated background`, to: `/snippet/web/background` },
  next: { label: `memory match game`, to: `/snippet/web/memory` },
};

export function SimpleCalculator() {
  return <SnippetDocShell doc={doc} />;
}
