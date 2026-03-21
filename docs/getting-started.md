# Beyond-UI: Getting Started

Kick off a new Beyond-UI integration in three short steps: install the package, load the provided CSS bundle, and render your first component. The library ships fully typed React components styled with Tailwind semantic tokens, so no Tailwind configuration is required to get started.

## 1. Install the package

Beyond-UI is published as an npm package with React and Tailwind declared as peer dependencies. Install it with your favorite package manager:

```bash
npm install @beyondcorp/beyond-ui
```

The package exposes ESM and CJS builds plus generated type definitions. If you consume Beyond-UI inside a monorepo, make sure the install happens in the app package that renders the components.

## 2. Import the generated CSS

Beyond-UI compiles Tailwind styles into a distributable stylesheet. Import it once in your application entry point (for example `src/main.tsx` or `src/index.tsx`):

```tsx
import '@beyondcorp/beyond-ui/dist/styles.css';
```

The stylesheet bundles all component tokens, layout primitives, and utility classes. You can keep Tailwind out of your build entirely if you rely on the default theme, or you can still extend Tailwind in your project to override semantic tokens later.

## 3. Render your first component

Every component is accessible through the package root. The example below renders a responsive dashboard card with a primary button:

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

This setup is all you need for local development and deployment. Explore theming and layout customization in `docs/theming.md`, and check Storybook (`npm run storybook`) for interactive component examples and prop references.
