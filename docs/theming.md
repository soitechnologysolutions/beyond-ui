# Beyond-UI Theming & Customization

Beyond-UI styles every component with semantic Tailwind tokens instead of hardcoded color values. By overriding those tokens inside your own `tailwind.config.js`, you can align the library with any brand system while keeping all components, layouts, and states in sync.

## Semantic token map

The library expects a small palette namespace. Each key should expose a scale (`50`–`950`) to support hover states, borders, and surface layers.

| Token      | Used for                                                                 |
|------------|--------------------------------------------------------------------------|
| `primary`  | Action buttons, Sidebar active states, Dashboard header highlights       |
| `secondary`| Neutral surfaces, typography accents, card borders                       |
| `danger`   | Destructive buttons, alert banners, badge variants                       |
| `success`  | Confirmation toasts, badge variants, input success states                |
| `warning`  | Warning alerts, badges, inline status chips                              |

When you import the packaged stylesheet (`@beyondcorp/beyond-ui/dist/styles.css`), these tokens default to the palette in `src/theme/default.ts`. Override any subset to match your design language.

## Extending Tailwind colors

Add or replace semantic tokens inside your application’s Tailwind config. Only the keys you override will change; everything else continues to use the defaults.

```js
// tailwind.config.js (consumer app)
export default {
  content: ['./src/**/*.{ts,tsx}', './node_modules/@beyondcorp/beyond-ui/dist/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f7ff',
          100: '#e4ebff',
          200: '#c2d0ff',
          300: '#94acff',
          400: '#5f7dff',
          500: '#3a5eff',
          600: '#1c3bec',
          700: '#132ac1',
          800: '#102394',
          900: '#0f1f6f',
          950: '#080f38',
        },
        secondary: {
          50: '#f5f6f7',
          500: '#344054',
          900: '#101828',
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
    },
  },
};
```

> **Tip:** You can keep Tailwind out of your build if you rely on the default theme and only import the generated CSS. Introduce Tailwind in the host project when you want to override tokens or author custom utility classes.

## DashboardLayout & Sidebar guidance

`DashboardLayout` composes `Sidebar` and `DashboardHeader`, so updating the semantic palette affects every layer:

- Sidebar background, brand badge, and active item highlight reference `primary` shades (`primary-50` for hover, `primary-600` for borders, `primary-700` for text).
- Neutral surfaces such as the sidebar container, dropdown chevrons, and content backgrounds rely on `secondary` and gray hues, which you can override to produce darker shells.
- Notification badges and destructive menu items use `danger`, `success`, and `warning` tokens.

To reshape the layout quickly, pair the Tailwind overrides with friendly component props:

```tsx
import { DashboardLayout, Button } from '@beyondcorp/beyond-ui';
import '@beyondcorp/beyond-ui/dist/styles.css';
import { Home, Users, TrendingUp } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Home', icon: <Home />, href: '/' },
  {
    id: 'customers',
    label: 'Customers',
    icon: <Users />,
    badge: '24',
    children: [
      { id: 'segments', label: 'Segments', icon: <Users /> },
      { id: 'lifecycle', label: 'Lifecycle', icon: <TrendingUp /> },
    ],
  },
];

export function CustomerOpsDashboard() {
  return (
    <DashboardLayout
      sidebarMenuItems={menuItems}
      activeSidebarItem="customers"
      onSidebarItemClick={(id) => console.log('navigate to', id)}
      sidebarTitle="BeyondCorp"
      sidebarHeaderClassName="text-primary-600"
      dashboardHeaderProps={{
        actions: <Button variant="primary">New Segment</Button>,
      }}
    >
      {/* Main content */}
    </DashboardLayout>
  );
}
```

With a themed palette the active menu badge, header buttons, and drawer accents inherit your new brand colors without additional overrides.

## Sidebar-specific adjustments

`Sidebar` exposes props for title, collapsible behaviour, and profile sections. When tailoring a dark or high-contrast theme:

- Supply `className` to append layout-specific utilities, e.g. `className="bg-secondary-900 text-secondary-100"`.
- Use `headerClassName` for the brand lockup so it adapts to the new palette.
- Customize badges by overriding the `Badge` component tokens (`danger`, `success`, etc.) in the Tailwind config.

```tsx
import { Sidebar } from '@beyondcorp/beyond-ui';

<Sidebar
  className="bg-secondary-950 text-secondary-100 border-secondary-800"
  headerClassName="text-primary-400"
  menuItems={menuItems}
  activeItem="home"
  profileSectionProps={{
    name: 'Avery Howard',
    email: 'avery@beyondcorp.com',
  }}
/>
```

This approach keeps the implementation purely declarative—no manual CSS overrides required. Whenever your design tokens change, regenerate Tailwind and every Beyond-UI surface will follow suit.
