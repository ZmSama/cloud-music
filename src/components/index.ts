/*
 * @Description:公共组件
 * @Autor: ZmSama
 * @Date: 2021-05-17 14:32:13
 */
import type { App } from 'vue';
import SvgIcon from './SvgIcon/index.vue';
import InputSelect from './InputSelect/index.vue';
import CollapseTransition from './collapseTransition/index.vue';
import Menu from './Menu/index.vue';
import MenuItem from './MenuItem/index.vue';
import MenuGroup from './MenuGroup/index.vue';
import Tabs from './Tabs/index.vue';
import tabPane from './Tabs/tab-pane.vue';
import Swiper from './Swiper/Swiper.vue';
import Slider from './Swiper/Slider.vue';
import ZmButton from './button/ZmButton.vue';
import DrawerTransition from './drawerTransition/index.vue';
import Drawer from './drawer/index.vue';
import ZmInput from './input/index.vue';
import ZmRadio from './radio/zm-radio.vue';
import ZmRadioGroup from './radio/zm-radio-group.vue';
import ZmSelect from './select/index.vue';
import ZmUpload from './upload/index.vue';
import ZmPopperButton from './popper_button/index.vue';
import ZmPagination from './pagination/index.vue';
import ZmLoading from './loading/index';
import ZmTable from './table/index.vue';
import ZmTableColumn from './table/table-column/index';
const ZmSamaUI = {
  install: (app: App, options?: any) => {},
};

const COMPONENTS = [
  SvgIcon,
  InputSelect,
  CollapseTransition,
  Menu,
  MenuItem,
  MenuGroup,
  Tabs,
  tabPane,
  Swiper,
  Slider,
  ZmButton,
  DrawerTransition,
  Drawer,
  ZmInput,
  ZmRadio,
  ZmRadioGroup,
  ZmSelect,
  ZmUpload,
  ZmPopperButton,
  ZmPagination,
  ZmTable,
  ZmTableColumn,
];

const plugins = [ZmLoading];
ZmSamaUI.install = function (app: App, options) {
  // 如果传入配置就使用配置
  if (options && options.components) {
    const components = options.components;
    components.forEach((item: any) => {
      COMPONENTS.forEach(component => {
        if (component.name == item) {
          app.component(component.name, component);
        }
      });
    });
    // 否则全局注册
  } else {
    COMPONENTS.forEach(component => {
      app.component(component.name, component);
    });

    plugins.forEach(plugin => {
      app.use(plugin);
    });
  }
};

export { ZmLoading };
export default ZmSamaUI;
