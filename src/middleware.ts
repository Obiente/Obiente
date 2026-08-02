import { defineMiddleware } from "astro:middleware";

const canonicalOrigin = "https://obiente.org";
const redirectedHosts = new Set([
  "obiente.com",
  "www.obiente.com",
  "www.obiente.org",
]);

export const onRequest = defineMiddleware(({ url }, next) => {
  if (!redirectedHosts.has(url.hostname)) {
    return next();
  }

  return Response.redirect(
    new URL(`${url.pathname}${url.search}`, canonicalOrigin),
    308,
  );
});
