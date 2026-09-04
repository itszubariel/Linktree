export interface Snippet {
  title: string;
  desc: string;
  tags: string[];
  link: string;
}

export interface SnippetCategory {
  id: string;
  label: string;
  kicker: string;
  snippets: Snippet[];
}

export const SNIPPET_CATEGORIES: SnippetCategory[] = [
  {
    id: "web",
    label: "Web",
    kicker: "frontend bits",
    snippets: [
      {
        title: "Dog/Cat API",
        desc: "Fetch and display random dog/cat images. Perfect for learning basic API usage and DOM manipulation.",
        tags: ["JavaScript"],
        link: "web/dog",
      },
      {
        title: "Login/Signup Form",
        desc: "A toggleable login and signup form with smooth transitions. Great for learning form UIs.",
        tags: ["JS", "HTML", "CSS"],
        link: "web/signup",
      },
      {
        title: "Frosted-Glass Profile Card",
        desc: "A frosted-glass profile card with animated background blobs, hover lift effect, and a glass button. Built with CSS backdrop-filter.",
        tags: ["HTML", "CSS"],
        link: "web/frosted-profile",
      },
      {
        title: "Dark/Light Mode Toggle",
        desc: "Smooth dark/light mode toggle that remembers the user's preference and animates between sun and moon icons.",
        tags: ["JS", "CSS", "HTML"],
        link: "web/darkmode-toggle",
      },
      {
        title: "Toast Notification System",
        desc: "Lightweight toast notifications with success, error, warning, and info types that auto-dismiss.",
        tags: ["JS", "CSS", "HTML"],
        link: "web/toast-notification",
      },
      {
        title: "Animated Background",
        desc: "A lightweight, animated SVG wave background for adding subtle visual interest to a page.",
        tags: ["HTML", "CSS"],
        link: "web/background",
      },
      {
        title: "Simple Calculator",
        desc: "A basic calculator built with vanilla JS. Ideal for practicing logic and event handling.",
        tags: ["JS", "HTML", "CSS"],
        link: "web/calculator",
      },
      {
        title: "Memory Match Game",
        desc: "An engaging memory match game to practice DOM manipulation and game logic.",
        tags: ["JS", "HTML", "CSS"],
        link: "web/memory",
      },
      {
        title: "Simple Clicker Game",
        desc: "A basic clicker game that tracks clicks and saves progress to LocalStorage.",
        tags: ["JS", "HTML", "LocalStorage"],
        link: "web/clicker",
      },
    ],
  },
  {
    id: "mc",
    label: "Minecraft Mods",
    kicker: "fabric bits",
    snippets: [
      {
        title: "MC Custom Advancement",
        desc: "Custom advancement setup using a custom trigger. Includes advancement JSON, criterion class, and registration.",
        tags: ["Java", "Fabric API"],
        link: "mc/advancement",
      },
      {
        title: "MC Custom Block",
        desc: "Custom block setup for Fabric mods with on-use actions, registration, and lang entries.",
        tags: ["Java", "Fabric API"],
        link: "mc/block",
      },
      {
        title: "MC Custom Item",
        desc: "Custom item setup for Fabric mods, including registration, tooltip, and right-click actions.",
        tags: ["Java", "Fabric API"],
        link: "mc/item",
      },
      {
        title: "MC Custom Recipe",
        desc: "Custom recipe setup for Fabric mods. Example: Enchanted Golden Apple recipe using 8 gold blocks around an apple.",
        tags: ["Java", "Fabric API"],
        link: "mc/recipe",
      },
      {
        title: "MC Custom Trigger",
        desc: "Custom trigger for Fabric mods that tracks breaking 10 logs. Includes registration and advancement setup.",
        tags: ["Java", "Fabric API"],
        link: "mc/trigger",
      },
    ],
  },
  {
    id: "bdfd",
    label: "BDFD",
    kicker: "discord bot bits",
    snippets: [
      {
        title: "BDFD Giveaway",
        desc: "A giveaway command for BDFD that uses buttons for entry and manual winner drawing.",
        tags: ["BDScript 2"],
        link: "bdfd/giveaway",
      },
      {
        title: "BDFD Pokémon Game",
        desc: "A 'guess the Pokémon' game for Discord bots using the BDTools API to fetch random Pokémon data.",
        tags: ["BDScript 2"],
        link: "bdfd/pokemon",
      },
      {
        title: "BDFD Voter-Only Cmd",
        desc: "Restrict command access to users who have voted for your bot on top.gg.",
        tags: ["BDScript 2"],
        link: "bdfd/voter-only",
      },
      {
        title: "BDFD Clicking Game",
        desc: "An interactive clicking game for Discord bots, complete with a shop for upgrades, made in BDFD.",
        tags: ["BDScript 2"],
        link: "bdfd/clicking",
      },
      {
        title: "BDFD Bloxfruits Stock",
        desc: "A clean and simple command to display the current Blox Fruits stock in a Discord server.",
        tags: ["BDScript 2"],
        link: "bdfd/bf-stock",
      },
      {
        title: "BDFD Function/Callback Snippet",
        desc: "This snippet lets you search and browse through BDFD Functions and Callbacks right inside your bot.",
        tags: ["BDScript 2"],
        link: "bdfd/functions",
      },
      {
        title: "BDFD Home & Tour",
        desc: "A complete welcome system with interactive buttons, server tour, rules, roles, FAQ, and support info using containers.",
        tags: ["BDScript 2"],
        link: "bdfd/home",
      },
      {
        title: "BDFD Wordle Game",
        desc: "A fully functional Wordle game with color-coded feedback, 5 attempts to guess, and real-time word validation via API.",
        tags: ["BDScript 2"],
        link: "bdfd/wordle",
      },
    ],
  },
];
