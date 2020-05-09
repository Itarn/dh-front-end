const config = require('./src/config')
const path = require('path')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const prependData = `
  @import '~@/assets/css/_var.scss';\n
`

module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData
      }
    }
  },
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      '^/admin/': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        ws: false
      }
    }
  },
  chainWebpack: config => {
    config
    config.resolve.alias
      .set('gkSrc', resolve('node_modules/@geekbang/geek.ui/src'))
      .set('gkui', resolve('node_modules/@geekbang/geek.ui/components/src'))

      .set('b', resolve('./src/components/base'))
      .set('e', resolve('./src/components/editor'))
      .set('m', resolve('./src/components/modules'))
  }
}