import type { ReactNode } from "react";

export type SnippetLang = "html" | "js" | "css" | "java" | "bdfd";

const KEYWORDS = new Set(
  (
    "const let var function return if else for while new import export from await async " +
    "class extends this static public private protected final void int boolean String string " +
    "double float long byte char true false null switch case break default try catch finally " +
    "throw throws instanceof super package record interface enum and or not"
  ).split(/\s+/),
);

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function pushToken(out: string[], cls: string, text: string) {
  if (!text) return;
  out.push(cls ? `<span class="${cls}">${escapeHtml(text)}</span>` : escapeHtml(text));
}

export function highlight(code: string, lang: SnippetLang): ReactNode {
  const out: string[] = [];
  let i = 0;
  const n = code.length;

  while (i < n) {
    const rest = code.slice(i);

    const lineComment = rest.match(/^\/\/[^\n]*/);
    const blockComment = rest.match(/^\/\*[\s\S]*?\*\//);
    if (lineComment) {
      pushToken(out, "tok-cm", lineComment[0]);
      i += lineComment[0].length;
      continue;
    }
    if (blockComment) {
      pushToken(out, "tok-cm", blockComment[0]);
      i += blockComment[0].length;
      continue;
    }
    if (lang === "html") {
      const htmlComment = rest.match(/^<!--[\s\S]*?-->/);
      if (htmlComment) {
        pushToken(out, "tok-cm", htmlComment[0]);
        i += htmlComment[0].length;
        continue;
      }
    }

    const str = rest.match(/^"(?:[^"\\]|\\.)*"|^'(?:[^'\\]|\\.)*'|^`(?:[^`\\]|\\.)*`/);
    if (str) {
      pushToken(out, "tok-str", str[0]);
      i += str[0].length;
      continue;
    }

    if (lang === "html" && rest[0] === "<") {
      const tag = rest.match(/^<\/?[a-zA-Z][a-zA-Z0-9]*/);
      if (tag) {
        pushToken(out, "tok-tag", tag[0]);
        i += tag[0].length;
        continue;
      }
    }

    if (lang === "html" && rest[0] === ">") {
      pushToken(out, "tok-tag", ">");
      i += 1;
      continue;
    }

    if (lang === "html" && /^[\w-]+(?==)/.test(rest)) {
      const attr = rest.match(/^[\w-]+(?==)/);
      pushToken(out, "tok-attr", attr![0]);
      i += attr![0].length;
      continue;
    }

    const num = rest.match(/^\d+(\.\d+)?/);
    if (num) {
      pushToken(out, "tok-num", num[0]);
      i += num[0].length;
      continue;
    }

    const ident = rest.match(/^[A-Za-z_$][A-Za-z0-9_$]*/);
    if (ident) {
      const word = ident[0];
      if (KEYWORDS.has(word)) {
        pushToken(out, "tok-kw", word);
      } else if (lang === "java" && /^[A-Z][A-Za-z0-9]*$/.test(word)) {
        pushToken(out, "tok-type", word);
      } else {
        const fNext = rest.slice(word.length);
        if (/^\s*\(/.test(fNext)) {
          pushToken(out, "tok-fn", word);
        } else if (lang === "css" && /^\.|^#|^[a-z]/.test(word)) {
          pushToken(out, "tok-tag", word);
        } else {
          pushToken(out, "", word);
        }
      }
      i += word.length;
      continue;
    }

    if (lang === "bdfd") {
      const fnCall = rest.match(/^\$[A-Za-z]+/);
      if (fnCall) {
        pushToken(out, "tok-fn", fnCall[0]);
        i += fnCall[0].length;
        continue;
      }
      const varRef = rest.match(/^\$\{[^}]*\}|^\{[^}]*\}/);
      if (varRef) {
        pushToken(out, "tok-var", varRef[0]);
        i += varRef[0].length;
        continue;
      }
    }

    if (/[ \t\n]/.test(rest[0])) {
      let j = i;
      while (j < n && /[ \t\n]/.test(code[j])) j++;
      out.push(escapeHtml(code.slice(i, j)));
      i = j;
      continue;
    }

    if (lang === "css" && rest[0] === "#") {
      const hex = rest.match(/^#[0-9a-fA-F]{3,8}/);
      if (hex) {
        pushToken(out, "tok-num", hex[0]);
        i += hex[0].length;
        continue;
      }
    }

    pushToken(out, "", rest[0]);
    i += 1;
  }

  return <span dangerouslySetInnerHTML={{ __html: out.join("") }} />;
}
