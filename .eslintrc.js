module.exports = {
  extends: [
    'react-app',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:ramda/recommended',
    'plugin:jest/recommended',
    'prettier', // disable the conflict style rules
    'prettier/react', // disable the conflict style rules from React
    'prettier/@typescript-eslint', // disable the conflict style rules from TS
    'plugin:prettier/recommended', // set style rules
  ],
  plugins: ['prettier', 'jest', 'ramda'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  env: {
    es6: true,
    browser: true,
    'jest/globals': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      // Same as the "module-resolver" config in .babelrc
      'babel-module': {
        root: ['./src'],
        alias: {
          '^@/(.+)': './src/\\1',
        },
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    // The "markers" is for the "///" comment in d.ts
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    '@typescript-eslint/explicit-member-accessibility': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'react/sort-comp': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.tsx'],
      },
    ],
    'jsx-a11y/label-has-for': 'warn',
    'import/extensions': [
      'error',
      { js: 'never', jsx: 'never', ts: 'never', tsx: 'never', json: 'always' },
    ],
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/triple-slash-reference': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.{js,jsx,ts,tsx}', '**/*.{spec,test}.{js,jsx,ts,tsx}'],
      rules: {
        'no-console': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/reducer.ts', 'src/utils/api/index.ts'],
      rules: {
        'no-param-reassign': [
          'off',
          { props: true, ignorePropertyModificationsForRegex: ['^state$'] },
        ],
      },
    },
  ],
};
