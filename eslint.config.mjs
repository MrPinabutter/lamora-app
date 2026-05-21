import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import boundaries from "eslint-plugin-boundaries";
import storybook from "eslint-plugin-storybook";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Arquitetura feature-first: o fluxo de dependência é app/ -> features/ -> shared/.
  // Uma feature NUNCA pode importar outra feature diretamente.
  {
    plugins: { boundaries },
    settings: {
      "boundaries/legacy-templates": false,
      "boundaries/elements": [
        { type: "app", pattern: "src/app", mode: "folder" },
        {
          type: "feature",
          pattern: "src/features/*",
          mode: "folder",
          capture: ["name"],
        },
        { type: "shared", pattern: "src/shared", mode: "folder" },
        { type: "server", pattern: "src/server", mode: "folder" },
        { type: "store", pattern: "src/store", mode: "folder" },
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: { type: "app" },
              allow: {
                to: { type: ["app", "feature", "shared", "store", "server"] },
              },
            },
            {
              from: { type: "feature" },
              allow: [
                { to: { type: ["shared", "store"] } },
                // Uma feature só pode importar a si mesma, nunca outra feature.
                {
                  to: {
                    type: "feature",
                    captured: { name: "{{from.captured.name}}" },
                  },
                },
              ],
            },
            { from: { type: "shared" }, allow: { to: { type: "shared" } } },
            {
              from: { type: "server" },
              allow: { to: { type: ["shared", "server"] } },
            },
            {
              from: { type: "store" },
              allow: { to: { type: ["store", "feature", "shared"] } },
            },
          ],
        },
      ],
    },
  },
  // Regras gerais de qualidade.
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "react/jsx-no-leaked-render": "error",
      "react-hooks/exhaustive-deps": "error",
    },
  },
  // Acesso a dados passa pela service layer: bloqueia o import direto do Prisma
  // fora da camada server/.
  {
    files: ["src/features/**", "src/app/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@prisma/client",
              message:
                "Acesse dados via service layer em features/*/services, não direto pelo Prisma.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "prisma/migrations/**",
    "storybook-static/**",
  ]),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
