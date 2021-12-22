import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/iconfont/iconfont.css';
import './assets/css/index.less';
import 'normalize.css';
import App from './App.vue';
import setupRouter from './router/index';

const app = createApp(App);

app.use(ElementPlus);

setupRouter(app);

app.mount('#app');
