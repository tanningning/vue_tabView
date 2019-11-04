import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "首页",
      component: () => import("./views/Home.vue"),
      children: [
        {
          path: "/daohang1",
          name: "导航1",
          component: () => import("./components/daohang1.vue")
        },
        {
          path: "/daohang2",
          name: "导航2",
          component: () => import("./components/daohang2.vue")
        },
        {
          path: "/daohang3",
          name: "导航3",
          component: () => import("./components/daohang3.vue")
        },
        {
          path: "/daohang4",
          name: "导航4",
          component: () => import("./components/daohang4.vue")
        }
      ]
    }
  ]
});
