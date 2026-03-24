# Security & Developer Experience Notes

## npm Audit Snapshot (2026-03-24)

The repo currently installs 1,600+ packages with 53 advisories reported by `npm audit` (8 low, 31 moderate, 14 high). Key upgrade paths:

- **Storybook 7.x → 10.x** (`storybook`, `@storybook/react`, `@storybook/addon-*`, `@storybook/react-vite`)
  - Resolves advisories around `@storybook/cli`, `@storybook/core-common`, `@storybook/builder-vite`
  - Breaking upgrade: consult migration notes before bumping.
- **vite-plugin-dts 3.x → 4.5.4** (bundled through Storybook + build tooling)
  - Removes transitive issues in `@microsoft/api-extractor`, `@vue/language-core`, `vue-tsc`.
- **tsup 7.x → 8.5.1** (resolves `esbuild` < 0.24.3 advisory + DOM clobbering CVE).
- **rollup 4.x < 4.59.0** (path traversal CVE). Update to ≥ 4.59.0; Storybook 10+ handles this automatically.
- **react-router-dom 7.9.1** (CSRF/XSS CVEs up to 7.12.0). Bump to 7.12.1+.
- **react-syntax-highlighter 15.x** (Prism <=1.29). Upgrade to 16.1.1+; watch for minor API changes.
- **Misc. utilities** (`giget`, `tar`, `cross-spawn`, `validator`, `nanoid`, `brace-expansion`). These are largely transitive. Most will resolve once the primary packages above are updated.

### Recommended Approach
- Track upgrades via Trello and address in batches (e.g., Storybook upgrade ticket, build toolchain ticket).
- Run `npm audit` after each upgrade to validate improvements; commit audit logs for history if needed.

## Environment Requirements
- **Node.js:** 18.x or newer (`package.json` sets `"node": ">=18.0.0"`).
- **npm:** 9.x or newer (`"npm": ">=9.0.0"`).
- pnpm/yarn also work but ensure lockfile consistency.
- Confirm `git`, `npx`, and `nvm` (optional) are installed for lint/test scripts.

## Everyday Scripts
| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies. |
| `npm run dev` | Run Vite dev server for the landing/showcase demos. |
| `npm run storybook` | Launch Storybook at http://localhost:6006. |
| `npm run build` | Build CSS + library bundle (`dist/`). |
| `npm run build-storybook` | Static Storybook export (for docs deployments). |
| `npm test` | Run Jest + React Testing Library suites. |
| `npm run lint` | Lint entire repo. |

## Clipboard UX Note
The Component Showcase relies on the [Clipboard API](https://developer.mozilla.org/docs/Web/API/Clipboard_API) for code copy. Browsers require HTTPS or `localhost`. If clipboard access fails (e.g., non-secure preview), users now see a fallback toast.

## Next Steps / Open Questions
- Schedule Storybook 10 migration (breaking changes to check: builder config, framework package names).
- Align build tooling (vite-plugin-dts/tsup/rollup) after Storybook upgrade.
- Add automated dependency scanning (e.g., GitHub Dependabot) to keep audit noise manageable.

