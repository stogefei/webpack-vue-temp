module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      tsx:true
    },
    sourceType: 'module'
  },
  extends: [
    require.resolve('./config/js-standard.js'),
    require.resolve('./config/ts-standard.js'),
    require.resolve('./config/vue-standard.js'),
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      rules: {
        "comma-dangle": ["error", {
          "arrays": "never",
          "objects": "never",
          "imports": "never",
          "exports": "never",
          "functions": "never"
        }]
      },
      env: {
        jest: true,
      },
    },
  ],
  settings: {
    'import/extensions': [
      '.js',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
      '.json',
    ],
  },
  ignorePatterns: ["**/iconfont.js", "**/businessIconFont.js","**/kindeditor-all-min.js","**/prettify.js","**/kindeditor-all.js","**/multiimage.js", "**/worker.host.js"]
};
