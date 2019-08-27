import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL + 'oa',
    routes: [
        {
            path: '/',
            name: 'Test',
            component: Main,
            children: [
                {
                    path: 'x',
                    component: () => import('./views/Test.vue')
                }
            ]
        }
    ]
})
