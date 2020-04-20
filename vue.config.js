module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/main.scss";`
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
  }
}