const path = require('path');

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      console.log('Production Mode');
    }
    else {
      console.log('Development Mode');
    }
  },

  css: {
    loaderOptions: {
      sass: {
        includePaths: [
          path.resolve(__dirname, './node_modules/compass-mixins/lib'),
          path.resolve(__dirname, './src/assets/scss')
        ],
        data: `
          @import "@/assets/scss/global.scss";
        `
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, "./src/assets/scss/global.scss")]
    }
  },

  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined
};
