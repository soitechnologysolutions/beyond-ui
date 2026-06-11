import path from "path";
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

const barrelInputs = [
  "src/components/Alert/index.ts",
  "src/components/Avatar/index.ts",
  "src/components/Badge/index.ts",
  "src/components/Button/index.ts",
  "src/components/Card/index.ts",
  "src/components/Checkbox/index.ts",
  "src/components/ComponentShowcase/index.ts",
  "src/components/DashboardGrid/index.ts",
  "src/components/DashboardHeader/index.ts",
  "src/components/DashboardLayout/index.ts",
  "src/components/DataTable/index.ts",
  "src/components/Input/index.ts",
  "src/components/Modal/index.ts",
  "src/components/Navbar/index.ts",
  "src/components/Sidebar/index.ts",
  "src/components/Skeleton/index.ts",
  "src/components/Spinner/index.ts",
  "src/components/StatsCard/index.ts",
  "src/components/Switch/index.ts",
  "src/components/Tabs/index.ts",
  "src/components/Textarea/index.ts",
  "src/components/Toast/index.ts",
  "src/hooks/useBreakpoint.ts",
  "src/hooks/useDarkMode.ts",
  "src/hooks/useDebounce.ts",
  "src/hooks/useLocalStorage.ts",
  "src/hooks/useToggle.ts",
  "src/utils/cn.ts",
  "src/theme/default.ts",
  "src/contexts/index.ts",
  "src/components/Auth/index.ts",
  "src/index.ts",
  "src/services/index.ts",
  "src/components/PageLayout/index.ts"
];

const externals = [
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
  "clsx",
  "tailwind-merge",
  "class-variance-authority",
  "@radix-ui/react-slot",
  "lucide-react",
  "react-hot-toast",
  "react-hook-form",
  "@hookform/resolvers/zod",
  "zod",
  "react-router-dom",
  "js-cookie",
  "recharts",
  "prismjs",
  "react-syntax-highlighter",
  "remark-gfm",
  "react-markdown"
];

const externalFunc = (id) =>
  externals.some((pkg) => id === pkg || id.startsWith(pkg + "/")) ||
  id.startsWith("@react-email/");

export default {
  input: barrelInputs,
  output: {
    dir: "dist",
    format: "esm",
    preserveModules: true,
    preserveModulesRoot: "src",
    exports: "named",
    sourcemap: true
  },
  external: externalFunc,
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: false,
      declarationDir: undefined,
      rootDir: "src"
    })
  ]
};