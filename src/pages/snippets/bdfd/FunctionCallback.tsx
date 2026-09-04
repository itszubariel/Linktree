import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `functions`,
  head: `Functions /`,
  word: `Callback.`,
  tail: ``,
  badge: `utility`,
  tags: [
    { icon: `fa-brands fa-discord`, label: `BDFD` },
  ],
  subtitle: `Search and browse \`BDFD Functions\` and \`Callbacks\` right inside your bot using modals and buttons. Auto-fetches the latest tags from the BDFD API for a fully dynamic paginated list.`,
  info: [
    { head: `// how to use`, body: `Add each command with the correct trigger. Do not change anything unless you know what you're doing. Includes Next and Back buttons for pagination through large function lists.` },
    { head: `// credits`, body: `Powered by the official BDFD API. Dynamically fetches function and callback tag lists with full argument info and wiki links.` },
  ],
  files: [
    { name: `!bdfd`, lang: `bdfd`, code: `$nomention

$title[BDFD Functions/Callbacks]
$description[Use **Search** button below to search for any/every bdfd function available in the [BDFD\\](https://botdesignerdiscord.com/) application, or the **Function/Callback List** button to list all the functions/callbacks in bdfd.]
$color[#36393e]                 $c[Change the color of the embed]

$addButton[no;bdfd-$authorID;Search;secondary;no;]
$addButton[no;function-bdfd-list-$authorID;Function List;secondary;no;]
$addButton[no;callback-bdfd-list-$authorID;Callback List;secondary;no;]` },
    { name: `$onInteraction[bdfd-modal]`, lang: `bdfd`, code: `$var[color;#36393e]                $c[Change the color of the embeds]

$nomention
$ephemeral
$suppressErrors[The function/callback doesn't exist or invalid arguments.
Example Usage:
\`%{DOL}%addButton\` :x:
\`%{DOL}%addButton[\\]\` :white_check_mark: ]

$if[$checkContains[$input[bdfdInput1];%{DOL}%awaitedCommand;%{DOL}%onJoined;%{DOL}%onLeave;%{DOL}%onBanAdd;%{DOL}%onBanRemove;%{DOL}%onMessageDelete;%{DOL}%onInteraction[\\];%{DOL}%onInteraction;%{DOL}%alwaysReply;%{DOL}%reaction;%{DOL}%messageContains]==true]
$httpGet[https://botdesignerdiscord.com/public/api/callback/$input[bdfdInput1]]

$var[cmd;$replaceText[$replaceText[$replaceText[$input[bdfdInput1];%{DOL}%;];[;];\\];]]
$if[$httpResult[is_premium]==false]
$var[link;https://nilpointer-software.github.io/bdfd-wiki/nightly/callbacks/$var[cmd].html]
$else
$var[link;https://nilpointer-software.github.io/bdfd-wiki/nightly/premium/$var[cmd].html]
$endif

$title[BDFD Callback Searcher]
$description[>>> **Tag**: \`\`\`$httpResult[name]\`\`\`
**Description**: $httpResult[description]
**Intents**: $httpResult[intents]
**Premium**: $httpResult[is_premium]]
$color[$var[color]]
$addButton[no;$var[link];Wiki;link;no;]
$if[$httpResult[arguments;0;name]!=]
$addField[$httpResult[arguments;0;name];
> Type: $httpResult[arguments;0;type]
> Required: $httpResult[arguments;0;required]
> Empty: false
;yes]$endif
$if[$httpResult[arguments;1;name]!=]
$addField[$httpResult[arguments;1;name];
> Type: $httpResult[arguments;1;type]
> Required: $httpResult[arguments;1;required]
> Empty: false
;yes]$endif

$else
$httpGet[https://botdesignerdiscord.com/public/api/function/$input[bdfdInput1]]

$var[cmd;$replaceText[$replaceText[$replaceText[$input[bdfdInput1];%{DOL}%;];[;];\\];]]
$if[$httpResult[premium]==false]
$var[link;https://nilpointer-software.github.io/bdfd-wiki/nightly/bdscript/$var[cmd].html]
$else
$var[link;https://nilpointer-software.github.io/bdfd-wiki/nightly/premium/$var[cmd].html]
$endif

$title[BDFD Function Searcher]
$description[>>> **Tag**: \`\`\`$httpResult[tag]\`\`\`
**Description**: $httpResult[shortDescription]
**Intents**: $httpResult[intents]
**Premium**: $httpResult[premium]]
$color[$var[color]]
$addButton[no;$var[link];Wiki;link;no;]
$if[$httpResult[arguments;0;name]!=]
$addField[$httpResult[arguments;0;name];
> Type: $httpResult[arguments;0;type]
> Required: $httpResult[arguments;0;required]
> Empty: $httpResult[arguments;0;empty]
;yes]$endif
$if[$httpResult[arguments;1;name]!=]
$addField[$httpResult[arguments;1;name];
> Type: $httpResult[arguments;1;type]
> Required: $httpResult[arguments;1;required]
> Empty: $httpResult[arguments;1;empty]
;yes]$endif` },
    { name: `$onInteraction`, lang: `bdfd`, code: `$var[color;#36393e]                $c[Change the color of the embeds]

$nomention
$if[$customID==bdfd-$authorID]
$ephemeral
$newModal[bdfd-modal;BDFD Function Searcher]
$addTextInput[bdfdInput1;short;Function/Callback;3;50;yes;;Example: %{DOL}%addButton[\\], %{DOL}%sendEmbedMessage[\\]]
$endif

$if[$customID==callback-bdfd-list-$authorID]
$ephemeral
$removeButtons
$httpGet[https://botdesignerdiscord.com/public/api/callback_tag_list]

$textSplit[$replaceText[$replaceText[$replaceText[$httpResult;";;-1];[;;1];\\];;0];,]
$editSplitText[11;.]
$textSplit[$joinSplitText[
];.]
$var[1;$splitText[1]%{DOL}%onInteraction]
$title[BDFD Callback List]
$description[$var[1]]
$color[$var[color]]
$endif

$if[$customID==function-bdfd-list-$authorID]
$ephemeral
$removeButtons
$httpGet[https://botdesignerdiscord.com/public/api/function_tag_list]

$textSplit[$replaceText[$replaceText[$replaceText[$httpResult;";;-1];[;;1];\\];;0];,]
$editSplitText[31;.]
$textSplit[$joinSplitText[
];.]
$var[1;$splitText[1]]
$title[BDFD Function List (Page 1)]
$description[$var[1]]
$color[$var[color]]
$footer[Page 1/16]
$addButton[no;more-function-list-bdfd;Next ▶︎;secondary;no;]
$endif

$if[$customID==more-function-list-bdfd]
$removeButtons
$httpGet[https://botdesignerdiscord.com/public/api/function_tag_list]

$textSplit[$replaceText[$replaceText[$replaceText[$httpResult;";;-1];[;;1];\\];;0];,]
$editSplitText[30;.] $editSplitText[61;.]
$textSplit[$joinSplitText[
];.]
$var[1;$splitText[2]]
$title[BDFD Function List (Page 2)]
$description[$var[1]]
$color[$var[color]]
$footer[Page 2/16]
$addButton[no;1-function-bdfd-list-$authorID;Back ◄︎;secondary;no;]
$addButton[no;1more-function-list-bdfd;Next ▶︎;secondary;no;]
$endif

$c[... pages 3-16 follow the same pattern, incrementing split offsets by 30 each time]` },
  ],
  prev: { label: `clicking game`, to: `/snippet/bdfd/clicking` },
  next: { label: `home & tour`, to: `/snippet/bdfd/home` },
};

export function FunctionCallback() {
  return <SnippetDocShell doc={doc} />;
}
