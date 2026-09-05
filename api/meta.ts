const DEFAULT_IMAGE = "https://zubs.me/images/1pfp.jpg";
const BASE_URL = "https://zubs.me";

interface RouteMeta {
  title: string;
  description: string;
}

const ROUTES: Record<string, RouteMeta> = {
  "/": {
    title: "Linktree",
    description: "Self-taught developer. Links to my projects, portfolio, socials and more.",
  },
  "/portfolio": {
    title: "Portfolio",
    description: "Self-taught dev with 5 years of experience. I build Discord bots, web tools, scripting languages, mods and apps. Open to freelance.",
  },
  "/projects": {
    title: "Projects",
    description: "A collection of projects I've built and contributed to across web, Discord bots, Minecraft mods, extensions and more.",
  },
  "/snippet": {
    title: "Snippets",
    description: "Small projects, examples and reusable code for web development, BDFD bot development and Minecraft modding.",
  },
  "/now": {
    title: "Now",
    description: "Uni and work have taken over so coding has taken a back seat. Still poking at projects here and there when I get the itch.",
  },
  "/contact": {
    title: "Contact",
    description: "Have a project, a question or just want to connect? My inbox is open.",
  },
  "/anime-list": {
    title: "Anime List",
    description: "My personal anime list tracked since 2015. Favorites include Code Geass, Bleach and Vinland Saga.",
  },
  "/manga-list": {
    title: "Manga List",
    description: "My personal manga list tracked since 2015. Favorites include Bleach and Blue Box.",
  },
};

function metaHtml(pathname: string, meta: RouteMeta): string {
  const { title, description } = meta;
  const url = `${BASE_URL}${pathname}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Zubariel" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${DEFAULT_IMAGE}" />
  <meta property="og:url" content="${url}" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${DEFAULT_IMAGE}" />
  <meta name="theme-color" content="#ffffff" />
</head>
<body></body>
</html>`;
}

export const config = { runtime: "edge" };

export default async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  let pathname = url.searchParams.get("path") ?? "/";
  if (!pathname || pathname === "//") pathname = "/";
  const meta = ROUTES[pathname] ?? ROUTES["/"];
  return new Response(metaHtml(pathname, meta), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
