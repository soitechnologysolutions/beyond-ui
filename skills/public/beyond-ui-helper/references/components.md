# Beyond-UI Component Catalogue

This quick reference highlights the most-used exports from `@beyondcorp/beyond-ui`. All components share these characteristics:

- Built with class-variance-authority (CVA) for variants/sizes.
- Accept `className` for Tailwind overrides.
- Are fully typed with TypeScript definitions emitted in the package.
- Have Storybook stories in the upstream repo under `stories/*.stories.tsx` for live examples.

## Core layout primitives

- **Navbar** – Flexible top navigation with slot-based children.
- **Sidebar** – Collapsible navigation tree with badges and nested items.
- **DashboardLayout** – Composes `Sidebar`, `DashboardHeader`, and main content, exposing props for menu items, header actions, and responsive behaviour.
- **DashboardGrid** – Responsive layout helper for metric cards and charts.
- **PageLayout** – Generic two-column layout with hero/aside pattern.

## Forms & inputs

- **Button** – Variants: `primary`, `secondary`, `danger`, `ghost`; sizes `sm`, `md`, `lg`.
- **Input** – Text inputs with support for icons, validation states (default, error, success).
- **Textarea** – Multi-line input with char counter option.
- **Select** – Styled select/dropdown control (searchable and async-ready).
- **Checkbox / Radio / Switch** – Accessible form controls with label slots and state props.
- **NightModeSwitch** – Sun/Moon toggle with `variant`, `size`, and icon style (`filled`, `outline`).

## Data display & feedback

- **Card** family – `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
- **Badge** – Variants `info`, `warning`, `danger`, `success`, `neutral` with optional icon.
- **Alert** – Inline feedback (info, success, warning, danger). Includes icon slot and action area.
- **Toast** – Imperative notifications; use provided hooks for queueing.
- **Tabs** – Horizontal/vertical tabs with `variant` and `size` options.
- **DataTable** – Table component with sortable columns and customizable cells.
- **Skeleton** – Loading placeholder shapes.
- **Spinner** – Loading indicator with size variants.
- **ComponentShowcase** – Landing page demo blocks with clipboard integration (requires HTTPS/localhost for Clipboard API).
- **StatsCard** – Metric tile with trend indicator slots.
- **Image / Marketplace / Blog** – Showcase components for marketing and listings pages.

## Composite views

- **Auth** – Prebuilt login/register/reset forms; uses Beyond-UI form controls internally.
- **ProfileManagement** – Account profile editing layout and forms.
- **LandingPage** – Sections for hero, features, testimonials.
- **SingleProductView / SingleBlogView** – Detail pages for catalogue/blog experiences.

## Usage notes

- All exports are surfaced through `src/index.ts`, so import from the package root.
- Components share TypeScript types; check Storybook docs for prop tables.
- For composition-heavy views (dashboards, landing pages), combine layout primitives with Cards/Stats/Charts.
- For charts, use `ChartWrapper` (in the repo) to integrate with `recharts` when needed.

See [references/hooks.md](hooks.md) for complementary hooks and utilities, and [references/workflow.md](workflow.md) for scripts to run Storybook/test suites while you integrate.
