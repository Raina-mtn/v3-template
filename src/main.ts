import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue' 

const app = createApp(App)
// 注册路由
app.use(ElementPlus)
// 注册全局组件
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(router).mount('#app')
