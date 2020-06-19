module.exports = {
  "presets": [
    "@babel/env",
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ],
    [
      "babel-plugin-transform-imports"
    ],
    "@babel/plugin-proposal-class-properties"
  ]
}
