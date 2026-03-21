# Beyond-UI

**A full-fledged React + TailwindCSS component library. Theme-agnostic, reusable, type-safe, and built for productive UIs.**

---

## 🚀 Overview

Beyond-UI is a comprehensive collection of ready-to-use, themeable React UI components and hooks, built with TypeScript, TailwindCSS, and Vite. Inspired by the best of modern design systems, it’s built to be both design-consistent (via semantic theming) and easily composable for dashboards, apps, platforms, and SaaS.

- **Built for teams:** Use everywhere React and TailwindCSS run—admin panels, SaaS, dashboards, internal tools, consumer apps.
- **Theme-agnostic:** Every style resolves to semantic Tailwind tokens (e.g., `bg-primary`), not hardcoded colors.
- **Reusable hooks:** Utilities like `useDarkMode`, `useDebounce`, and more included.
- **Customizable:** Extend via className or swap out theme tokens, with Storybook-ready demos.

---

## 📦 Features

- **20+ reusable, composable components:** Button, Input, Card, Modal, Navbar, Sidebar, Tabs, Table, Alert, Spinner, Badge... (see below)
- **Variants/Theme support with [class-variance-authority (CVA)](https://cva.style/)**
- **Super-charged hooks:** `useDarkMode`, `useDebounce`, `useLocalStorage`, `useToggle`, `useBreakpoint`
- **Utility functions:** `cn()` (merge class names safely), default semantic `theme/default.ts`
- **Storybook documentation for every component**
- **Typed end-to-end (TypeScript)**
- **Testing with Jest & React Testing Library**
- **Easy Tailwind integration & custom theming**
- **Out-of-the-box default theme/fallback**
- **First-class DX: Vite, modern structure, peer deps for React/Tailwind**
- **NPM published, ready for mass reuse**

---

## ⚡️ Getting Started (Import CSS, No Tailwind Config Required)

Beyond-UI now bundles a ready-to-use CSS file for all styling.  
Just add this line to your app's entry file (e.g. main.tsx or index.js):

```js
import '@beyondcorp/beyond-ui/dist/styles.css';
```

- You do **not** need to configure Tailwind content scanning for the library.
- This CSS is built with [Tailwind CSS](https://tailwindcss.com/) for all components and utilities included in the library.
- If you want to customize theme tokens (e.g. primary, secondary), you can still extend Tailwind’s theme.

---

## 🎨 Theming Sidebar & DashboardLayout

Beyond-UI is **completely theme-agnostic**:
- All UI is styled with semantic tokens (e.g., `bg-primary-50`, `text-primary-700`, `border-primary-600`) rather than direct color values.
- Defaults to Tailwind's built-in palette (e.g., gray/white) but is overrideable using Tailwind config.
- Ships with a fallback theme ([`theme/default.ts`](src/theme/default.ts)) for instant appearance.

### Adding Sidebar Items in DashboardLayout

To have a configurable sidebar within your dashboard layout:

1. **Define menu items** as an array of `MenuItem` objects (each with `id`, `label`, `icon`, `href`, `badge`, and optional `children` for nested menus).
2. **Pass them to `DashboardLayout`** using the `sidebarMenuItems` prop. 
3. **Control the highlighted menu** by managing the `activeSidebarItem` prop.
4. **Handle user interaction** with `onSidebarItemClick`.

**Example:**
```tsx
import { DashboardLayout } from "@beyondcorp/beyond-ui";
import { Home, BarChart3, Users } from "lucide-react";
import '@beyondcorp/beyond-ui/dist/styles.css';

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <Home className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/analytics",
    badge: "New",
  },
  {
    id: "users",
    label: "Users",
    icon: <Users className="h-5 w-5" />,
    children: [
      {
        id: "all-users",
        label: "All Users",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },
];
export default function DemoDashboard() {
  const [active, setActive] = React.useState("dashboard");
  return (
    <DashboardLayout
      sidebarMenuItems={menuItems}
      activeSidebarItem={active}
      onSidebarItemClick={setActive}
    >
      <main>
        {/* Main dashboard content goes here */}
      </main>
    </DashboardLayout>
  );
}
```
You can build any sidebar structure—single-level, nested, badges—using this pattern and pass it to the layout.

### Customizing Sidebar/DashboardLayout Colors

To override the sidebar background, accent, and dashboard colors, extend your `tailwind.config.js` with your color palette:

```js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f2f8ff',     // sidebar background
        100: '#dbeafe',
        600: '#2563eb',    // sidebar brand area (logo bg, borders)
        700: '#1d4ed8',
      },
      secondary: {
        50: '#f4f6fa',
        700: '#3b82f6',
      },
      danger: {
        50: '#fef2f2',
        600: '#dc2626',
      },
      // You can add other tokens
      // See theme/default.ts for all required keys
    }
  }
}
```

Sidebar, DashboardLayout, and badge/notification UI use these tokens for their background, text, borders, and hover states.

**Example: Custom Sidebar**
```tsx
import { Sidebar } from "@beyondcorp/beyond-ui";
import '@beyondcorp/beyond-ui/dist/styles.css';

// Nested menu, custom badges
const menuItems = [
  {
    id: "main",
    label: "Main",
    icon: <span>M</span>,
    badge: "Hot",
    children: [
      {
        id: "nested1",
        label: "Nested Item",
        icon: <span>N</span>,
        badge: "New",
      },
    ]
  },
];

<Sidebar
  menuItems={menuItems}
  className="shadow-xl"
/>
```

### Fallback Theme

If your Tailwind config doesn't specify semantic tokens, Beyond-UI defaults to the palette in [`theme/default.ts`](src/theme/default.ts), ensuring that all layouts/components always render.

---

## 🧩 Components

| Name          | Features / Variants             |
|---------------|---------------------------------|
| Button        | Variants (primary, secondary, danger, ghost), Sizes (sm, md, lg), Full type safety |
| Input         | Variants (default, error, success), Sizes, Icon support        |
| Textarea      | Auto-resize, char counter       |
| Select        | Dropdown, search, async         |
| Checkbox      | Label, indeterminate            |
| Radio         | Group support                   |
| Switch        | Animation, boolean toggle       |
| Card          | Header, body, footer slots      |
| Modal         | Overlay, keyboard dismiss       |
| Badge         | Variants (info, warning, error) |
| Tabs          | Horizontal/vertical, variants   |
| Table         | Sortable, customized cells      |
| Alert         | Info/success/warning/danger     |
| Toast         | Notifications, timeouts         |
| Skeleton      | Loading states                  |
| Spinner       | Loader, multiple sizes          |
| Navbar, Sidebar | Layout primitives           |
| StatsCard     | Dashboard blocks                |
| ChartWrapper  | Recharts integration            |
| ...           | More (see Storybook)            |

---

## 🌙 NightModeSwitch Component

A reusable, theme-agnostic dark/light mode toggle with sun/moon icons.

### Usage

```tsx
import { NightModeSwitch } from "src/components/NightModeSwitch";

<NightModeSwitch
  variant="ghost"
  size="md"
  iconStyle="filled"
  ariaLabel="Toggle dark mode"
  className="ml-2"
/>
```

### Props

- `variant`: "primary" | "secondary" | "ghost" (default: "ghost")
- `size`: "sm" | "md" | "lg" (default: "md")
- `iconStyle`: "filled" | "outline" (default: "filled")
- `ariaLabel`: string (default: "Toggle dark mode")
- `className`: string (optional)

### Theming

- Uses semantic Tailwind tokens (`bg-primary`, `text-primary`, etc.).
- Respects default theme in [`src/theme/default.ts`](src/theme/default.ts:1).
- No hardcoded colors; fully theme-agnostic.

### Integration Example

Add to Navbar:

```tsx
import { Navbar } from "src/components/Navbar";
import { NightModeSwitch } from "src/components/NightModeSwitch";

<Navbar>
  <div className="flex items-center gap-4 px-4 w-full">
    <span className="font-bold text-xl">My App</span>
    <nav className="flex gap-2 ml-auto">
      <a href="/" className="text-blue-500">Home</a>
      <a href="/about" className="text-blue-500">About</a>
    </nav>
    <NightModeSwitch className="ml-4" variant="ghost" size="md" ariaLabel="Toggle dark mode" />
  </div>
</Navbar>
```

### Accessibility

- Keyboard and screen reader accessible.
- Uses `aria-label` and `aria-pressed`.

### Storybook

See `stories/NightModeSwitch.stories.tsx` for live examples and customization.
---

## 🧵 Hooks & Utilities

| Hook                | Purpose                          |
|---------------------|----------------------------------|
| useDarkMode         | Toggle and persist theme         |
| useDebounce         | Debounce values/input            |
| useLocalStorage     | Persistent state                 |
| useToggle           | Boolean flip and set             |
| useBreakpoint       | Responsive breakpoint API        |

| Utility | Description  |
|---------|--------------|
| cn()    | Merges class names with tailwind-merge |
| defaultTheme | Fallback theme definitions |

---

## 🧑‍💻 Usage Example

```tsx
import { Button, Card, useBreakpoint } from '@beyondcorp/beyond-ui';
import '@beyondcorp/beyond-ui/dist/styles.css';

export default function Demo() {
  const { isAbove } = useBreakpoint();
  return (
    <Card>
      <Button variant="primary" size={isAbove('md') ? "lg" : "sm"}>
        Click me
      </Button>
    </Card>
  );
}
```

---

## 📖 Documentation & Storybook

- [Getting Started guide](docs/getting-started.md)
- [Theming & customization](docs/theming.md)
- `npm run storybook` (run locally for component demos)
- Comprehensive API docs live alongside Storybook

---

## 🛠 Project Structure

```
beyond-ui/
├─ src/
│   ├─ components/
│   ├─ hooks/
│   ├─ utils/
│   ├─ theme/
│   └─ index.ts
├─ .storybook/
├─ tests/
├─ tailwind.config.js
├─ tsconfig.json
├─ vite.config.ts
├─ package.json
└─ README.md
```

---

## 🛤 Roadmap & Milestones

- M1: Project setup, theme, utilities
- M2: Core components (Button, Input, Card, Modal, Badge, ... )
- M3: All reusable hooks
- M4: Storybook & docs
- M5: Complete Jest test coverage & accessibility
- M6: npm package v1 stable release
- M7: Dashboard, charts, advanced table, improved theming
- See roadmap.md for complete breakdown.

---

## 🤝 Contributing

- Contributions, PRs, and issues welcome!
- Please see `/CONTRIBUTING.md` for details, coding standards, and branch workflow.

---

## 📝 License

MIT © Beyond Corp, Soi Technology Solutions 2025

---

# Beyond-UI: Build clean, scalable UIs faster, with every detail documented and ready to use.
