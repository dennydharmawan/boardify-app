/** @type {import('prettier').Config} */
module.exports = {
  bracketSpacing: true,
  printWidth: 110,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',

  // settings for @ianvs/prettier-plugin-sort-imports
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@([a-zA-Z-]+)/(.*)$',
    '',
    '^@/(.*)$',
    '',
    '^[./]'
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',

  // list all your plugins and put prettier-plugin-tailwindcss last
  // https://github.com/tailwindlabs/prettier-plugin-tailwindcss
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'twMerge', 'cn', 'cva', 'tw']
};
