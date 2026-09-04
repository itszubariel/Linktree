import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `home`,
  head: `Server`,
  word: `Home & Tour.`,
  tail: ``,
  badge: `utility`,
  tags: [
    { icon: `fa-brands fa-discord`, label: `BDFD` },
  ],
  subtitle: `A complete welcome system with interactive buttons, server tour, rules, roles, FAQ, and support info. Uses \`$addContainer\` and \`$addTextDisplay\` for clean, organized embeds with navigation.`,
  info: [
    { head: `// how to use`, body: `Add the \`!home\` trigger command and the \`$onInteraction\` handler. Customize channel mentions, role IDs, and tour pages to match your server structure.` },
    { head: `// features`, body: `Interactive tour with pagination, rules & roles info, FAQ & support sections, Discord basics for new users, and fully customizable navigation with buttons and select menus.` },
  ],
  files: [
    { name: `!home`, lang: `bdfd`, code: `$addContainer[home]
$addTextDisplay[# Welcome To $serverName[$guildID];home]
$addSeparator[true;;home]
$addTextDisplay[Welcome to our server! Have fun, enjoy the community, 
and make yourself at home.
Be sure to read #rules and join the conversation in #main-chat.;home]
$addSeparator[true;;home]
$addActionRow[row1;home]
$addButtonCV2[tour;Take a Tour;secondary;;;row1]
$addButtonCV2[rules;Server Rules;secondary;;;row1]
$addButtonCV2[roles;Server Roles;secondary;;;row1]
$addSeparator[true;;home]
$addActionRow[row2;home]
$addStringSelect[others;Learn more here...;;;;row2]
$addStringSelectOption[FAQs;faq;frequently asked questions;;;others]
$addStringSelectOption[Support;support;need help?;;;others]` },
    { name: `$onInteraction`, lang: `bdfd`, code: `$nomention

$if[$customID==rules]
$ephemeral
$addContainer[rules]
$addTextDisplay[## Need help with the server rules?;rules]
$addSeparator[true;small;rules]
$addTextDisplay[
> 1. Keep Content Family Friendly
> 2. No Spamming
> 3. No Self Promotion
> 4. No Toxicity
> 5. No Attention-Seeking Names
> 6. Pings
> 7. Do Not Ask For Things
> 8. Boosting
> 9. No Impersonating
> 10. Let Staff Do Their Job
> 11. Asking For Help;rules]
$addSeparator[true;small;rules]
$addTextDisplay[-# for the full description of each of the rules head over to #⁠rules;rules]
$addSeparator[true;small;rules]
$addActionRow[row1;rules]
$addButtonCV2[https://discord.com/terms;Discord's TOS;link;;;row1]
$addButtonCV2[https://discord.com/guidelines;Discord Community Guidelines;link;;;row1]
$endif

$if[$customID==roles]
$ephemeral
$addContainer[roles]
$addTextDisplay[## Need help with server roles?;roles]
$addSeparator[true;;roles]
$addTextDisplay[> @Developer:
> *Owners of the server and the app who make it all work*
> @This guy:
> *Manager of all the staff*
> 
> @Lead Staff:
> *Lead staff. They run the staff team and keep them in line*
> 
> @Senior Moderator:
> *Senior Moderators. Moderators who have been staff for a long time and are trusted. You cannot get this without Moderator*
> @Moderator:
> *Moderators. They make sure that all members are acting appropriately. You cannot get this without Trial Moderator*
> @Trial Moderator:
> *Trial Moderators. They work to become full Moderators with the same job. You cannot get this without Support*
> 
> @Support: 
> *They stay in ⁠support and ⁠international-support, helping users out with their issues. You cannot get this without Trial Support*
> @Trial Support:
> *Trial Support (SIT or TS). They work to become full Support members. They have fewer permissions than full Supports*;roles]
$addSeparator[true;;roles]
$addTextDisplay[-# for the full roles info please head over to #role-info;roles]
$endif

$if[$message==faq]
$ephemeral
$addContainer[faq]
$addTextDisplay[## Frequently Asked Questions;faq]
$addSeparator[true;;faq]
$addTextDisplay[
> 1. I keep posting my questions in support channels, why haven't I gotten a response yet?
> 2. I tried to use a function but I get the entire function back as a response
> 3. My bot can't kick or ban or give roles anyone?
> 4. I pressed the watch AD button so many times and nothing happens! I even restarted the app! What should I do?
> 5. My suggestion got so many upvotes! When will it be added?
> 6. Tickets can be seen by anyone. How do I make them private?
> 7. Why does this wiki not work?
> 8. How can I become a support member?;faq]
$addSeparator[true;;faq]
$addTextDisplay[-# for the full faq (+ answeres) please head over to #⁠faq;faq]
$endif

$if[$message==support]
$ephemeral
$addContainer[support]
$addTextDisplay[## Support;support]
$addSeparator[true;;support]
$addTextDisplay[
> If you need help with anything, please ask in support or create a ticket in tickets.
> Our staff team or community members will respond as soon as possible, so please be patient and cooperative.;support]
$addSeparator[true;;support]
$addTextDisplay[
### Common Reasons To Make A Ticket

**Need Help With:**
> 1. Something in the server
> 2. Discord setup or features
> 3. Roles, permissions, or channels
> 4. Questions or general support
**Want To:**
> 1. Report a member breaking rules (proof required)
> 2. Report a staff member (proof required)
> 3. Report bugs or server issues
> 4. Contact staff privately about concerns or applications;support]
$addSeparator[true;;support]
$addTextDisplay[-# These are common examples, but not limited to all reasons for creating a ticket.;support]
$endif

$if[$customID==tour]
$ephemeral
$addContainer[tour]
$addTextDisplay[# Welcome, $username[$authorID];tour]
$addSeparator[true;;tour]
$addTextDisplay[Hi there, I'm <@$botID>!
I'll be your tour guide today.

We know joining a new server can sometimes 
feel overwhelming or confusing.

To help you settle into our community, join me on a 
quick tour of the server where I'll guide you through 
everything step by step.;tour]
$addSeparator[true;;tour]
$addTextDisplay[-# Just press the Start Tour button below!;tour]
$addSeparator[true;;tour]
$addActionRow[row1;tour]
$addButtonCV2[start;Start Tour;secondary;;;row1]
$addButtonCV2[new;New to discord?;secondary;;;row1]
$endif

$if[$customID==new]
$ephemeral
$addContainer[new]
$addTextDisplay[## What is Discord?;new]
$addMediaGallery[whatisdiscord;new]
$addMediaGalleryItem[https://media.discordapp.net/attachments/975024787917242418/1071172570356908082/What_Is_Discord_Image.png;;;whatisdiscord]
$addTextDisplay[Hey there! If you're new to Discord, don't worry, it's easy to get the hang of it.

Discord is a communication platform that is used by many online communities, such as gamers, educators, and more. You can use it to chat with others in real-time using text, voice, or video.

It's important to follow the rules set by the server's administrators and be respectful of others while using Discord. Avoid spamming, bullying, or posting inappropriate content.

With its user-friendly interface and numerous customization options, Discord is a great platform for online communities. If you have any further questions, feel free to ask.
;new]
$addSeparator[true;;new]
$addTextDisplay[## What is a Server?;new]
$addMediaGallery[whatisserver;new]
$addMediaGalleryItem[https://techviral.net/wp-content/uploads/2022/03/Discord-featured-image.jpg;;;whatisserver]
$addTextDisplay[A Discord server is a virtual space where people can communicate with each other through text, voice, and video. They are typically created and managed by community organizers, gamers, or groups of friends and provide a centralized location for people to chat and interact.

Think of a server as a group chat or the hub/home of the community where members can hang out. Each server you are in is represented by an icon on the left-hand side of your screen.
;new]
$addSeparator[true;;new]
$addActionRow[row1;new]
$addButtonCV2[discord-next1;Next;secondary;;;row1]
$endif

$if[$customID==discord-next1]
$ephemeral
$addContainer[discord-next1]
$addTextDisplay[## Setup Your Discord Profile;discord-next1]
$addSeparator[true;;discord-next1]
$addTextDisplay[### Profile Picture:
You can add a profile picture by clicking on the “Edit Profile” button, and then clicking on “Change Avatar.” You can either upload a picture from your device.
### About Me:
To add a bio to your profile, click on the “Edit Profile” button, then enter your bio in the “About Me” section.
### Username:
To change your username, click on user settings and under my account click "Edit" next to the username. Enter a name and type in your password to verify and it > should update accordingly.;discord-next1]
$addSeparator[true;;discord-next1]
$addTextDisplay[## How can I add Friends?;discord-next1]
$addSeparator[true;;discord-next1]
$addTextDisplay[### Friends:
You can add friends on Discord by clicking on the “Friends” tab in the Discord menu, then clicking on the “Add Friend” button and entering the username of the > person you want to add.;discord-next1]
$endif

$if[$customID==start]
$ephemeral
$addContainer[tour1]
$addTextDisplay[# Server Tour #1;tour1]
$addSeparator[true;;tour1]
$addTextDisplay[Firstly, let’s start with verifying and gaining access 
to the rest of the server.

Head over to #⁠verify and simply click on Verify button 
to receive the @Verified role.

Once verified, head over to ⁠unknown and pick up a few 
roles to unlock even more channels and features!;tour1]
$addSeparator[true;;tour1]
$addActionRow[row1;tour1]
$addButtonCV2[tour-next1;Next;secondary;;;row1]
$addSeparator[true;;tour1]
$addTextDisplay[-# Page 1 of 5;tour1]
$endif



$if[$customID==tour-next1]
$addContainer[tour2]
$addTextDisplay[# Server Tour #2;tour2]
$addSeparator[true;;tour2]
$addTextDisplay[Secondly, let’s head over to support or create a ticket in 
tickets if you need help with anything.

You can use support for general questions, issues, or 
guidance. Just describe your problem clearly, and either 
staff or community members will respond and help you 
out as soon as possible.

For more private or specific matters, you can 
always open a ticket in tickets to get direct assistance 
from the support team.;tour2]
$addSeparator[true;;tour2]
$addActionRow[row1;tour2]
$addButtonCV2[start;Previous;secondary;;;row1]
$addButtonCV2[tour-next2;Next;secondary;;;row1]
$addSeparator[true;;tour2]
$addTextDisplay[-# Page 2 of 5;tour2]
$endif

$if[$customID==tour-next2]
$addContainer[tour3]
$addTextDisplay[# Server Tour #3;tour3]
$addSeparator[true;;tour3]
$addTextDisplay[Thirdly, let’s check out the welcome and bye channels to keep 
an eye on who joins and leaves the server.

This is where new members are greeted and where we say 
goodbye when someone leaves, so you can always stay updated 
with the community activity.;tour3]
$addSeparator[true;;tour3]
$addActionRow[row1;tour3]
$addButtonCV2[tour-next1;Previous;secondary;;;row1]
$addButtonCV2[tour-next3;Next;secondary;;;row1]
$addSeparator[true;;tour3]
$addTextDisplay[-# Page 3 of 5;tour3]
$endif

$if[$customID==tour-next3]
$addContainer[tour4]
$addTextDisplay[# Server Tour #4;tour4]
$addSeparator[true;;tour4]
$addTextDisplay[Fourthly, take a moment to read the server rules in ⁠rules and 
make sure to follow them while you're here.

You should also check ⁠role-info to understand how roles work in 
the server, and read the basic FAQs in ⁠faq for answers to common 
questions.

These will help you get a better understanding of how everything 
works and make your experience smoother.;tour4]
$addSeparator[true;;tour4]
$addActionRow[row1;tour4]
$addButtonCV2[tour-next2;Previous;secondary;;;row1]
$addButtonCV2[tour-next4;Next;secondary;;;row1]
$addSeparator[true;;tour4]
$addTextDisplay[-# Page 4 of 5;tour4]
$endif

$if[$customID==tour-next4]
$addContainer[tour5]
$addTextDisplay[# Server Tour #5;tour5]
$addSeparator[true;;tour5]
$addTextDisplay[Exactly in this manner just make as many as you'd want/like to 
cover your server tour.
Thank you for using this code, love from Zubariel :>;tour5]
$addSeparator[true;;tour5]
$addActionRow[row1;tour5]
$addButtonCV2[tour-next3;Previous;secondary;;;row1]
$addSeparator[true;;tour5]
$addTextDisplay[-# Page 5 of 5;tour5]
$endif` },
  ],
  prev: { label: `function/callback`, to: `/snippet/bdfd/functions` },
  next: { label: `wordle game`, to: `/snippet/bdfd/wordle` },
};

export function HomeTour() {
  return <SnippetDocShell doc={doc} />;
}
