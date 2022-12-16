import { Select, Option, OptionGroup, Input, Tree, Dialog, Row, Col, Button, Message, Form, FormItem } from 'element-ui'
import VueAxios from 'vue-axios'

const element = {
    install: function(Vue) {
        Vue.use(Select)
        Vue.use(Option)
        Vue.use(OptionGroup)
        Vue.use(Input)
        Vue.use(Tree)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Button)
        Vue.component(Message)
            //挂载到Vue全局对象上
        Vue.prototype.$message = Message
        Vue.use(Form)
        Vue.use(FormItem)

    }
}

export default element