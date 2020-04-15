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
    port: 2000
  }
}