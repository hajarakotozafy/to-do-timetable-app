import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import "./main.scss"
import "@fontsource/plus-jakarta-sans"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
