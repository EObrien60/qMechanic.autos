# Help-centre screenshots

The images under `public/help/admin/` are real captures of the **admin console as
it exists on `main`**, taken against a throwaway database seeded with a
fictional tenant.

## Rules

1. **Never capture against a customer or prospect database.** These images are
   published on a public, indexable site. Company names, staff names, email
   addresses and registration plates all end up in the page.
2. The demo tenant is deliberately fake:
   - Company: *Northgate Transport Ltd*
   - Emails: `@*.example` — RFC 2606 reserves `.example`, so the domains cannot
     be registered by anyone.
   - Registrations: Irish format but with `XX` in the county position, which is
     not a valid county code, so no plate can collide with a real vehicle.
   - Place names are invented.
3. Light theme only, so the set stays visually consistent.
4. Captured at 1440px wide @2x, then downscaled to 1440px and converted to WebP
   (q82). The help article column is 760px, so that is still retina-sharp.
   Keeps the whole set at ~1.3MB rather than ~9MB of PNG.

## Regenerating

The seeder and capture scripts live outside this repo, at
`~/dev/qh/qm-demo-seed/` (seed) and alongside it (capture), because they are dev
tooling rather than site source.

```sh
# 1. throwaway database
docker run -d --name qm-kb-db -e POSTGRES_USER=kb -e POSTGRES_PASSWORD=kb \
  -e POSTGRES_DB=kb -p 55433:5432 postgres:16-alpine

# 2. let TypeORM create the schema, then seed the neutral tenant.
#    Use the discrete PG* vars — DATABASE_URL forces SSL, which local PG lacks.
PGHOST=localhost PGPORT=55433 PGUSER=kb PGPASSWORD=kb PGDATABASE=kb \
  node <backend>/dist/src/server.js
QM_TEST_DB=postgresql://kb:kb@localhost:55433/kb KB_TODAY=$(date +%F)T09:00:00 \
  node seed.js

# 3. serve main's admin against it, then capture
VITE_API_BASE_URL=http://localhost:4319 npx vite --port 5299
node capture.js ./shots && node optimise.js ./shots ./shots-web
cp shots-web/*.webp apps/marketing/public/help/admin/
```

`KB_TODAY` matters: the seeder anchors all its dates to it, and the daily-status
views only look populated if "today" actually has inspections in it.

## Adding a screenshot to an article

Add a `shots` entry to any section in `app/(marketing)/help/content.ts`:

```ts
shots: [
  { file: 'template-builder.webp', alt: 'Required, for screen readers.', caption: 'Optional.' },
],
```

`alt` is required. Shots render after the section intro and before the steps, so
the reader is oriented before working through them.
