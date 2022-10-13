const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
    "plugin:github/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "turbo",
    "prettier",
    "plugin:prettier/recommended",
  ],
	ignorePatterns: [
    "node_modules",
    "build",
    "dist",
    "public"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./packages/*/tsconfig.json", "./apps/*/tsconfig.json"],
    tsconfigRootDir: path.resolve(__dirname, "../../"),
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
    "github",
    "json-format",
    "promise",
    "import",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "prefer-const": "error",
		eqeqeq: "error",
		"prettier/prettier": "error",
    "lines-between-class-members": "error",
    curly: "error",
    "no-constant-condition": "error",
    "linebreak-style": ["error", "unix"],
    semi: ["error", "always"],
    "func-style": ["error", "expression"],
    "no-extra-semi": "error",
    "default-case": "error",
    "no-async-promise-executor": "error",
    "no-await-in-loop": "error",
    "no-console": "warn",
    "no-misleading-character-class": "error",
    "no-multi-assign": "error",
    "no-multi-str": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-object": "error",
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-obj-calls": "error",
    "no-path-concat": "error",
    "no-return-await": "error",
    "no-script-url": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-tabs": "error",
    "no-template-curly-in-string": "error",
    "no-this-before-super": "error",
    "prefer-numeric-literals": "error",
    "prefer-object-spread": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "symbol-description": "error",
    "import/no-duplicates": ["error", { considerQueryString: true }],
    "no-unreachable-loop": "error",
    "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-base-to-string": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/sort-type-union-intersection-members": "error",
    "@typescript-eslint/switch-exhaustiveness-check": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/unified-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/ban-types": "error",
    "@typescript-eslint/brace-style": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/dot-notation": "error",
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/default-param-last": "error",
    "arrow-body-style": ["error", "as-needed"],
    "filenames/match-regex": 0,
    "github/no-then": 0,
    "eslint-comments/no-use": 0,
    "import/default": "error",
    // "import/extensions": ["error", "ignorePackages"], ONLY ESM
    "i18n-text/no-en": 0,
  },
};
