const img = (name: string) => `https://zubs.me/images/${name}`;

export interface TechItem {
  icon: string;
  label: string;
}

export interface Project {
  image: string;
  name: string;
  category: string;
  desc: string;
  tech: TechItem[];
  href: string;
  github?: string;
}

export const featuredProjects: Project[] = [
  {
    image: img("zbr-website.png"),
    name: "ZBR",
    category: "Custom Scripting Language",
    desc: "The scripting language for Discord bots. Write commands as plain .zbr files, no boilerplate, no event handlers, no framework knowledge required.",
    tech: [
      { icon: "fa-brands fa-rust", label: "Rust" },
      { icon: "fa-brands fa-discord", label: "Serenity" },
      { icon: "fa-solid fa-database", label: "SQLite" },
    ],
    href: "https://zbrlang.tech",
    github: "https://github.com/zbrlang",
  },
  {
    image: img("trackbirthdays.png"),
    name: "Track Birthdays",
    category: "PWA & Android App",
    desc: "Never miss a birthday again. Track birthdays with push notifications, group organisation, AI gift ideas, and a clean dark UI.",
    tech: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-solid fa-bolt", label: "Vite" },
      { icon: "fa-solid fa-database", label: "Supabase" },
    ],
    href: "https://trackbirthdays.zubs.me",
    github: "https://github.com/itszubariel/Track-Birthdays",
  },
  {
    image: img("bdtools.png"),
    name: "BDTools",
    category: "Web Application",
    desc: "Collection of free and open source web-based tools for Bot Designer for Discord (BDFD)",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-solid fa-wind", label: "Tailwind CSS" },
    ],
    href: "https://bdtools.xyz/",
    github: "https://github.com/itszubariel/BDTools",
  },
  {
    image: img("scrobbler.png"),
    name: "scrobbler",
    category: "Verified Discord Bot",
    desc: "A Last.fm-powered Discord bot for tracking music activity, stats, and listening history.",
    tech: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-brands fa-discord", label: "Discord.js" },
      { icon: "fa-solid fa-database", label: "Prisma & PostgreSQL" },
    ],
    href: "https://scrobbler.is-a.bot/invite",
    github: "https://github.com/itszubariel/scrobbler",
  },
  {
    image: img("hol.png"),
    name: "Heart of Life (HoL)",
    category: "Minecraft Mod",
    desc: "Adds a single-player heart progression system inspired by Lifesteal.",
    tech: [
      { icon: "fa-brands fa-java", label: "Java" },
      { icon: "fa-solid fa-cubes", label: "Fabric API" },
      { icon: "fa-solid fa-mountain", label: "Modrinth" },
    ],
    href: "https://modrinth.com/mod/hol",
    github: "https://github.com/itszubariel/Heart-of-Life",
  },
  {
    image: img("statify.png"),
    name: "Statify",
    category: "VS Code Extension",
    desc: "A Visual Studio Code extension that provides useful project statistics and insights directly inside your editor.",
    tech: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-solid fa-code", label: "VSCode" },
    ],
    href: "https://marketplace.visualstudio.com/items?itemName=zubariel.statify",
    github: "https://github.com/itszubariel/Statify",
  },
];

export const moreProjects: Project[] = [
  {
    image: img("zOS.png"),
    name: "zOS",
    category: "Operating System Kernel",
    desc: "A hobby x86_64 kernel in Rust featuring VGA text mode, keyboard input, and a simple command shell.",
    tech: [
      { icon: "fa-brands fa-rust", label: "Rust" },
      { icon: "fa-solid fa-microchip", label: "Assembly" },
      { icon: "fa-solid fa-link", label: "Linker Script" },
    ],
    href: "https://github.com/itszubariel/zOS",
    github: "https://github.com/itszubariel/zOS",
  },
  {
    image: img("znet.png"),
    name: "znet",
    category: "Network Scanner & Visualizer",
    desc: "A cross-platform CLI tool that scans your local network via ARP, identifies devices by manufacturer and hostname, and provides a live force-directed graph dashboard.",
    tech: [
      { icon: "fa-brands fa-rust", label: "Rust" },
      { icon: "fa-solid fa-server", label: "Axum" },
      { icon: "fa-solid fa-microchip", label: "Yew + WASM" },
    ],
    href: "https://github.com/itszubariel/znet",
    github: "https://github.com/itszubariel/znet",
  },
  {
    image: img("zhron.png"),
    name: "zhron",
    category: "Rust CLI",
    desc: "Automates writing changelog entries by reading existing CHANGELOG.md style and current git diff, then generating a matching entry via an LLM.",
    tech: [
      { icon: "fa-brands fa-rust", label: "Rust" },
      { icon: "fa-solid fa-robot", label: "LLM AI" },
      { icon: "fa-brands fa-git-alt", label: "Git" },
    ],
    href: "https://github.com/itszubariel/zhron",
    github: "https://github.com/itszubariel/zhron",
  },
  {
    image: img("zapqr.png"),
    name: "ZapQR",
    category: "PWA & Android App",
    desc: "A free, open-source QR code scanner and generator. No ads, no tracking, no accounts. Just scan or create QR codes instantly.",
    tech: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-solid fa-bolt", label: "Vite" },
      { icon: "fa-solid fa-mobile-screen-button", label: "Capacitor" },
    ],
    href: "https://zapqr.zubs.me",
    github: "https://github.com/itszubariel/ZapQR",
  },
  {
    image: img("zbr-website.png"),
    name: "ZBR Website",
    category: "Web Development",
    desc: "The official website for the ZBR scripting language, featuring documentation, web api, examples, and resources.",
    tech: [
      { icon: "fa-brands fa-react", label: "Next.js" },
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-solid fa-file-code", label: "MDX" },
    ],
    href: "https://zbrlang.tech",
    github: "https://github.com/zbrlang/zbr-website",
  },
  {
    image: img("zbr-extensions.png"),
    name: "ZBR Extensions",
    category: "Extension Repository",
    desc: "The official collection of IDE extensions for ZBR, a scripting language and high-performance runtime engine built in Rust for Discord bots.",
    tech: [
      { icon: "fa-solid fa-code", label: "C" },
      { icon: "fa-solid fa-code", label: "C++" },
      { icon: "fa-solid fa-tree", label: "tree-sitter" },
    ],
    href: "https://zbrlang.tech/extensions",
    github: "https://github.com/zbrlang/zbr-extensions",
  },
  {
    image: img("zbr-support-bot.png"),
    name: "ZBR Support Bot",
    category: "Discord Support Bot",
    desc: "The official Discord support bot for the ZBR scripting language, built entirely with ZBR.",
    tech: [
      { icon: "fa-solid fa-terminal", label: "ZBR" },
      { icon: "fa-brands fa-discord", label: "Discord" },
      { icon: "fa-solid fa-robot", label: "Bot" },
    ],
    href: "https://zbrlang.tech/support-bot",
    github: "https://github.com/zbrlang/zbr-bot",
  },
  {
    image: img("zbr-webapp.png"),
    name: "ZBR Dashboard",
    category: "Dashboard & Web Application",
    desc: "The official web dashboard for managing ZBR projects, bots, configurations, analytics, and ecosystem integrations through a modern browser-based interface.",
    tech: [
      { icon: "fa-brands fa-react", label: "Next.js" },
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-solid fa-window-maximize", label: "WebApp" },
    ],
    href: "https://app.zbrlang.tech/",
    github: "https://github.com/zbrlang/zbr-webapp",
  },
  {
    image: img("scrobbler-dashboard.png"),
    name: "scrobbler's dashboard",
    category: "Web Application",
    desc: "A web dashboard for scrobbler. view your last.fm stats, charts, and listening insights.",
    tech: [
      { icon: "fa-solid fa-code", label: "TypeScript" },
      { icon: "fa-brands fa-react", label: "React" },
      { icon: "fa-solid fa-bolt", label: "Vite" },
      { icon: "fa-solid fa-database", label: "Prisma" },
    ],
    href: "https://app.scrobbler.is-a.bot/",
    github: "https://github.com/itszubariel/scrobbler-dashboard",
  },
  {
    image: img("scrobbler-website.png"),
    name: "scrobbler's website",
    category: "Web Development",
    desc: "The official landing page for the scrobbler ecosystem, built with modern web technologies.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-solid fa-wind", label: "Tailwind CSS" },
    ],
    href: "https://scrobbler.is-a.bot/",
    github: "https://github.com/itszubariel/scrobbler/tree/master/public",
  },
  {
    image: img("api-bdtools.png"),
    name: "BDTools API",
    category: "REST API",
    desc: "A public API for Bot Designer for Discord tools, node status monitoring, guild list management, and more.",
    tech: [
      { icon: "fa-brands fa-node-js", label: "Node.js" },
      { icon: "fa-solid fa-bolt", label: "Netlify Functions" },
      { icon: "fa-solid fa-leaf", label: "MongoDB" },
    ],
    href: "https://bdtools.xyz/docs",
    github: "https://github.com/itszubariel/BDTools/tree/main/docs",
  },
  {
    image: img("bdfd-bg.png"),
    name: "BDFD",
    category: "Mobile Application",
    desc: "Contributed to a popular mobile application for creating Discord bots.",
    tech: [
      { icon: "fa-solid fa-language", label: "Translator" },
      { icon: "fa-solid fa-book-open", label: "Wiki Contributor" },
      { icon: "fa-solid fa-headset", label: "Support" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.jakubtomana.discordbotdesinger&hl=en",
    github: "https://github.com/NilPointer-Software/bdfd-wiki",
  },
  {
    image: img("holad.png"),
    name: "Heart of Life Additions (HoLad)",
    category: "Minecraft Mod",
    desc: "Additions mod to Heart of Life. (Adds tools, weapons and armor to HoL)",
    tech: [
      { icon: "fa-brands fa-java", label: "Java" },
      { icon: "fa-solid fa-cubes", label: "Fabric API" },
      { icon: "fa-solid fa-mountain", label: "Modrinth" },
    ],
    href: "https://modrinth.com/mod/holad",
    github: "https://github.com/itszubariel/Heart-of-Life-Addition",
  },
  {
    image: img("animelist.png"),
    name: "My Anime List",
    category: "Web Application",
    desc: "A personalized list for tracking and showcasing my watched anime simple and clean.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-react", label: "Jikan API" },
      { icon: "fa-solid fa-wind", label: "Tailwind CSS" },
    ],
    href: "/anime-list",
    github:
      "https://github.com/itszubariel/Linktree/tree/main/navigation/lists/anime",
  },
  {
    image: img("mangalist.png"),
    name: "My Manga List",
    category: "Web Application",
    desc: "A custom interface to track and showcase my manga reading list.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-react", label: "Jikan API" },
      { icon: "fa-solid fa-wind", label: "Tailwind CSS" },
    ],
    href: "/manga-list",
    github:
      "https://github.com/itszubariel/Linktree/tree/main/navigation/lists/manga",
  },
];

export const oldProjects: Project[] = [
  {
    image: img("bot.png"),
    name: "Auora Bot",
    category: "Discord Bot (Discontinued)",
    desc: "A versatile, feature-rich Discord bot application designed for community management and engagement.",
    tech: [
      { icon: "fa-brands fa-node-js", label: "Node.js" },
      { icon: "fa-brands fa-discord", label: "Discord.js" },
      { icon: "fas fa-leaf", label: "MongoDB" },
    ],
    href: "https://discord.com/application-directory/860384146778226699",
  },
  {
    image: img("auora-bot-2.png"),
    name: "Auora's Website",
    category: "Web Development (Discontinued)",
    desc: "The official landing page for the Auora ecosystem, built with modern web technologies.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-solid fa-wind", label: "Tailwind CSS" },
    ],
    href: "https://auora.zubs.me/",
    github: "https://github.com/itszubariel/Auora-Website",
  },
  {
    image: img("ancient-bg.png"),
    name: "Ancient Japan: Myths, Yōkai, and Mysteries",
    category: "Wiki Article",
    desc: "A comprehensive wiki about the history and culture of Ancient Japan, hosted on Miraheze.",
    tech: [{ icon: "fas fa-globe", label: "Miraheze Wiki" }],
    href: "https://ancientjapan.miraheze.org/",
  },
  {
    image: img("color-app.png"),
    name: "Hexsite",
    category: "Web Application",
    desc: "A sleek tool to generate and explore aesthetic color palettes for any design use.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-react", label: "React" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://hexite.vercel.app/",
  },
  {
    image: img("globle-bg.png"),
    name: "Countries of the World",
    category: "Web Application",
    desc: "A fast-paced geography quiz inspired by Sporcle. Challenge yourself to name every country in the world.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-python", label: "Python" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://globequiz.vercel.app/",
  },
  {
    image: img("stickman-bg.png"),
    name: "Stickman",
    category: "Web Application",
    desc: "A fun, simple, and addictive web-based platformer game created with JavaScript.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-solid fa-wind", label: "Tailwind CSS" },
    ],
    href: "https://playstickman.vercel.app/",
  },
  {
    image: img("toasty-image.png"),
    name: "Toasty Game",
    category: "Web Application",
    desc: "A lightweight web game centered around clicking animated toasts for fun.",
    tech: [
      { icon: "fa-brands fa-js", label: "Anime.js" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-solid fa-wind", label: "Tailwind CSS" },
    ],
    href: "https://toasty-v1.vercel.app/",
  },
  {
    image: img("cookie-bg.png"),
    name: "Cookie Clicking Game",
    category: "Web Application",
    desc: "A cookie-clicker game built with login and leaderboard support using local storage.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-node-js", label: "Node.js" },
      { icon: "fa-brands fa-react", label: "LocalStorage" },
    ],
    href: "https://cookieclicking.netlify.app/",
  },
  {
    image: img("generator-main.png"),
    name: "Generators",
    category: "Web Application",
    desc: "A bundle of random content generators: names, passwords, hex codes, and more.",
    tech: [
      { icon: "fa-brands fa-python", label: "Flask" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://gen-generator.vercel.app/",
  },
  {
    image: img("gen-games.png"),
    name: "Games",
    category: "Web Application",
    desc: "A collection of small browser-based games built with HTML, CSS, and JS.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript (Vanilla + p5.js)" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://gen-game.vercel.app/",
  },
  {
    image: img("moderation-guide-bg.png"),
    name: "Discord Moderation Guide",
    category: "Web Application",
    desc: "A complete and beginner-friendly static website to educate moderators on best practices and conflict resolution.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://moderation-guide.vercel.app/",
  },
  {
    image: img("guide-bg.png"),
    name: "Beginner's Guide to Coding",
    category: "Web Application",
    desc: "A friendly, interactive guide for absolute beginners covering essential web technologies with examples.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://beginners-coding-guide.vercel.app/",
  },
  {
    image: img("marvel-bg.png"),
    name: "Marvel Watch Guide",
    category: "Web Application",
    desc: "A comprehensive guide to watching the entire MCU in correct timeline order, with dynamic animations.",
    tech: [
      { icon: "fa-brands fa-js", label: "Anime.js" },
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://marvel-guide.vercel.app/",
  },
  {
    image: img("weather-app.png"),
    name: "Weather Dashboard",
    category: "Web Application",
    desc: "A real-time weather dashboard showing live temperature, conditions, and a 5-day forecast.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://weathink.vercel.app/",
  },
  {
    image: img("calculator.png"),
    name: "Scientific Calculator",
    category: "Web Application",
    desc: "A sleek, easy-to-use scientific calculator featuring trig, logarithms, and exponentials.",
    tech: [
      { icon: "fa-brands fa-js", label: "JavaScript" },
      { icon: "fa-brands fa-html5", label: "HTML" },
      { icon: "fa-brands fa-css3-alt", label: "CSS" },
    ],
    href: "https://calqulator.vercel.app/",
  },
];
