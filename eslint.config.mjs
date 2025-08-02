import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // 👇 THIS will exclude the prisma generated folder from linting
    ignores: ["src/generated/prisma/**"],
  },

  // Keep the original config here
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
