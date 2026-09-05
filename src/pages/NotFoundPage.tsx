import { Link } from "react-router-dom";
import { useRef } from "react";
import { Seo } from "../components/Seo";

const MESSAGES = [
  "This page doesn't exist. Probably a skill issue.",
  "You found the void. It was here the whole time. Say hi to the nothing.",
  "404: the page ran away faster than your abandoned New Year's resolutions. Probably not coming back, sorry.",
  "This page is missing like your will to live on a Monday morning right before the coffee hits.",
  "The page you're looking for joined my ex and left. I don't know where either of them went.",
  "Either I forgot to build this page, or you forgot how to read URLs. Statistically it's 50/50.",
  "This page has been there... no wait, it hasn't. That was the joke. It was never there.",
  "You navigated so far off course that even my GPS just turned itself off and started crying.",
  "Congrats on finding this! You're now the only person who's ever visited this URL. Here's your reward: nothing.",
  "If this page were more lost you'd need to call a search party. And even the search party wouldn't find it.",
  "The page you wanted is having a mental health day. Respect its boundaries and go somewhere else.",
  "This isn't a 404. It's a 'sorry, chief' — I can't give you what doesn't exist.",
  "I checked the server logs. This page was never even born. No 26 years of wasted potential here.",
  "There's a chess opening named after this page: 'Illegal move, try again.' It's Black's best defense.",
  "You typed something. I looked for it. We're both disappointed. Let's move on before it gets awkward.",
  "Somewhere right now, a developer is blaming you for this. Don't worry, it's me. I'm the developer.",
  "I asked the server where this page went. The server just shrugged and updated its status to 'depressed'.",
  "404 not found: bigger plot twist than the one in your favorite anime.",
  "This page was archived, deleted, and then archived again just to be safe.",
  "You're in the wrong neighborhood, and the neighborhood doesn't even exist.",
  "The page you wanted and your motivation have a lot in common: both are gone and aren't coming back today.",
  "Error 404: whatever you typed is so wrong it's almost impressive.",
  "This page is like a gym membership: technically existed once, nobody really used it, now it's gone.",
  "The link you clicked was cursed before it was ever broken. Nothing personal.",
  "I didn't build this page and at this point I'm afraid to ask why.",
  "404: page deleted itself to avoid taxes. absolutely based, honestly.",
  "The page you want is with the other socks. Somewhere between the dryer and the void.",
  "This URL leads to a 'fictional endpoint' — yes, that's a real term. no, it's not an excuse.",
  "Looks like you're a bit too early. Or a lot too late. Time is weird like that.",
  "404: the page is on a coffee break forever. it has become the break.",
  "You found the one place on this site that doesn't exist. download your achievement.",
  "This page took a walk and never came back. The server filed a missing person report.",
  "The server checked, double-checked, then triple-checked. Conclusion: it's you.",
  "If this page was a person it'd blush every time someone missed it this badly.",
  "404: I don't know what you expected. Even I don't know. And I'm the one who made this.",
  "The page you're after quit without notice. HR was not notified.",
  "You've reached the end of the internet. Turn around and take the scenic route back.",
  "I tried to find this page for you. The page tried to find itself. Neither of us got anywhere.",
  "404: This page is now a legend told in a single line of server logs.",
  "This page's bestie, 'index.html', tried to vouch for it. Hosting provider said no.",
  "The internet ate this page. It wasn't listening when it was told to chew first.",
  "This error is sponsored by nothing. Absolutely nothing for miles.",
  "Page not found, like the will to reply to those 'hey' texts you still haven't answered.",
  "404: This page ghosted the entire website. probably for the best.",
  "The URL you typed has the same energy as a typo in a password you reset 3 times.",
  "I ran a search party, a torch brigade, and a prayer. The page stayed missing.",
  "This page is not in the matrix. It never loaded. It never will. Free yourself.",
  "404 — the short story: you. the plot twist: also you.",
  "Trust me, this page isn't hiding. It just never existed. Happens to the best of URLs.",
  "The page you're looking for is between a rock and a hard place, and neither is this site.",
];

const STATUS_LINES = [
  "404 - not found",
  "404 - lost in the sauce",
  "404 - page.exe has stopped responding",
  "404 - does not compute",
  "440 - page left on read",
  "404 - file says 'not today'",
  "404 - content has left the chat",
  "404 - wink wonked",
  "404 - fetch returned NULL like your last crush",
  "404 - that URL ain't it chief",
  "404 - reward: nothing",
  "404 - page understood the assignment... by not being there",
  "404 - my bad (and also your bad)",
  "404 - deleted because it was posting cringe",
  "404 - the page fell off the map (literally nowhere to find)",
];

const URL_LINES = [
  "this one. obviously the wrong one.",
  "somewhere so wrong it's basically a different website.",
  "the one you guessed. bold move.",
  "your detective skills, but for URLs.",
  "a URL that got lost on the way to becoming a URL.",
  "it was *there* at some point. allegedly.",
  "head empty, URL wrong.",
  "a very confident 50/50 you lost.",
  "the exact opposite of where you should be.",
  "you typed this while thinking 'this has to work'... it didn't.",
  "unreachable, like your sleep schedule.",
  "this is where dragons actually are. and they're not here either.",
  "the page asked to be forgotten. the page was forgotten.",
  "you hit it with the energy of 'just give it a shot'. it did not give.",
  "one character off from a working page. one. character.",
];

const RESPONSE_LINES = [
  ":')",
  "(╯°□°)╯︵┻━┻",
  "*crickets*",
  "0xDEADBEEF (it's dead, bee)",
  "null. just... null.",
  "page returned 404 and walked away mid-debug",
  "beep boop. nope.",
  "nothing here, keep scrolling",
  "cannot compute: too much optimism",
  "404. that is all. that is the whole response.",
  "the server laughed at us",
  "'not my problem' — apache, probably",
  "powers reduced to a shrug",
  "the page's final message: 'it was nice knowing you'",
  "empty response, full heart (of darkness)",
];

const BLAME_LINES = [
  "100% user error, source: me",
  "the user did it. source: the logs, probably",
  "me. it's always me.",
  "whoever typed that URL. that's who.",
  "a bug. and by bug i mean you.",
  "the page. it self-deleted out of spite.",
  "the hosting provider 'doing maintenance' (they forgot)",
  "yesterday's-you. today-you has to deal with it.",
  "that one weird link on twitter.",
  "the cat. it walked across the keyboard. again.",
  "nobody. it just... vanished. we don't talk about it.",
  "the intern. we don't have an intern. that's how bad it is.",
  "a gremlin in the router. unproven but highly suspected.",
  "the code reviewer. they simply 'did not see it'.",
  "me to you: this is your fault. you to me: rude. me: rude but true.",
];

const TIME_LINES = [
  "0.2ms. that's on you.",
  "0.0000001ms. lightning fast at being wrong.",
  "2.4 seconds with the page in a lead-lined box",
  "'a couple minutes' (it's been 3 hours)",
  "negative. the page took time away from us.",
  "80085ms. yes, really.",
  "however long it took you to notice. blink and you lost it.",
  "about the length of your average shower thought",
  "too long. we had a meeting about it.",
  "faster than you can say 'wait what'",
];

const HAIR_LINES = [
  "n/a (i have code, not hair)",
  "-1 hair. i gained shame instead.",
  "approx 3 hairs. your fault.",
  "more than i can count (i type, not count)",
  "all of them. the mirror confirmed it.",
  "a hair per request. you're expensive.",
  "0. my barber is shocked too.",
  "lost count at 'probably'",
];

const FACTS = [
  "4xx: the requester (you) did something wrong",
  "418 is a real status code. i'm a teapot.",
  "502: bad gateway. my gateway has trust issues.",
  "429: too many requests. calm down.",
  "404 is so famous it's basically a celebrity status code.",
  "there is no page 405 (except method not allowed, very different vibe)",
  "the first 404 was served in 1992. someone's still mad about it.",
  "100% of 404 pages lead somewhere. (usually here, apparently)",
  "error pages used to be plain text. we have glowed up so hard.",
  "the 'not found' symbol is just the number 4 losing its footing.",
  "some sites track 404s as easter eggs. this one just judges you.",
  "i once spent 2 hours on this 404 page. your page. think about that.",
  "a 404 is just a 200 that decided to be dramatic.",
  "some 404 pages have games on them. mine has sass. better.",
  "this page has better specs than half the 'smart' devices in your home.",
  "lorem ipsum pages feel found AND lost at the same time. deep.",
  "you refresh a 404 and it stays a 404. denial is a hell of a drug.",
  "the gray area between 'web page' and 'void' is exactly this page.",
  "404s are the greatest plot holes on the internet.",
  "the internet has infinite memes but finite pages. this one isn't even the latter.",
  "i can hear the 404. it's humming awkwardly.",
  "the teapot (418) is watching you from the void of status codes.",
  "curls in the parking garage of this page: wild, free, lost",
  "your browser feels nothing. it saw this a million times today.",
  "this page didn't come from the server. it came from somewhere worse: me.",
  "9 out of 10 programmers agree: 404 is the funniest number.",
  "this 404 was load-bearing. removing it crashed nothing. nice.",
  "the page is fine. the page is not found. both things are true.",
  "i'd tell you where the page went, but i'd have to 404 you too.",
  "the missing page's last words were probably 'please stand by'.",
  "every 404 is a reminder that perfection is just a redirect away.",
  "somewhere, a console.log('page not found') is crying.",
  "this page hates refresh buttons. it has standards.",
  "i offered the page a chance to come back. it chose the void.",
  "404: the end credits of a page that never aired.",
  "there's no 'I' in TEAM but there's definitely a 'U' in URL. check yours.",
  "this page went to the same place my motivation goes: somewhere.",
  "the page is legally considered missing. no next of kin.",
  "hop rick never: the page never came back.",
  "this flyer has more personality than most pages that DO exist.",
  "a wise error once said: '404 and a dream'.",
  "123 testing this page. it's not here. testing over.",
  "this page is the answer to a question nobody asked.",
  "your URL: ✂️. this page: gone.",
  "the page's status is 'it's complicated'.",
  "i blog about 404s. nobody commented. classic 404 energy.",
  "if a page 404s in the woods and nobody is there, is it still loading?",
  "a 404 page is just a plot twist nobody saw coming (but everyone should have).",
  "don't worry, the page wanted this.",
  "the page's favorite song: 'Somewhere Only We Know'.",
];

const QUICK_LINKS = [
  {
    to: "/",
    icon: "fa-solid fa-house",
    label: "Linktree",
    desc: "the whole point of this site",
  },
  {
    to: "/projects",
    icon: "fa-solid fa-code",
    label: "Projects",
    desc: "things i've actually built",
  },
  {
    to: "/portfolio",
    icon: "fa-solid fa-briefcase",
    label: "Portfolio",
    desc: "the fancy extended resume",
  },
  {
    to: "/snippet",
    icon: "fa-solid fa-scissors",
    label: "Snippets",
    desc: "useful code scraps",
  },
  {
    to: "/now",
    icon: "fa-solid fa-bolt",
    label: "Now",
    desc: "what i'm focused on right now",
  },
  {
    to: "/contact",
    icon: "fa-solid fa-envelope",
    label: "Contact",
    desc: "shout at me about this page",
  },
];

function pick(arr: string[], seed: number, offset: number): string {
  return arr[(seed + offset) % arr.length];
}

export function NotFoundPage() {
  const seedRef = useRef<number>(0);
  const seed = seedRef.current || (seedRef.current = (Math.random() * 1e6) | 0);
  const msg = MESSAGES[seed % MESSAGES.length];

  const diagnostics = [
    ["status", pick(STATUS_LINES, seed, 0)],
    ["requested url", pick(URL_LINES, seed, 1)],
    ["server response", pick(RESPONSE_LINES, seed, 2)],
    ["blame", pick(BLAME_LINES, seed, 3)],
    ["time wasted", pick(TIME_LINES, seed, 4)],
    ["hair lost", pick(HAIR_LINES, seed, 5)],
  ];

  const facts = [
    pick(FACTS, seed, 0),
    pick(FACTS, seed, 7),
    pick(FACTS, seed, 13),
    pick(FACTS, seed, 29),
    pick(FACTS, seed, 41),
    pick(FACTS, seed, 47),
  ];

  return (
    <main>
      <Seo
        title="Zubariel | 404"
        ogTitle="Page not found"
        description="That page doesn't exist. Head back to Zubariel's linktree."
        keywords="404, Zubariel, not found, error"
      />
      <section className="page-hero notfound-hero">
        <p className="kicker">// error 404</p>
        <h1>
          404<span className="gradient-word">.</span>
        </h1>
        <p className="page-hero-sub">{msg}</p>
        <div className="notfound-actions">
          <Link to="/" className="btn btn-primary">
            → go home
          </Link>
          <Link to="/portfolio" className="btn btn-ghost">
            → view portfolio
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">/usr/bin/404</p>
            <h2>system diagnostics</h2>
          </div>
          <span className="count">
            {String(diagnostics.length).padStart(2, "0")} lines
          </span>
        </div>
        <div className="notfound-code">
          <div className="notfound-code-head">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="notfound-code-title">~/zubs.me/_lost</span>
          </div>
          <div className="notfound-code-body">
            <p className="notfound-line">
              $ curl -v {window.location.pathname}
            </p>
            {diagnostics.map(([k, v]) => (
              <p key={k} className="notfound-log">
                <span className="notfound-key">{k}</span>
                <span>{v}</span>
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">alternatives</p>
            <h2>You were probably looking for</h2>
          </div>
          <span className="count">
            {String(QUICK_LINKS.length).padStart(2, "0")} places
          </span>
        </div>

        <div className="grid-links">
          {QUICK_LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              className="card rise"
              style={{ animationDelay: `${0.05 * i}s` }}
            >
              <span className="card-path">
                ~/{l.label.toLowerCase().replace(/ /g, "-")}
              </span>
              <span className="card-body">
                <span className="card-desc">{l.desc}</span>
              </span>
              <i className="fa-solid fa-arrow-right card-arrow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="kicker">trivia</p>
            <h2>Useless facts</h2>
          </div>
          <span className="count">
            {String(facts.length).padStart(2, "0")} facts
          </span>
        </div>
        <div className="notfound-facts">
          {facts.map((f) => (
            <p key={f} className="notfound-fact">
              {f}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
