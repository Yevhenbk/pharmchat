import storybook from "eslint-plugin-storybook";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import stylistic from "@stylistic/eslint-plugin";
import unicorn from "eslint-plugin-unicorn";
import checkFile from "eslint-plugin-check-file";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  ...storybook.configs["flat/recommended"],
  {
    plugins: {
      "@stylistic": stylistic,
      unicorn,
      "check-file": checkFile,
    },
    rules: {
      // Ban let -- use const always
      "no-restricted-syntax": [
        "error",
        {
          selector: "VariableDeclaration[kind='let']",
          message:
            "Use const instead of let. If mutation is needed, extract to a sub-function that returns the value.",
        },
      ],

      // Blank lines around control flow statements
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "*", next: "if" },
        { blankLine: "always", prev: "if", next: "*" },
        { blankLine: "always", prev: "*", next: "for" },
        { blankLine: "always", prev: "for", next: "*" },
        { blankLine: "always", prev: "*", next: "switch" },
        { blankLine: "always", prev: "switch", next: "*" },
        { blankLine: "always", prev: "*", next: "try" },
        { blankLine: "always", prev: "try", next: "*" },
        { blankLine: "always", prev: "*", next: "while" },
        { blankLine: "always", prev: "while", next: "*" },
      ],

      // No abbreviated variable names
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            props: true,
            Props: true,
            ref: true,
            Ref: true,
            params: true,
            args: true,
            env: true,
            Env: true,
            src: true,
            db: true,
            DB: true,
            i18n: true,
            e2e: true,
            id: true,
            ID: true,
            url: true,
            URL: true,
            api: true,
            API: true,
            svg: true,
            SVG: true,
            html: true,
            HTML: true,
            css: true,
            CSS: true,
            dom: true,
            DOM: true,
            json: true,
            JSON: true,
            pdf: true,
            PDF: true,
            cms: true,
            CMS: true,
          },
          checkFilenames: false,
        },
      ],

      // No any
      "@typescript-eslint/no-explicit-any": "error",

      // Enforce import type for type-only imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // Prevent accidental waterfall loops
      "no-await-in-loop": "error",

      // No console.log (allow warn and error)
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Prefer const (built-in)
      "prefer-const": "error",

      // Kebab-case filenames
      "check-file/filename-naming-convention": [
        "error",
        { "**/*.{ts,tsx}": "KEBAB_CASE" },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
]);
