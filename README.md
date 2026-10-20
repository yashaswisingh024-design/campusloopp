# CampusLoop

CampusLoop is a Next.js student marketplace prototype. The current UI includes a landing page, sample marketplace catalogue, listing details, college email signup/sign-in, and a student profile view.

## Current integration status

- **Authentication:** Netlify Identity client integration is present. It requires Identity to be enabled for the Netlify site. Google sign-in additionally requires Google OAuth credentials in Netlify Identity settings. Domain matching is a client-side signup check and is not official student verification.
- **Listings:** Current catalogue entries are illustrative examples in `lib/data.ts`. There is no listings database, server-side ownership authorization, or image storage connected. Publishing is intentionally unavailable.
- **Messages:** No conversation or message backend is configured; users cannot send messages.
- **Referrals:** Referral attribution, rewards, and ambassador activity are not implemented. No credits or conversions are recorded.
- **APAAR:** Disabled. A 12-digit format check would not verify identity; connect an authorized provider before enabling it.
- **Admin:** The route is an informational placeholder. No admin data or controls are exposed.

Do not present preview listings or the example image files as real student posts.

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm ci
npm run dev
```

The app runs at `http://localhost:3000`. Without a configured Netlify Identity site, auth actions will fail with provider errors; the preview marketplace remains browseable.

## Environment and provider setup

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_COLLEGE_EMAIL_DOMAINS`: comma-separated college email domains allowed by the signup UI, such as `apsit.edu.in`. This is a convenience check only, not verification. Keep it aligned with the colleges enabled in `lib/colleges.ts`.

In the Netlify dashboard, enable Identity, choose the registration confirmation policy, configure allowed external providers, and add the production callback URL for Google OAuth. Set the same domain list in Netlify's build environment for production. Never place OAuth client secrets or service credentials in `NEXT_PUBLIC_*` variables.

Before enabling publishing, add a persistent listing store and image storage, then enforce authenticated ownership for create/edit/delete on the server. Before enabling messaging or referrals, connect persistent data models and server-side authorization/attribution. Do not use browser local storage as the source of truth for users, listings, or transactions.

## Routes

- `/` — product overview and preview catalogue
- `/marketplace` and `/marketplace/[id]` — searchable example catalogue and item details
- `/sell` — listing form design; publishing is unavailable until backend setup
- `/auth` — Netlify Identity college email and Google flow
- `/profile` — current provider-backed profile details
- `/messages`, `/ambassador`, `/admin` — clear integration status pages

## Build and deployment

```bash
npm run lint
npm run build
```

Netlify uses `@netlify/plugin-nextjs` via `netlify.toml`; deploys should run from the connected Git repository and use the Identity configuration above. The build output is framework-managed by the plugin. Confirm Identity settings and environment variables in Netlify before production use.
