import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import { router } from '@/router'
import 'element-plus/dist/index.css'
import '@/styles/global.less'

async function bootstrap(): Promise<void> {
  const app = createApp(App)

  // 全局注册组件
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  app.use(createPinia()).use(router).use(ElementPlus).mount('#app')
}

bootstrap().then(() => {
  console.log('服务启动完毕')
})
