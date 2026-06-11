# ANNA Photography — Project Guide for Claude

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Sanity CMS v3 (Studio at `/studio`, schemas in `sanity/schemas/`)
- Deployed on Vercel (project: `anna-photography`, team: `testsaite`)
- GitHub: `vbag335-code/anna-photography`

## Credentials & IDs
- Sanity project ID: `oggp809l`
- Sanity dataset: `production`
- Vercel project ID: `prj_HSFAYrQ3weqLXXBr7BKNfWA2jM1E`
- Vercel team ID: `team_qnKHmf2BqGOXbyZFJeHJaQnD`
- Owner email: `vbag335@gmail.com`

## Critical Bugs Already Fixed — Never Reintroduce

### 1. Sanity Proxy must bind `this`
File: `sanity/lib/client.ts`
The Proxy that wraps the Sanity client MUST use `.bind(c)` on function properties.
Without it, `client.fetch()` silently returns empty data every time.
```ts
// CORRECT
if (typeof value === "function") return (value as Function).bind(c);
```

### 2. Pages must use `force-dynamic` + queries must use `cache: "no-store"`
Files: `app/page.tsx`, `app/project/[slug]/page.tsx`, `sanity/lib/queries.ts`
- Pages: `export const dynamic = "force-dynamic";`
- Queries: `{ cache: "no-store" }` as third arg to `client.fetch()`
- Without this, Sanity changes never appear on the live site (cached forever).

### 3. next.config must be `.mjs` not `.ts`
Next.js 14.2.x does not support `next.config.ts`. Always use `next.config.mjs`.

### 4. Sanity client must be a lazy singleton
The `createClient()` call must NOT happen at module load time (throws at build
when env vars are missing). Use the lazy pattern in `sanity/lib/client.ts`.
Hardcode fallback: `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "oggp809l"`

### 5. Studio basePath must be set
File: `sanity/sanity.config.ts`
Must include `basePath: "/studio"` and `name: "default"` or Studio throws
"Tool not found: studio".

### 6. imageBuilder must be pre-configured at module level
File: `sanity/lib/image.ts`
Create ONE builder instance at module level, not inside the function.
Hardcode fallback project ID: `|| "oggp809l"`

## Architecture
```
app/
  page.tsx              # Homepage — fetches settings + projects from Sanity
  project/[slug]/       # Project detail page
  studio/[[...tool]]/   # Sanity Studio embedded
components/
  WorkSection.tsx       # "use client" — renders project grid/list
  Hero.tsx, Header.tsx, AboutSection.tsx, Footer.tsx
sanity/
  lib/client.ts         # Lazy singleton Sanity client with Proxy
  lib/queries.ts        # All GROQ queries (force no-cache)
  lib/image.ts          # urlFor() image builder
  schemas/              # siteSettings.ts + project.ts
```

## Sanity Content Schema
**siteSettings** (one document): siteName, tagline, statement, aboutText,
aboutPortrait, basedIn, working, since, focus, bookingStatus, email,
instagram, behance, vsco

**project**: title, slug, code, category, year, location, tagline,
description, coverImage, photos[], order

## Vercel Env Vars (all 3 required)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=oggp809l
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=<viewer token from sanity.io/manage>
```

## CORS
`https://anna-photography.vercel.app` is already added to Sanity CORS list.
`http://localhost:3333` is also there for local dev.

## Common Tasks

### Deploy a fix
```bash
git add <files>
git commit -m "fix: description"
git push
```
Vercel auto-deploys from `main`. Takes ~2 min.

### Check deployment status
Use Vercel MCP: `list_deployments` with projectId=`anna-photography`, teamId=`testsaite`

### Add env vars to Vercel
Use Vercel dashboard JS API from the vercel.com tab:
```js
fetch('/api/v9/projects/prj_HSFAYrQ3weqLXXBr7BKNfWA2jM1E/env?teamId=team_qnKHmf2BqGOXbyZFJeHJaQnD', {
  method: 'POST', headers: {'Content-Type':'application/json'},
  body: JSON.stringify([{key:'KEY', value:'val', type:'plain', target:['production','preview','development']}])
})
```

### Check Sanity data directly
```bash
curl -H "Authorization: Bearer <SANITY_API_READ_TOKEN>" \
  "https://oggp809l.api.sanity.io/v2024-01-01/data/query/production?query=*[_type==\"project\"]{_id,title}"
```

### Add a user to Sanity project
```bash
cd /Users/valdemaras/Downloads/anna-photography
node_modules/.bin/sanity users invite <email> --role administrator
```

### Login to Sanity CLI
```bash
node_modules/.bin/sanity login --provider google --no-open
# Opens a URL — open it in browser to authenticate
```
