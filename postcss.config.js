const postcssPresetEnv = require('postcss-preset-env')
const postcssImport = require('postcss-import')
const postcssUrl = require('postcss-url')

module.exports = {
  plugins: [
    require('autoprefixer'),
    postcssImport(),
    postcssUrl(),
    postcssPresetEnv({
      stage: 1
    })
  ]
}
