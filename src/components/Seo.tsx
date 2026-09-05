import { useEffect } from "react";

const SITE_NAME = "Zubariel";
const OG_IMAGE = "https://zubs.me/images/1pfp.jpg";
const OG_URL = "https://zubs.me";
const THEME_COLOR = "#fff";
const AUTHOR = "Zubariel";
const DEFAULT_DESCRIPTION =
  "This is a linktree for Zubariel. A self-taught developer building apps, scripts, bots, and more.";

export const META_KEYS = {
  description: "description",
  ogTitle: "og:title",
  ogDescription: "og:description",
  keyword: "keywords",
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(
    `meta[${attr}="${key}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

interface SeoProps {
  title: string;
  ogTitle?: string;
  description?: string;
  ogDescription?: string;
  keywords?: string;
}

export function Seo({
  title,
  ogTitle,
  description = DEFAULT_DESCRIPTION,
  ogDescription,
  keywords,
}: SeoProps) {
  const og = ogTitle || title;
  useEffect(() => {
    document.title = title;

    setMeta("property", META_KEYS.ogTitle, og);
    setMeta("property", "og:type", "website");
    setMeta("property", "og:image", OG_IMAGE);
    setMeta("property", "og:url", OG_URL);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("name", META_KEYS.description, description);
    setMeta("property", META_KEYS.ogDescription, ogDescription || description);
    setMeta("name", META_KEYS.keyword, keywords || "");
    setMeta("name", "author", AUTHOR);
    setMeta("name", "theme-color", THEME_COLOR);
  }, [title, og, description, ogDescription, keywords]);

  return null;
}
