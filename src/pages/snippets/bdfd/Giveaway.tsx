import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `giveaway`,
  head: `Simple`,
  word: `Giveaway.`,
  tail: ``,
  badge: `utility`,
  tags: [
    { icon: `fa-brands fa-discord`, label: `BDFD` },
  ],
  subtitle: `Run a giveaway using Discord buttons one to enter, one to end manually. Avoids timers entirely since BDFD limits timed events to \`40 minutes\` max. Winner is DM’d automatically.`,
  info: [
    { head: `// how to use`, body: `Add all commands with their triggers. Create two server variables: \`giveawayParticipants\` and \`giveawayPrize\` with empty values.` },
    { head: `// credits`, body: `Inspired by some random code found somewhere. Button-based design avoids BDFD's timer limitations. Includes a reroll command for picking a new winner after the fact.` },
  ],
  files: [
    { name: `!giveaway`, lang: `bdfd`, code: `$nomention
$suppressErrors
$onlyPerms[managemessages;You need perms]
$onlyBotPerms[managemessages;I need perms]

$if[$message==]
Correct usage: !giveaway {prize}
$else
$c[Set dummy value so it's never empty]
$setServerVar[giveawayParticipants;]
$c[Store the prize]
$setServerVar[giveawayPrize;$message]
$c[Split participant list with ; separator]
$textSplit[$getServerVar[giveawayParticipants];\\;]
$c[Count participants minus dummy entry]
$var[participantCount;$sub[$getTextSplitLength;1]]

$title[A New Giveaway Has Begun! 🎉]
$description[
🎁 **What's Up for Grabs?**
*$getServerVar[giveawayPrize]*

👤 **Hosted By:** <@$authorID>

👇 Want in? Smash the button below to join!

🏆 The winner will be picked manually via a button press stay tuned!
]

$addTimestamp
$color[#2F3136]

$addButton[no;join_giveaway;Participate;secondary;no;]
$addButton[no;pick_winner-$authorID;Draw Winner;secondary;no;]

$endif` },
    { name: `$onInteraction`, lang: `bdfd`, code: `$nomention

$c[Interaction control]
$if[$customID==join_giveaway]

$removeButtons
$ephemeral

$c[Check if user has already participated]
$if[$checkContains[$getServerVar[giveawayParticipants];$authorID]==false]

$c[Add user to participant list]
$setServerVar[giveawayParticipants;$getServerVar[giveawayParticipants]$authorID\\;]

$c[Split the new participant list and count]
$textSplit[$getServerVar[giveawayParticipants];\\;]

$description[<@$authorID>, You have successfully participated along with \`$sub[$getTextSplitLength;1]\` other people.]
$color[#008000]

$else

$c[Remove user from participant list]
$setServerVar[giveawayParticipants;$replaceText[$getServerVar[giveawayParticipants];$authorID\\;;]]

$c[Split the new participant list and count]
$textSplit[$getServerVar[giveawayParticipants];\\;]

$description[<@$authorID> has been removed from the giveaway. Only \`$sub[$getTextSplitLength;1]\` entries left.]
$color[#FF0000]

$endif

$elseif[$customID==pick_winner-$authorID]

$removeButtons

$c[Split participant list]
$textSplit[$getServerVar[giveawayParticipants];\\;]

$c[Check if participants exist]
$if[$getTextSplitLength>1]

$c[Draw random index for winner]
$try
$var[winnerIndex;$random[1;$getTextSplitLength]]
$catch
$endtry

$c[Get user ID from splitText with index]
$try
$var[winner;$splitText[$var[winnerIndex]]]
$catch
$endtry

$title[Giveaway Winner!]
$description[
Congratulations <@$var[winner]>!
You have won the giveaway of **$getServerVar[giveawayPrize]!** 🎉]
$footer[Hosted by $username]
$color[#FFFF00]

$if[$var[winner]!=]
$try
$sendEmbedMessage[$dmChannelID[$var[winner]];;;;**Congratulations, you have just won the giveaway of *$getServerVar[giveawayPrize]* in $serverName[$guildID]**.;#FFFF00;;;;;;;no;no]
$catch
$endtry
$endif
$endif
$endif
$endif` },
    { name: `!reroll`, lang: `bdfd`, code: `$nomention

$c[Split participant list]
$textSplit[$getServerVar[giveawayParticipants];\\;]

$c[Check if participants exist]
$if[$getTextSplitLength>1]

$c[Draw random index for winner]
$try
$var[winnerIndex;$random[1;$getTextSplitLength]]
$catch
$endtry

$c[Get user ID from splitText with index]
$try
$var[winner;$splitText[$var[winnerIndex]]]
$catch
$endtry

$title[Giveaway Winner!]
$description[
Congratulations <@$var[winner]>!
You have won the giveaway of **$getServerVar[giveawayPrize]!** 🎉]
$footer[Hosted by $username]
$color[#FFFF00]

$if[$var[winner]!=]
$try
$sendEmbedMessage[$dmChannelID[$var[winner]];;;;**Congratulations, you have just won the giveaway of *$getServerVar[giveawayPrize]* in $serverName[$guildID]**.;#FFFF00;;;;;;;no;no]
$catch
$endtry
$endif` },
  ],
  prev: { label: `custom trigger`, to: `/snippet/mc/trigger` },
  next: { label: `pokémon game`, to: `/snippet/bdfd/pokemon` },
};

export function Giveaway() {
  return <SnippetDocShell doc={doc} />;
}
