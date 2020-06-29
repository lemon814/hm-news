import Vue from "vue";
import App from "./App.vue";
import "./styles/base.less";
import "./assets/iconfont.css";
import "lib-flexible";
import router from "./router";
import axios from "axios";
import {
  Button,
  Toast,
  Switch,
  Dialog,
  Field,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Uploader,
} from "vant";
import moment from "moment";

Vue.use(Button);
Vue.use(Switch);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.response.use((res) => {
  const { message, statusCode } = res.data;
  if (message === "用户信息验证失败" && statusCode === 401) {
    Toast.fail("token失效");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    router.push("/login");
  }
  return res;
});
axios.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

Vue.filter("date", (res, format = "YYYY-MM-DD") => {
  return moment(res).format(format);
});

import HmHeader from "./components/HmHeader.vue";
import HmLogo from "./components/HmLogo.vue";
import HmButton from "./components/HmButton.vue";
import HmInput from "./components/HmInput.vue";
import HmNavbar from "./components/HmNavbar.vue";

Vue.component("hm-header", HmHeader);
Vue.component("hm-logo", HmLogo);
Vue.component("hm-button", HmButton);
Vue.component("hm-input", HmInput);
Vue.component("hm-navbar", HmNavbar);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
