import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'
import main from '../views/main.vue'
import Judge from '../components/Judge.vue'
import record from '../components/record.vue'
Vue.use(VueRouter)


const router = new VueRouter({
        routes: [{
                path: '/',
                name: 'login',
                component: login
            },
            {
                path: '/main',
                name: 'main',
                component: main,
                children: [{
                    path: '/Judge',
                    component: Judge,
                    name: 'Judge'
                }, {
                    path: '/record',
                    component: record,
                    name: 'record'
                }]
            }
        ]
    })
    //路由守卫
router.beforeEach((to, from, next) => {
    const token = window.sessionStorage.getItem("token");
    if (to.name !== 'login' && !token) next({ name: 'login' })
    else next()
})
export default router