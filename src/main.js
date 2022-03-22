import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import App from "./App.vue";
import router from './router/index'

const app = createApp(App).use(router).use(router);
app.use(ElementPlus);
app.use(router);
app.mount("#app");
