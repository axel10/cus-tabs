module.exports = {
  presets: [
    ["@babel/preset-typescript",{jsxPragma:'react-native'}],
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        jsx: {
          injectH: false
        }
      }
    ],
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'entry',
        'corejs': '2',
        "targets": "> 0.25%, not dead"
      }
    ],
    '@vue/babel-preset-jsx'
  ],
  "plugins":[
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ]
};


