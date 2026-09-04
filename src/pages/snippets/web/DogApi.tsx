import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `dog`,
  head: `Dog/Cat`,
  word: `API`,
  tail: `Snippet.`,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-js`, label: `JavaScript` },
    { icon: `fa-brands fa-html5`, label: `HTML` },
  ],
  subtitle: `Displays random dog and cat images using two public APIs with \`fetch()\`. Users can load new images dynamically with a button click no dependencies needed.`,
  info: [
    { head: `// how to use`, body: `Use the buttons to fetch new images from the Dog CEO API and The Cat API. Both are free with no auth required for basic usage.` },
    { head: `// credits`, body: `Inspired by beginner-friendly API projects showcasing dynamic content loading with plain JavaScript.` },
  ],
  files: [
    { name: `dog.html`, lang: `html`, code: `<button id="getDog">Get Doggo 🐕</button>
<br><br>
<img id="dogImg" src="" width="300" />

<script>
  document.getElementById("getDog").onclick = async () => {
    const res  = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    document.getElementById("dogImg").src = data.message;
  };
</script>` },
    { name: `cat.html`, lang: `html`, code: `<button id="getCat">Get Cat 🐈</button>
<br><br>
<img id="catImg" src="" width="300" />

<script>
  document.getElementById("getCat").onclick = async () => {
    const res  = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    document.getElementById("catImg").src = data[0].url;
  };
</script>` },
  ],
  prev: { label: `all snippets`, to: `/snippet` },
  next: { label: `login/signup form`, to: `/snippet/web/signup` },
};

export function DogApi() {
  return <SnippetDocShell doc={doc} />;
}
