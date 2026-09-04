import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `clicking`,
  head: `Clicking`,
  word: `Game.`,
  tail: ``,
  badge: `discord-bot`,
  tags: [
    { icon: `fa-brands fa-discord`, label: `BDFD` },
  ],
  subtitle: `A Discord idle clicker with upgrades and item multipliers. Click to earn, spend clicks in the shop on items that boost your per-click multiplier. Built with \`BDScript\` for BDFD bots.`,
  info: [
    { head: `// how to use`, body: `Add all commands with their triggers. Create variables \`clicker\`, \`item1\`, \`item2\`, \`item3\` set to 0. Add more items by appending item4, item5, etc.` },
    { head: `// credits`, body: `Inspired by a custom DJS Discord bot. Features a shop, multiplier system, and paginated interaction flow for a full idle-clicker experience inside Discord.` },
  ],
  files: [
    { name: `!clicker`, lang: `bdfd`, code: `$nomention
$onlyIf[$guildID!=;]

$title[Clicking Game]
$description[Hey <@$authorID>,
Click the button below to gain clicks and have fun!!
You currently have \`$getVar[clicker;$authorID]\` clicks and have these multipliers:
$if[$getVar[item1;$authorID]!=0]Item 1: \`+$getVar[item1;$authorID]\` ($getVar[item1;$authorID])$else no item1 multiplers :<$endif
$if[$getVar[item2;$authorID]!=0]Item 2: \`+$getVar[item2;$authorID]\` ($divide[$getVar[item2;$authorID];2])$else no item2 multiplers :<$endif
$if[$getVar[item3;$authorID]!=0]Item 3: \`+$getVar[item3;$authorID]\` ($divide[$getVar[item3;$authorID];3])$else no item3 multiplers :<$endif
]
$c[Keep adding more if (and all that) here to include more items]
$color[#2F3136]
$addButton[no;clicker;;secondary;no;🖱️]
$addButton[no;clicker-shop;Shop;secondary;no;]` },
    { name: `$onInteraction[clicker]`, lang: `bdfd`, code: `$nomention

$var[item-multi-1;$sum[1;$getVar[item1;$authorID]]]
$var[item-multi-2;$sum[$var[item-multi-1];$getVar[item2;$authorID]]]
$var[item-multi-3;$sum[$var[item-multi-2];$getVar[item3;$authorID]]]
$c[copy paste the same thing and change the numbers/ item name]

$setVar[clicker;$sum[$getVar[clicker;$authorID];$var[item-multi-3]];$authorID]
$c[The var[item-multi-3] should be changed to your latest item temp-variable]

$title[Clicking Game]
$description[Hey <@$authorID>,
Click the button below to gain clicks and have fun!!
You currently have \`$getVar[clicker;$authorID]\` clicks and have these multipliers:
$if[$getVar[item1;$authorID]!=0]Item 1: \`+$getVar[item1;$authorID]\` ($getVar[item1;$authorID])$else no item1 multiplers :<$endif
$if[$getVar[item2;$authorID]!=0]Item 2: \`+$getVar[item2;$authorID]\` ($divide[$getVar[item2;$authorID];2])$else no item2 multiplers :<$endif
$if[$getVar[item3;$authorID]!=0]Item 3: \`+$getVar[item3;$authorID]\` ($divide[$getVar[item3;$authorID];3])$else no item3 multiplers :<$endif
]
$c[Keep adding more if (and all that) here to include more items]
$color[#2F3136]` },
    { name: `$onInteraction[clicker-shop]`, lang: `bdfd`, code: `$nomention
$ephemeral
$removeAllComponents

$title[Clicker Game Shop]
$description[
**Item 1** - 1000 Clicks
> ...description... ( +1 Multi )

**Item 2** - 5000 Clicks
> ...description... ( +2 Multi )

**Item 3** - 10000 Clicks
> ...description... ( +3 Multi )
]
$c[Keep expanding with more items in the shop as you add more]
$color[#2F3136]
$footer[Note: Use !buy to buy these items.]` },
    { name: `!buy`, lang: `bdfd`, code: `$nomention
$onlyIf[$guildID!=;]
$allowUserMentions[]
$reply

$if[$message==]
Usage: !buy {item} {amount}

$else

$var[price1;$multi[1000;$message[2;amount]]]
$var[price2;$multi[5000;$message[2;amount]]]
$var[price3;$multi[10000;$message[2;amount]]]
$c[add more price variables as you add more items]

$if[$toLowercase[$message[1;item]==item1]]

$onlyIf[$getVar[clicker;$authorID]>=$var[price1];You don't have enough clicks to buy this item.]

$description[Successfully bought \`$message[2;amount]\` Item 1(s).]
$color[#2F3136]

$setVar[item1;$sum[$getVar[item1;$authorID];$message[2;amount]];$authorID]
$setVar[clicker;$sub[$getVar[clicker;$authorID];$var[price1]];$authorID]

$elseif[$toLowercase[$message[1;item]==item2]]

$onlyIf[$getVar[clicker;$authorID]>=$var[price2];You don't have enough clicks to buy this item.]

$description[Successfully bought \`$message[2;amount]\` Item2(s).]
$color[#2F3136]

$var[temp-item2;$multi[$message[2;amount];2]]
$c[The 2 at the end here is because this item gives a +2 multiplier]
$setVar[item2;$sum[$getVar[item2;$authorID];$var[temp-item2]];$authorID]
$setVar[clicker;$sub[$getVar[clicker;$authorID];$var[price2]];$authorID]

$elseif[$toLowercase[$message[1;item]==item3]]

$onlyIf[$getVar[clicker;$authorID]>=$var[price3];You don't have enough clicks to buy this item.]

$description[Successfully bought \`$message[2;amount]\` Item3(s).]
$color[#2F3136]

$var[temp-item3;$multi[$message[2;amount];3]]
$c[The 3 at the end here is because this item gives a +3 multiplier]
$setVar[item3;$sum[$getVar[item3;$authorID];$var[temp-item3]];$authorID]
$setVar[clicker;$sub[$getVar[clicker;$authorID];$var[price3]];$authorID]

$endif
$endif` },
  ],
  prev: { label: `bloxfruits stock`, to: `/snippet/bdfd/bf-stock` },
  next: { label: `function/callback`, to: `/snippet/bdfd/functions` },
};

export function ClickingGame() {
  return <SnippetDocShell doc={doc} />;
}
