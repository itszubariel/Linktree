import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `voter-only`,
  head: `Voter Only`,
  word: `Commands.`,
  tail: ``,
  badge: `utility`,
  tags: [
    { icon: `fa-brands fa-discord`, label: `BDFD` },
  ],
  subtitle: `Prompt users to vote on \`Top.gg\`, then claim to unlock exclusive commands. Verified via the Top.gg API. Access expires after 12 hours and resets automatically.`,
  info: [
    { head: `// how to use`, body: `Add all commands with their triggers. Get your API key from Top.gg. Create user variables \`voter\` (value: false) and \`voter-timestamp\` (value: empty).` },
    { head: `// credits`, body: `Inspired by a random idea. Uses the Top.gg REST API to verify votes. The 12-hour cooldown matches Top.gg's own voting cooldown window. Includes a timestamp check for auto-expiry.` },
  ],
  files: [
    { name: `!vote`, lang: `bdfd`, code: `$nomention
$reply

$title[__Vote For $username[$botID]__]
$description[Vote for $username[$botID] on [top.gg!\\](https://top.gg/bot/$botID/vote).
You can unlock the following commands after voting and using \`!claim\`:
1. \`!special\` -> The special command.
2. go on as you like
]
$color[#36393e]
$footer[$username[$botID] | Vote]
$footerIcon[$userAvatar[$botID]]` },
    { name: `!claim`, lang: `bdfd`, code: `$nomention
$reply

$var[apikey;YOUR_API_KEY_HERE]
$var[fail_color;#FF0000]
$var[success_color;#00FF00]

$httpAddHeader[Authorization;$var[apikey]]
$httpGet[https://top.gg/api/bots/$botID/check?userId=$authorID]
$if[$checkContains[$httpResult[voted];1]==true]
$var[voted;true]
$else
$var[voted;false]
$endif

$if[$var[voted]==true]

$title[ Reward claimed!]
$description[You have successfully claimed your reward and unlocked many different commands.]
$footer[Thank you for the vote 🤍]
$color[$var[success_color]]
$image[https://top.gg/api/widget/$botID.png]

$setVar[voter;true;$authorID]
$setVar[voter-timestamp;$getTimestamp[s];$authorID]

$globalCooldown[12h;This command has a cooldown: \`%time%\`.]

$else

$title[__Vote to claim!__]
$description[To claim your reward, please cast your **vote** by clicking [here\\](https://top.gg/bot/$botID/vote) or on the button below this message.
You can vote for the bot and claim your reward every **12** hours.]
$addButton[no;https://top.gg/bot/$botID/vote;Vote for me!;link;;]
$color[$var[fail_color]]
$image[https://top.gg/api/widget/$botID.png]
$endif` },
    { name: `!special`, lang: `bdfd`, code: `$nomention

$onlyIf[$getVar[voter;$authorID]==true;You need to be a voter to use this command. Use \`!vote\` and then \`!claim\`.]

$var[current-timestamp;$sub[$getTimestamp;43200]]

$if[$getVar[voter-timestamp;$authorID]>=$var[current-timestamp]]

$c[The Premium Command Goes Here]
$httpGet[https://nekos.best/api/v2/kiss]
$description[<@$authorID>, kissed <@985626439179194428> (Cat That Ears The O/ Catearo)]
$image[$httpResult[results;0;url]]
$color[#36393e]
$footer[Why are you kissing a random person man wtf?]
$footerIcon[$userAvatar[$botID]]

$else
$description[You need to be a voter to use this command. Use \`!vote\` and then \`!claim\`.]
$color[#36393e]
$setVar[voter;false;$authorID]
$setVar[voter-timestamp;;$authorID]
$endif` },
  ],
  prev: { label: `pokémon game`, to: `/snippet/bdfd/pokemon` },
  next: { label: `bloxfruits stock`, to: `/snippet/bdfd/bf-stock` },
};

export function VoterOnlyCmd() {
  return <SnippetDocShell doc={doc} />;
}
