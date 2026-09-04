import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `wordle`,
  head: `Wordle`,
  word: `Game.`,
  tail: ``,
  badge: `discord-bot`,
  tags: [
    { icon: `fa-brands fa-discord`, label: `BDFD` },
  ],
  subtitle: `A fully functional Wordle game for Discord bots with visual feedback using colored buttons. Uses \`$awaitFunc\` for real-time gameplay and \`$httpGet\` to fetch random words and validate guesses.`,
  info: [
    { head: `// how to use`, body: `Add the \`!wordle\` trigger command and the \`$awaitedCommand[wordle;]\` handler. Create two user variables: \`wordle\` (empty) and \`active\` (set to "no").` },
    { head: `// features`, body: `5-letter word guessing with color-coded feedback (🟩 correct position, 🟦 wrong position, ⬛ not in word), 5 attempts to guess, real-time word validation via API, and automatic game state management.` },
  ],
  files: [
    { name: `!wordle`, lang: `bdfd`, code: `$nomention
$ignoreTriggerCase
$onlyIf[$getUserVar[active]==no;you already have an active game, use "stop" to stop it.]

$httpGet[https://api.bdtools.xyz/random-word]
$var[word;$httpResult[word]]
$var[m;$sendEmbedMessage[$channelID;;Wordle Game!;; Challenge your brain daily with this classic word puzzle.
Each guess gives you feedback:
🟩 Correct letter, right spot
🟦 Correct letter, wrong spot
⬛ Not in the word

Type your guess and let the game begin! Type **stop** to stop the game anytime.
**Note:** You get 5 tries to guess the hidden 5-letter word.
;ffffff;;;Note: This discord bot is not associated with The NY Times.;;;;;yes]]
$addButton[no;wordle_1;1;secondary;yes;;$var[m]]
$addButton[no;wordle_2;2;secondary;yes;;$var[m]]
$addButton[no;wordle_3;3;secondary;yes;;$var[m]]
$addButton[no;wordle_4;4;secondary;yes;;$var[m]]
$addButton[no;wordle_5;5;secondary;yes;;$var[m]]
$addButton[yes;wordle_6;6;secondary;yes;;$var[m]]
$addButton[no;wordle_7;7;secondary;yes;;$var[m]]
$addButton[no;wordle_8;8;secondary;yes;;$var[m]]
$addButton[no;wordle_9;9;secondary;yes;;$var[m]]
$addButton[no;wordle_10;10;secondary;yes;;$var[m]]
$addButton[yes;wordle_11;11;secondary;yes;;$var[m]]
$addButton[no;wordle_12;12;secondary;yes;;$var[m]]
$addButton[no;wordle_13;13;secondary;yes;;$var[m]]
$addButton[no;wordle_14;14;secondary;yes;;$var[m]]
$addButton[no;wordle_15;15;secondary;yes;;$var[m]]
$addButton[yes;wordle_16;16;secondary;yes;;$var[m]]
$addButton[no;wordle_17;17;secondary;yes;;$var[m]]
$addButton[no;wordle_18;18;secondary;yes;;$var[m]]
$addButton[no;wordle_19;19;secondary;yes;;$var[m]]
$addButton[no;wordle_20;20;secondary;yes;;$var[m]]
$addButton[yes;wordle_21;21;secondary;yes;;$var[m]]
$addButton[no;wordle_22;22;secondary;yes;;$var[m]]
$addButton[no;wordle_23;23;secondary;yes;;$var[m]]
$addButton[no;wordle_24;24;secondary;yes;;$var[m]]
$addButton[no;wordle_25;25;secondary;yes;;$var[m]]
$jsonSet[word;$var[word]]
$textSplit[$var[word];]
$jsonArray[word_letters]
$jsonArrayAppend[word_letters;$splitText[1]]
$jsonArrayAppend[word_letters;$splitText[2]]
$jsonArrayAppend[word_letters;$splitText[3]]
$jsonArrayAppend[word_letters;$splitText[4]]
$jsonArrayAppend[word_letters;$splitText[5]]
$jsonSetString[attempts;15]
$jsonSetString[guesses;5]
$jsonSetString[index;1]
$jsonSetString[msg;$var[m]]
$setUserVar[wordle;$jsonStringify]
$setUserVar[active;yes]
$awaitFunc[wordle;$authorID]` },
    { name: `$awaitedCommand[wordle;]`, lang: `bdfd`, code: `$try
$nomention
$jsonParse[$getUserVar[wordle]]
$if[$toLowercase[$message]==stop]
Stopped.
$editMessage[$channelID;$json[msg];;;Stopped.;ffffff;A game played by $username]
$setUserVar[active;no]
$stop
$endif
$var[remaining;$sub[$json[attempts];1]]
$jsonSetString[attempts;$var[remaining]]
$setUserVar[wordle;$jsonStringify]
$deletecommand
$deleteIn[7s]
$if[$charCount[$message]!=5]
Sorry <@$authorID>, but the word has to be under 5 letters.
$awaitFunc[wordle;$authorID]
$else
$httpGet[https://api.bdtools.xyz/validate-word?word=$url[encode;$message]]
$if[$or[$checkContains[$message;1;2;3;4;5;6;7;8;9;0;-;_]==true;$httpResult[valid]==false;$httpStatus==400]]
Sorry <@$authorID>, but that word is not accepted as it's not a real word.
$awaitFunc[wordle;$authorID]
$else
$jsonParse[$getUserVar[wordle]]
$var[meow;$sub[$json[guesses];1]]
$jsonSetString[guesses;$var[meow]]
$setUserVar[wordle;$jsonStringify]
$if[$var[meow]<=0]
$var[continue;false]
$editMessage[$channelID;$json[msg];;Wordle - Game Over;You ran out of guesses, goodluck next time the word was **$toUppercase[$json[word]]**;ffffff;]
$else
$var[continue;true]
$editMessage[$channelID;$json[msg];;Wordle Game;$getEmbedData[$channelID;$json[msg];1;description];ffffff;$var[meow] guesses left!]
$endif
$var[word;$message]
$var[op;1]
$jsonParse[{"1A":"🇦","1B":"🇧","1C":"🇨","1D":"🇩","1E":"🇪","1F":"🇫","1G":"🇬","1H":"🇭","1I":"🇮","1J":"🇯","1K":"🇰","1L":"🇱","1M":"🇲","1N":"🇳","1O":"🇴","1P":"🇵","1Q":"🇶","1R":"🇷","1S":"🇸","1T":"🇹","1U":"🇺","1V":"🇻","1W":"🇼","1X":"🇽","1Y":"🇾","1Z":"🇿"}]
$var[a;aaaaa]
$textSplit[$toUppercase[$var[word]];]
$var[input;$eval[$replaceText[$var[a];a;%{DOL}%json[1%{DOL}%splitText[%{DOL}%var[op\\]\\]\\]%{DOL}%var[op\\;%{DOL}%sum[%{DOL}%var[op\\]\\;1\\]\\] ;-1]]]
$textSplit[$var[input]; ]
$var[1;$splitText[1]]
$var[2;$splitText[2]]
$var[3;$splitText[3]]
$var[4;$splitText[4]]
$var[5;$splitText[5]]
$textSplit[$toLowercase[$var[word]];]
$var[w1;$splitText[1]]
$var[w2;$splitText[2]]
$var[w3;$splitText[3]]
$var[w4;$splitText[4]]
$var[w5;$splitText[5]]
$jsonParse[$getUserVar[wordle]]
$var[wordle;$json[word]]
$if[$var[wordle]!=$toLowercase[$var[word]]]
$var[ena;yes]
$else
$async[1]
$replyIn[2s]
$editMessage[$channelID;$json[msg];;🎉 You guessed it!;The word was **$toUppercase[$json[word]]** — and you cracked it.
You're a Wordle wizard 🧠✨;ffffff;A game played by $username]
$var[ena;no]
$endasync
$endif
$var[l1;$if[$var[w1]==$json[word_letters;0]] success $elseif[$checkContains[$var[wordle];$var[w1]]==true] primary $else secondary $endif]
$var[l2;$if[$var[w2]==$json[word_letters;1]] success $elseif[$checkContains[$var[wordle];$var[w2]]==true] primary $else secondary $endif]
$var[l3;$if[$var[w3]==$json[word_letters;2]] success $elseif[$checkContains[$var[wordle];$var[w3]]==true] primary $else secondary $endif]
$var[l4;$if[$var[w4]==$json[word_letters;3]] success $elseif[$checkContains[$var[wordle];$var[w4]]==true] primary $else secondary $endif]
$var[l5;$if[$var[w5]==$json[word_letters;4]] success $elseif[$checkContains[$var[wordle];$var[w5]]==true] primary $else secondary $endif]
$editButton[wordle_$json[index];;$var[l1];$var[ena];$var[1];$json[msg]]
$var[n_ind;$sum[$json[index];1]]
$editButton[wordle_$var[n_ind];;$var[l2];$var[ena];$var[2];$json[msg]]
$var[n_ind;$sum[$var[n_ind];1]]
$editButton[wordle_$var[n_ind];;$var[l3];$var[ena];$var[3];$json[msg]]
$var[n_ind;$sum[$var[n_ind];1]]
$editButton[wordle_$var[n_ind];;$var[l4];$var[ena];$var[4];$json[msg]]
$var[n_ind;$sum[$var[n_ind];1]]
$editButton[wordle_$var[n_ind];;$var[l5];$var[ena];$var[5];$json[msg]]
$var[n_ind;$sum[$var[n_ind];1]]
$jsonParse[$getUserVar[wordle]]
$jsonSetString[index;$var[n_ind]]
$setUserVar[wordle;$jsonStringify]
$if[$and[$var[continue]==true;$var[ena]==yes]]
$awaitFunc[wordle;$authorID]
$else
$setUserVar[wordle;]
$endif
$endif
$endif
$catch
$error[message]
$jsonParse[$getUserVar[wordle]]
$editMessage[$channelID;$json[msg];;Wordle - Game Over;You took way too many attempts to guess the word
the word was **$toUppercase[$json[word]]**;ffffff;]
$setUserVar[wordle;]
$endtry` },
  ],
  prev: { label: `home & tour`, to: `/snippet/bdfd/home` },
  next: { label: `all snippets`, to: `/snippet` },
};

export function WordleGame() {
  return <SnippetDocShell doc={doc} />;
}
