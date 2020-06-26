import Vue from "vue";
import App from "./App.vue";
import "./styles/base.less";
import "./assets/iconfont.css";
import "lib-flexible";
import router from "./router";
import axios from "axios";
import { Button, Toast, Switch } from "vant";

Vue.use(Button);
Vue.use(Switch);
Vue.use(Toast);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000";

import HmHeader from "./components/HmHeader.vue";
import HmLogo from "./components/HmLogo.vue";
import HmButton from "./components/HmButton.vue";
import HmInput from "./components/HmInput.vue";

Vue.component("hm-header", HmHeader);
Vue.component("hm-logo", HmLogo);
Vue.component("hm-button", HmButton);
Vue.component("hm-input", HmInput);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
