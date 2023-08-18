import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from '@/router/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 注册路由
app.use(ElementPlus)

app.use(router).mount('#app')
