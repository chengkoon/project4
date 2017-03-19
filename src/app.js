import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes';

Vue.use(VueRouter);

export const eventBus = new Vue();

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app-container',
  router,
  render: h => h(App)
});
