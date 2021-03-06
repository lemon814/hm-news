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
  List,
  Tab,
  Tabs,
  PullRefresh,
  Sticky,
} from "vant";
import moment from "moment";

Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Field);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Uploader);
Vue.use(List);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(PullRefresh);
Vue.use(Sticky);
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.response.use((res) => {
  const { message, statusCode } = res.data;
  if (message === "用户信息验证失败" && statusCode === 401) {
    Toast.fail("token失效");
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    router.push({
      name: "login",
      params: {
        back: true,
      },
    });
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
Vue.filter("date2", (res) => {
  let d = new Date(res);
  let now = new Date();
  let h = (now - d) / 1000 / 60 / 60;
  if (h < 1) {
    return "1小时内";
  } else if (h < 24) {
    return Math.floor(h) + "小时之前";
  } else {
    return moment(res).format("YYYY-MM-DD hh:mm");
  }
});

import HmHeader from "./components/HmHeader.vue";
import HmLogo from "./components/HmLogo.vue";
import HmButton from "./components/HmButton.vue";
import HmInput from "./components/HmInput.vue";
import HmNavbar from "./components/HmNavbar.vue";
import HmPost from "./components/HmPost.vue";
import HmComment from "./components/HmComment.vue";
import HmFloor from "./components/HmFloor.vue";

Vue.component("hm-header", HmHeader);
Vue.component("hm-logo", HmLogo);
Vue.component("hm-button", HmButton);
Vue.component("hm-input", HmInput);
Vue.component("hm-navbar", HmNavbar);
Vue.component("hm-post", HmPost);
Vue.component("hm-comment", HmComment);
Vue.component("hm-floor", HmFloor);

const bus = new Vue();
Vue.prototype.$bus = bus;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
