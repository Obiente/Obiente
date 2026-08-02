# Obiente website

This repository contains the source for [obiente.org](https://obiente.org).
The site introduces Obiente, the software we are building, the people behind
it, and the ways others can contribute. Obiente builds open-source tools for
people, not profit.

The site is built with [Astro](https://astro.build), Tailwind CSS, and the Astro
Node adapter. It is rendered as a standalone Node.js server rather than a
static export.

## Run it locally

You need an active Node.js LTS release and pnpm. Corepack can provide the pnpm
command.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

The development server is available at <http://localhost:4321> and reloads as
files change.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the local development server |
| `pnpm build` | Build the standalone production server in `dist/` |
| `pnpm preview` | Run the production build locally |
| `pnpm astro -- --help` | Show the available Astro CLI commands |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Obiente's projects, mission, team, and contribution information |
| `/contact` | Contact options and project links |
| `/join` | Resolve and redirect to the current Obiente Discord invitation |

Requests for `obiente.com`, `www.obiente.com`, and `www.obiente.org` are
permanently redirected to the matching path on `https://obiente.org`.

## Project structure

```text
public/                 Static images, people, and brand assets
src/components/         Reusable layout and typography components
src/components/icons/   Language, tool, and platform icons
src/layouts/            Shared document metadata and structured data
src/pages/              Public routes
src/sections/           Homepage sections and their content
src/global.css          Global styles and shared visual foundations
src/middleware.ts       Canonical-domain redirects
astro.config.mjs        Astro, Tailwind, Node adapter, and canonical site config
```

Most public content is kept close to the layout that presents it:

- Project names, descriptions, links, technologies, and platforms are in
  `src/sections/ProjectsSection.astro`.
- The current member roster is in `src/sections/TeamSection.astro`.
- The main vision statement is in `src/components/Welcome.astro`.
- Longer mission and philosophy copy is in
  `src/sections/AboutSection.astro`.
- Page titles, canonical URLs, social metadata, and organization structured
  data are in `src/layouts/Layout.astro`.

When project status, member information, or external links change, update the
relevant section with them.

## Production build

Run the same build used by the container before publishing changes:

```sh
pnpm build
```

The included `Dockerfile` installs dependencies from the lockfile, builds the
site, and starts the standalone server from `dist/server/entry.mjs`.

```sh
docker build -t obiente-website .
docker run --rm -p 4321:4321 obiente-website
```

The server reads `HOST` and `PORT`; the container defaults to `0.0.0.0:4321`.
