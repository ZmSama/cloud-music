/*
 * @Description:
 * @Autor: ZmSama
 * @Date: 2021-07-01 16:05:12
 */
import { App } from 'vue';
import Loading from './src/index';
import vLoading from './src/directives';

export default {
  install(app: App) {
    app.directive('loading', vLoading);
    app.config.globalProperties.$loading = Loading;
  },
  directive: vLoading,
  service: Loading,
};
