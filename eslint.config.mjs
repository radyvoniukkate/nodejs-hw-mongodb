import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2021, 
      sourceType: "module",
    },
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["react"],
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
  pluginJs.configs.recommended,
];