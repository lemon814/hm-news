import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import User from "../pages/User.vue";
import Edit from "../pages/Edit.vue";
import MyFollow from "../pages/MyFollow.vue";
import MyComments from "../pages/MyComments.vue";
import MyStar from "../pages/MyStar.vue";
import Home from "../pages/Home.vue";
import Detail from "../pages/Detail.vue";
import TabsEdit from "../pages/TabsEdit.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/user",
      name: "user",
      component: User,
    },
    {
      path: "/edit",
      name: "edit",
      component: Edit,
    },
    {
      path: "/myfollow",
      name: "myfollow",
      component: MyFollow,
    },
    {
      path: "/mycomments",
      name: "mycomments",
      component: MyComments,
    },
    {
      path: "/mystar",
      name: "mystar",
      component: MyStar,
    },
    {
      path: "/home",
      name: "home",
      component: Home,
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: Detail,
    },
    {
      path: "/tabsedit",
      name: "tabsedit",
      component: TabsEdit,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // console.log(to.path);
  let token = localStorage.getItem("token");

  let authUrlArr = ["/user", "/edit", "/myfollow", "/mycomments", "/mystar"];
  if (authUrlArr.includes(to.path)) {
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
