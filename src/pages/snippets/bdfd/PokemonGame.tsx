import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `pokemon`,
  head: `Pokémon`,
  word: `Game.`,
  tail: ``,
  badge: `discord-bot`,
  tags: [
    { icon: `fa-brands fa-discord`, label: `BDFD` },
  ],
  subtitle: `A Pokémon catching game in BDFD using the BDTools API. A random Pokémon is fetched and displayed, and users guess the name to catch it. Track your collection with \`!pinv\`.`,
  info: [
    { head: `// how to use`, body: `Add all commands with their triggers. Required variables: \`pokemon.spawn\` and \`pokemon.caught\`. Note: two commands share the \`!pokemon\` trigger intentionally.` },
    { head: `// credits`, body: `Inspired by classic guessing games. Uses the BDTools API to fetch random Pokémon data and Sprites.` },
  ],
  files: [
    { name: `!pokemon (1)`, lang: `bdfd`, code: `$nomention
$deleteIn[3s]

$description[Thinking of a pokémon..]
$image[https://media.discordapp.net/stickers/1215481177692180551.png?size=160&name=hmm]
$color[#36393e]

$httpGet[https://api.bdtools.xyz/random-pokemon]

$setServerVar[pokemon.spawn;$httpResult[pokemon]]` },
    { name: `!pokemon (2)`, lang: `bdfd`, code: `$nomention
$replyIn[4s]

$title[Guess The Pokémon]
$description[Need a Hint? No.
__Type !pcatch  to catch it.__
]
$image[https://api.bdtools.xyz/random-pokemon?image=true&name=$getServerVar[pokemon.spawn]]
$footer[Requested by $username]
$addTimestamp
$color[#36393e]` },
    { name: `!pcatch`, lang: `bdfd`, code: `$nomention
$reply

$onlyIf[$getServerVar[pokemon.spawn]!=;❌ The Pokémon is already claimed.]
$onlyIf[$toLowercase[$message]==$getServerVar[pokemon.spawn];❌ Incorrect Pokémon.]

$title[Pokémon Caught]
$description[<@$authorID>, You have successfully caught **$toTitleCase[$message[1;pokemon]]** 🎉]
$footer[Check your inventory by using !pinv]
$color[#36393e]

$setUserVar[pokemon.caught;$getUserVar[pokemon.caught;$authorID]
$getServerVar[pokemon.spawn];$authorID]
$setServerVar[pokemon.spawn;]` },
    { name: `!pinv`, lang: `bdfd`, code: `$nomention
$reply

$title[Pokémon Inventory]
$description[
__**$displayName[$findUser[$message[1;user]]]** 's Pokémon Inventory__
$if[$getUserVar[pokemon.caught;$findUser[$message[1;user]]]==]> no pokémons yet.
$else >>> $getUserVar[pokemon.caught;$findUser[$message[1;user]]] $endif
]
$color[#36393e]
$footer[A game played by $username]
$addTimestamp` },
  ],
  prev: { label: `giveaway`, to: `/snippet/bdfd/giveaway` },
  next: { label: `voter-only command`, to: `/snippet/bdfd/voter-only` },
};

export function PokemonGame() {
  return <SnippetDocShell doc={doc} />;
}
