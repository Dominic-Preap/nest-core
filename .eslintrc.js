// https://code.visualstudio.com/api/advanced-topics/tslint-eslint-migration
// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/ROADMAP.md
// https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project
// https://stackoverflow.com/questions/60698487/catch-22-with-parseroptions-and-exclude

module.exports = {
  root: true,
  env: { node: true },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  parserOptions: {
    extraFileExtensions: ['.json', '.pug'],
    project: 'tsconfig.json',
    sourceType: 'module', // Allows for the use of imports
    ecmaVersion: 2018 // Allows for the parsing of modern ECMAScript features
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:import/errors',
    'plugin:import/typescript',
    'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],

  },
  settings: {
    'import/internal-regex': '^@api|@common|@dynamodb|@entities|@lib|@models|@queries|@repositories|@schemas|@x/'
  }
};
