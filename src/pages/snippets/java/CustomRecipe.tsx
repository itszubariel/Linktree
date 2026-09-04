import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `recipe`,
  head: `Custom`,
  word: `Recipe`,
  tail: `Snippet.`,
  badge: `Data Pack`,
  tags: [
    { icon: `fa-solid fa-file-code`, label: `JSON` },
    { icon: ``, label: `Minecraft 1.20+` },
  ],
  subtitle: `A simple custom crafting recipe for Minecraft. This example brings back the Enchanted Golden Apple recipe using 8 gold blocks around a regular apple. Place in \`data/yourmod/recipes/\`.`,
  info: [
    { head: `// how to use`, body: `Create the JSON file in data/yourmod/recipes/ and Minecraft will automatically load it. No Java registration required!` },
    { head: `// requirements`, body: `Minecraft 1.20+. Works in both vanilla and modded environments. Replace 'yourmod' with your namespace.` },
  ],
  files: [
    { name: `recipe.json`, lang: `java`, code: `{
  "type": "minecraft:crafting_shaped",
  "pattern": [
    "GGG",
    "GAG",
    "GGG"
  ],
  "key": {
    "G": { "item": "minecraft:gold_block" },
    "A": { "item": "minecraft:apple" }
  },
  "result": {
    "item": "minecraft:enchanted_golden_apple",
    "count": 1
  }
}` },
  ],
  prev: { label: `custom item`, to: `/snippet/mc/item` },
  next: { label: `custom trigger`, to: `/snippet/mc/trigger` },
};

export function CustomRecipe() {
  return <SnippetDocShell doc={doc} />;
}
