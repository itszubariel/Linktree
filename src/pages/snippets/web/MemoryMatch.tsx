import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `memory`,
  head: `Memory`,
  word: `Match Game.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-js`, label: `JavaScript` },
    { icon: `fa-brands fa-html5`, label: `HTML` },
    { icon: `fa-brands fa-css3-alt`, label: `CSS` },
  ],
  subtitle: `A 4×4 emoji memory match game. Cards flip on click, matched pairs stay revealed, unmatched pairs flip back. Fully self-contained no libraries needed.`,
  info: [
    { head: `// how to use`, body: `Swap \`EMOJIS\` array for your own icons or images. Add a move counter or timer on top of the existing \`check()\` function to extend it.` },
    { head: `// credits`, body: `A classic project for learning DOM manipulation, closures, and game state management in vanilla JavaScript.` },
  ],
  files: [
    { name: `memory.html`, lang: `html`, code: `<div id="board"></div>
<p id="status">Find all pairs!</p>
<button onclick="init()">Restart</button>

<style>
  #board { display:grid; grid-template-columns:repeat(4,70px); gap:8px; margin:1rem 0; }
  .card { width:70px; height:70px; border-radius:8px; background:#1e1e1e; display:grid; place-items:center; font-size:1.75rem; cursor:pointer; border:1px solid #2a2a2a; user-select:none; transition:background .2s; }
  .card.flipped { background:#2d1f5e; }
  .card.matched { background:#14532d; pointer-events:none; }
</style>

<script>
  const EMOJIS = ['🐶','🐱','🦊','🐻','🐼','🦁','🐸','🐧'];
  let flipped = [], locked = false;

  function shuffle(a) { return a.sort(() => Math.random() - .5); }

  function init() {
    flipped = []; locked = false;
    const cards = shuffle([...EMOJIS, ...EMOJIS]);
    const board = document.getElementById('board');
    board.innerHTML = '';
    document.getElementById('status').textContent = 'Find all pairs!';
    cards.forEach(emoji => {
      const el = document.createElement('div');
      el.className = 'card'; el.dataset.val = emoji;
      el.addEventListener('click', flip);
      board.appendChild(el);
    });
  }

  function flip() {
    if (locked || this.classList.contains('flipped')) return;
    this.textContent = this.dataset.val;
    this.classList.add('flipped');
    flipped.push(this);
    if (flipped.length === 2) check();
  }

  function check() {
    locked = true;
    const [a, b] = flipped;
    if (a.dataset.val === b.dataset.val) {
      a.classList.add('matched'); b.classList.add('matched');
      flipped = []; locked = false;
      if (document.querySelectorAll('.matched').length === 16)
        document.getElementById('status').textContent = '🎉 You win!';
    } else {
      setTimeout(() => {
        a.textContent = ''; b.textContent = '';
        a.classList.remove('flipped'); b.classList.remove('flipped');
        flipped = []; locked = false;
      }, 800);
    }
  }

  init();
</script>` },
  ],
  prev: { label: `simple calculator`, to: `/snippet/web/calculator` },
  next: { label: `simple clicker game`, to: `/snippet/web/clicker` },
};

export function MemoryMatch() {
  return <SnippetDocShell doc={doc} />;
}
