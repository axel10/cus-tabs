import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './components/vue-cus-tabs/index.less';
import { installCusTabs } from '@/components/vue-cus-tabs';

Vue.config.productionTip = false;
Vue.use(installCusTabs);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


// todo 组件命名规范
// todo 测试
// todo 发布
