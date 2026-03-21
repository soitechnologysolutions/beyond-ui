# Beyond-UI: Getting Started

Kick off a Beyond-UI integration in three focused steps: install the package, load the compiled CSS bundle, and render your first component. Every export ships fully typed and already styled with semantic Tailwind tokens, so the default experience works even without adding Tailwind to your toolchain.

## 1. Install the package

Beyond-UI is published as an npm package with `react`, `react-dom`, and `tailwindcss` declared as peer dependencies. Install it with the package manager your project already uses:

```bash
# npm
npm install @beyondcorp/beyond-ui

# pnpm
pnpm add @beyondcorp/beyond-ui

# yarn
yarn add @beyondcorp/beyond-ui
```

The build exposes both ESM and CJS entry points plus generated type definitions. If you are working inside a monorepo, install the dependency in the app package that renders the components.

## 2. Import the generated CSS

Beyond-UI compiles Tailwind styles into a distributable stylesheet. Import it once in your application entry point (for example `src/main.tsx`, `src/main.jsx`, or `src/index.tsx`):

```tsx
import '@beyondcorp/beyond-ui/dist/styles.css';
```

The stylesheet bundles every component token, layout primitive, and utility class. You can keep Tailwind out of your build entirely if you rely on the default theme, or add Tailwind later to override semantic tokens or author bespoke utilities.

## 3. Render your first component

Every component is accessible through the package root. The example below renders a responsive dashboard card with a primary button and shows how props translate into semantic styles automatically:

```tsx
import { Card, CardHeader, CardTitle, CardContent, Button } from '@beyondcorp/beyond-ui';
import '@beyondcorp/beyond-ui/dist/styles.css';

export function WelcomeCard() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Welcome to Beyond-UI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Build production dashboards faster with ready-made components, hooks, and layouts.
        </p>
        <Button variant="primary" size="md">
          View Components
        </Button>
      </CardContent>
    </Card>
  );
}
```

This setup is all you need for local development and deployment. Continue with `docs/theming.md` to learn how semantic tokens map to your brand palette, and open Storybook (`npm run storybook`) for interactive component examples and prop references.
