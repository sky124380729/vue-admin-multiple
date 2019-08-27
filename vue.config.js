const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
let appName = process.argv
    .slice(0)
    .reverse()[0]
    .replace('--', '')

const commonConfig = {
    css: {
        loaderOptions: {
            // 向所有 Sass 样式传入共享的全局变量
            sass: {
                // data: `@import "~@/styles/_variables.scss";`
            }
        }
    },
    lintOnSave: true, // 为error会导致编译失败
    chainWebpack: config => {
        config.resolve.alias
            .set('pages', resolve('src/pages'))
            .set('static', resolve('src/static'))
            .set('imgs', resolve('src/assets/imgs'))
            .set('styles', resolve('src/styles'))
    }
}

const isDeveloping = process.env.NODE_ENV === 'development'
if (isDeveloping) {
    console.log('开发！！！！')
    module.exports = {
        ...commonConfig,
        pages: {
            home: {
                entry: './src/pages/home/main.js',
                chunks: ['chunk-vendors', 'chunk-common', 'home']
            },
            oa: {
                entry: './src/pages/oa/main.js',
                chunks: ['chunk-vendors', 'chunk-common', 'oa']
            }
        },
        devServer: {
            hot: true,
            open: true,
            allowedHosts: ['*'], // 解决ie浏览器websocket跨域问题
            inline: true,
            stats: {
                colors: true
            },
            // index: 'oa.html',
            proxy: {
                '/api': {
                    changeOrigin: true,
                    // 目标服务器地址
                    target: 'http://cfm.cloudkeeper.cn'
                }
            }
        }
    }
} else {
    console.log('生产！！！！')
    module.exports = {
        ...commonConfig,
        pages: {
            index: {
                entry: './src/pages/index/main.js',
                chunks: ['chunk-vendors', 'chunk-common', 'index']
            }
        },
        outputDir: 'dist/' + appName,
        // 生产环境不生成.map文件
        productionSourceMap: false
    }
}
