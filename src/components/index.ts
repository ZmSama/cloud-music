/*
 * @Description:公共组件
 * @Autor: ZmSama
 * @Date: 2021-05-17 14:32:13
 */

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

const ZmSamaUI = {
  install: (Vue: any, options?: any) => {},
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
];

ZmSamaUI.install = function (Vue, options) {
  // 如果传入配置就使用配置
  if (options && options.components) {
    const components = options.components;
    components.forEach((item: any) => {
      COMPONENTS.forEach(component => {
        if (component.name == item) {
          Vue.component(component.name, component);
        }
      });
    });
    // 否则全局注册
  } else {
    COMPONENTS.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};

export default ZmSamaUI;
