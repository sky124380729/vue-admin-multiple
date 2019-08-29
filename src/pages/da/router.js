import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/login'

Vue.use(Router)
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL + 'da',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
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
