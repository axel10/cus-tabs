import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import CusTabs from '@/components/cus-tabs';

import './components/cus-tabs/style.less'

Vue.config.productionTip = false;
Vue.use(CusTabs);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');


// todo 组件命名规范
// todo 测试
// todo 发布
