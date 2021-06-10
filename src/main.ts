/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-05-10 10:11:28
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import { store, key } from './store/index';
import ZmSamaUI from './components/index';
import './assets/icons/iconfont';
// import "vite-plugin-svg-icons/register"
import './assets/style/reset.css';

const app = createApp(App);
app.use(store, key);
app.use(router);
app.use(ZmSamaUI);
app.mount('#app');
