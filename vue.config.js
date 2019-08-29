const path = require('path')
const fs = require('fs')
function resolve(dir) {
    return path.join(__dirname, dir)
}
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
        // 公共资源提取，
        // vendors提取的是第三方公共库(满足提取规则的node_modules里面的且页面引入的)，这些文件会打到dist/js/chunk-vendors.js里面
        // 提取规则是每个页面都引入的才会打到chunk-vendors.js里面(如vue.js)
        // 控制条件是minChunks字段，所以该字段的值是当前activity/src/projects里面的html的个数
        // common提取的应该是除了vendors提取后，剩余的满足条件的公共静态模块
        // 我们的项目不需要common，所以将common置为{}，覆盖默认common配置
        // config.optimization.splitChunks({
        //     cacheGroups: {
        //         vendors: {
        //             name: 'chunk-vendors',
        //             minChunks: 4,
        //             test: /node_modules/,
        //             priority: -10,
        //             chunks: 'initial'
        //         },
        //         common: {}
        //     }
        // })
    }
}

const isDeveloping = process.env.NODE_ENV === 'development'
if (isDeveloping) {
    const pages = fs.readdirSync('./src/pages').reduce((obj, page) => {
        obj[page] = {
            entry: `./src/pages/${page}/main.js`,
            chunks: ['chunk-vendors', 'chunk-common', page]
            // template: page === 'login' ? 'public/login.html' : 'public'
        }
        return obj
    }, {})
    module.exports = {
        ...commonConfig,
        pages,
        devServer: {
            hot: true,
            open: true,
            allowedHosts: ['*'], // 解决ie浏览器websocket跨域问题
            inline: true,
            // contentBase: path.join(__dirname, 'public/index.html'), //告诉服务器从哪里提供内容，默认是public
            stats: {
                colors: true
            },
            // index: 'login.html',
            proxy: {
                '/api': {
                    changeOrigin: true,
                    // 目标服务器地址
                    target: 'http://cfm.cloudkeeper.cn'
                }
            },
            setup(app) {
                app.get('/', function(req, res) {})
            },
            openPage: 'oa/login'
        }
    }
} else {
    const app = process.argv.reverse()[0].replace('--', '')
    module.exports = {
        ...commonConfig,
        pages: {
            index: {
                entry: './src/pages/' + app + '/main.js',
                chunks: ['chunk-vendors', 'chunk-common', 'index']
            }
        },
        outputDir: 'dist/' + app,
        // 生产环境不生成.map文件
        productionSourceMap: false
    }
}
