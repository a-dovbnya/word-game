import { createApp } from 'vue'
import App from './App.vue'
import VueSvgInlinePlugin from "vue-svg-inline-plugin";
import './registerServiceWorker'

const app = createApp(App)
app.use(VueSvgInlinePlugin);

app.mount('#app')
