# 16. Deploying on Vercel

Written 2026-11-20 when the owner moved the project into a git repository to publish it on Vercel. The site is a static Astro build (`dist/`). It was specified for Netlify (`docs/07`), and `netlify.toml` stays in the repository. `vercel.json` carries the same behaviour for Vercel.

## 1. Import the repository

1. Push the repository to GitHub, GitLab or Bitbucket.
2. In Vercel: Add New, Project, import the repository.
3. Settings (Vercel reads them from `vercel.json`, so they should already be filled in):

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Install command | `npm ci` |
| Build command | `npm run build` (this runs `astro build`, then `scripts/csp-headers.mjs`) |
| Output directory | `dist` |
| Node.js version | 22.x or newer (`package.json` asks for 22.23.4 or newer). If Vercel rejects the version, pick 22.x or 24.x in Project Settings, General |

## 2. Environment variables

| Name | Where | Value |
|---|---|---|
| `ALLOW_INDEXING` | Production only, at launch | `true`. Without it every page says `noindex,nofollow` in its robots meta element (and Netlify also sends the `X-Robots-Tag` header), so a staging or preview build is never indexed. Preview deployments must never have it |
| `ANALYTICS_HOST` | When analytics is chosen | for example `https://plausible.io`. Adds the host to the Content-Security-Policy |
| `USE_TURNSTILE` | Only with a form function | `true`. Adds Cloudflare Turnstile to the policy |

Changing a variable needs a redeploy, because the values are read at build time.

## 3. What `vercel.json` does

- `trailingSlash: true`, because the site uses `trailingSlash: "always"` and `/pricing/` is the canonical form.
- The nine redirects of `docs/04` section 6 (old URLs to new ones), as 301. They match `netlify.toml`. Check them on the deployment with `BASE_URL=https://<deployment> npx playwright test tests/e2e/redirects.spec.ts`.
- Security headers on every page: HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`.
- One year immutable caching for `/_astro/*` (hashed files).

## 4. Content-Security-Policy on Vercel

On Netlify the policy is a header (`dist/_headers`). Vercel does not read that file, and a header in `vercel.json` cannot hold the script hashes, which change when an inline script changes. So `scripts/csp-headers.mjs` also writes the same policy into a `<meta http-equiv="Content-Security-Policy">` element at the top of every page's `<head>`. It is built from the same hashes in the same build step, so it cannot go stale. A meta element cannot carry `frame-ancestors`, `report-uri` or `sandbox`, and framing is covered by `X-Frame-Options: DENY`. `tests/csp.spec.ts` checks that every page carries the policy.

## 5. The request form needs a handler (launch blocker on Vercel)

The request form (`src/components/RequestForm.astro`) was built for **Netlify Forms** (`data-netlify`, honeypot field). Netlify collects the submission at its edge. **Vercel does not**: the form posts to `/request-service/received/`, which is a static page, and a static page does not accept a POST. Until a handler exists, submissions on Vercel are not received. Pick one:

1. **A Vercel Function** (`api/request-service.ts`) that checks the honeypot, validates the fields, sends the email (Resend, Postmark or SendGrid, with the key in an environment variable) and answers 303 to `/request-service/received/?ref=...`. Change the form `action` to `/api/request-service`. The policy already allows `form-action 'self'`.
2. **A form service** (Formspree, Basin, Getform): set the form `action` to the service URL and add that host to `form-action` in `scripts/csp-headers.mjs`.
3. **Stay on Netlify** for hosting, and use Vercel for nothing.

Until then the phone number, the email address and the "Email documents" instructions on the page are the working channels.

## 6. Launch checklist

1. Set the production domain (`docs/12` question 17), and `site` in `astro.config.mjs` if it differs from `https://servepointcanada.com`.
2. Add `ALLOW_INDEXING=true` to Production and redeploy.
3. Check that a page now says `index,follow`, `/robots.txt`, `/sitemap-index.xml`, a 404 URL, the nine redirects and a security-header scan.
4. Run the form test submissions of `docs/07` section 5.3 against the handler chosen in section 5.
5. Run Lighthouse on the production URL (`docs/07` section 7 budgets).
