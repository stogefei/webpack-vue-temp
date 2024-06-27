import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import { defineStore, createPinia, PiniaVuePlugin } from 'pinia';
Vue.config.productionTip = false;

// Vue.use(PiniaVuePlugin);

// const pinia = createPinia();
// const useStore = defineStore('main', {  })

// const store = useStore(pinia) // Works, but not without passing pinia

new Vue({
  // pinia,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
