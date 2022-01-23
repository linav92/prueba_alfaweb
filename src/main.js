import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueSweetalert2);
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.config.productionTip = false;

const app = new Vue({
  data: {
    loading: true
  },
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

router.afterEach(() => {
  setTimeout(() => {
    app.loading = false;
  }, 1500);
});