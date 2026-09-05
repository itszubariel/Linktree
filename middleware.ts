export const config = {
  matcher: ['/', '/((?!api|assets|images|_next/static|_next/image|favicon.ico).*)'],
};

const BOT_PATTERNS = [
  'discordbot',
  'twitterbot',
  'facebookexternalhit',
  'linkedinbot',
  'slackbot',
  'telegrambot',
  'googlebot',
  'bingbot',
  'applebot',
  'whatsapp',
];

export default function middleware(request: Request) {
  const ua = request.headers.get('user-agent')?.toLowerCase() || '';
  const isBot = BOT_PATTERNS.some((bot) => ua.includes(bot));

  if (!isBot) {
    return;
  }

  const url = new URL(request.url);
  const redirectUrl = new URL('/api/meta', request.url);
  redirectUrl.searchParams.set('path', url.pathname);

  return Response.redirect(redirectUrl, 307);
}
