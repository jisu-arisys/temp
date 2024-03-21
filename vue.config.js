// vue3 코드
//configureWebpack가 chainWebpack으로 대체되었으며, 
//webpack.optimize.LimitChunkCountPlugin이 바뀐 구문으로 변경되었습니다. 
//또한 vue-loader의 설정도 변경되었습니다.
const path = require('path');
const webpack = require('webpack');
const {defineConfig} = require('@vue/cli-service')


function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

module.exports = 
  defineConfig({
    lintOnSave: false,
    transpileDependencies: true,
    outputDir: 'dist',
    /* webpack config 옵션 추가 */
    configureWebpack: {
      resolve: {
        alias: {
          src: resolveSrc('src'),
        }
      },
      plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 6
        })
      ]
    },
    pwa: {
      name: 'Vue Light Bootstrap Dashboard',
      themeColor: '#344675',
      msTileColor: '#344675',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: '#344675'
    },
    css: {
      // Enable CSS source maps.
      sourceMap: process.env.NODE_ENV !== 'production'
    },
    chainWebpack: config => {
      //추가
      config.module
        .rule('vue') 
        .use('vue-loader')
        .tap(options => {
          return {
            ...options,
            compilerOptions: {
              compatConfig: {
                MODE: 3,
                FEATURE_ID_A: true
              }
            }
          }
        });
        
      // Optimize webpack build output
      config.plugin('limit-chunk-count').use(require('webpack').LimitChunkCountPlugin, [{ maxChunks: 6 }]);
    }
  })