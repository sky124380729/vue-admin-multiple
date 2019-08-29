import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // element css

Vue.config.productionTip = false

Vue.use(Element, {
    size: 'small', //组件的默认尺寸
    zIndex: 2000 // 弹框的初始 z-index
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
