module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    "standard",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: [
    "import",
    "sort-destructure-keys",
    "sort-keys-fix",
    "typescript-sort-keys",
  ],
  rules: {
    "import/no-default-export": 2,
    "no-restricted-syntax": [
      2,
      {
        selector: "TSEnumDeclaration",
        message:
          "Do not use `enum`. Use `Plain Object` or `Literal Types` instead.",
      },
    ],
    "prefer-template": 2,
    "require-await": 0,
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-keys-fix/sort-keys-fix": 2,
    "typescript-sort-keys/interface": 2,
    "typescript-sort-keys/string-enum": 2,
    yoda: [2, "never", { onlyEquality: true }],

    "@typescript-eslint/consistent-type-definitions": [2, "type"],
    "@typescript-eslint/naming-convention": [
      2,
      {
        // "type" naming should be PascalCase
        custom: {
          match: false,
          regex: "send|start|find",
        },
        format: ["PascalCase"],
        selector: "typeAlias",
      },
    ],
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-misused-promises": 2,
    "@typescript-eslint/prefer-readonly": 2,
    "@typescript-eslint/require-await": 2,
  },
}
