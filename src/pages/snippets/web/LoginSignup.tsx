import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `signup`,
  head: `Login/Signup`,
  word: `Form.`,
  tail: ``,
  badge: `web`,
  tags: [
    { icon: `fa-brands fa-js`, label: `JavaScript` },
    { icon: `fa-brands fa-html5`, label: `HTML` },
    { icon: `fa-brands fa-css3-alt`, label: `CSS` },
  ],
  subtitle: `A toggleable login and signup form with smooth transitions. Uses \`classList.toggle()\` to switch between views no libraries needed.`,
  info: [
    { head: `// how to use`, body: `Click the link at the bottom of each form to toggle between login and signup. Wire up the buttons to your own backend or auth service.` },
    { head: `// credits`, body: `A classic beginner UI pattern for learning form layouts and DOM toggling with plain JavaScript.` },
  ],
  files: [
    { name: `form.html`, lang: `html`, code: `<div class="container">
  <div class="form-box" id="login">
    <h2>Login</h2>
    <input type="text" placeholder="Username" />
    <input type="password" placeholder="Password" />
    <button>Log In</button>
    <p>No account? <a onclick="toggle()">Sign up</a></p>
  </div>
  <div class="form-box hidden" id="signup">
    <h2>Sign Up</h2>
    <input type="text" placeholder="Username" />
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Password" />
    <button>Create Account</button>
    <p>Have an account? <a onclick="toggle()">Log in</a></p>
  </div>
</div>

<style>
  .hidden { display: none; }
  .form-box { display: flex; flex-direction: column; gap: 0.75rem; }
  input, button { padding: 0.6rem 1rem; border-radius: 6px; border: 1px solid #ccc; }
  a { cursor: pointer; color: blue; }
</style>

<script>
  function toggle() {
    document.getElementById("login").classList.toggle("hidden");
    document.getElementById("signup").classList.toggle("hidden");
  }
</script>` },
  ],
  prev: { label: `dog/cat api`, to: `/snippet/web/dog` },
  next: { label: `frosted profile`, to: `/snippet/web/frosted-profile` },
};

export function LoginSignup() {
  return <SnippetDocShell doc={doc} />;
}
