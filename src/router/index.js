import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import User from "../pages/User.vue";
import Edit from "../pages/Edit.vue";
import MyFollow from "../pages/MyFollow.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/user", name: "user", component: User },
    { path: "/edit", name: "edit", component: Edit },
    { path: "/myfollow", name: "myfollow", component: MyFollow },
  ],
});

router.beforeEach((to, from, next) => {
  // console.log(to.path);
  let token = localStorage.getItem("token");
  if (to.path === "/user") {
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
