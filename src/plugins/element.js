import { Aside, Container, Header, Input, Main, Dialog, Row, Col, Button, Message, Form, FormItem, Menu, MenuItem } from 'element-ui'


const element = {
    install: function(Vue) {
        Vue.use(Aside)
        Vue.use(Container)
        Vue.use(Header)
        Vue.use(Input)
        Vue.use(Main)
        Vue.use(Dialog)
        Vue.use(Row)
        Vue.use(Col)
        Vue.use(Button)
        Vue.component(Message)
            //挂载到Vue全局对象上
        Vue.prototype.$message = Message
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Menu)
        Vue.use(MenuItem)
    }
}

export default element