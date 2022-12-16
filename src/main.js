import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
Vue.use(element)
    //重构axios实例
axios.defaults.baseURL = 'http://121.41.91.38:8002/api'
Vue.prototype.$http = axios;

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    //添加请求头

    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

Vue.config.productionTip = false

//全局防抖处理
const on = Vue.prototype.$on
Vue.prototype.$on = function(event, func) {
    let timer
    let flag = true
    let newFunc = func
    if (event === 'click') {
        newFunc = function() {
            if (flag) {
                func.apply(this, arguments)
                flag = false
            }
            clearTimeout(timer)
            timer = setTimeout(function() {
                flag = true
            }, 1000)
        }
    }
    on.call(this, event, newFunc)
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')