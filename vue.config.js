const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Word Game',
    themeColor: '#0097A7',
    assetsVersion: '0.0.1'
  }
})
