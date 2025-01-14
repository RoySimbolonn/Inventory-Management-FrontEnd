import { createRouter, createWebHistory } from "vue-router";

import AdminView from "../views/AdminView.vue";
import UserView from "../views/UserView.vue";
import HomeView from "../views/HomeView.vue";
import Login from "@/components/auth/LoginView.vue";
import Register from "@/components/auth/RegisterView.vue";
import { useAuthStore } from "@/store/authStore";

const routes = [

  {

    path: "/",

    name: "home",

    component: HomeView,

    meta: { hideHeader: true, hideSidebar: true },

    children: [
      {
        path: "login",
        name: "login",
        component: Login,

      },

      {

        path: "register",

        name: "register",

        component: Register,

      },

    ],

  },

  {

    path: "/admin/:component?",

    name: "admin",

    component: AdminView,

    props: true,

    meta: { requiresAuth: true, role: "ADMIN" },

  },

  {

    path: "/user/:component?",

    name: "user",

    component: UserView,

    props: true,

    meta: { requiresAuth: true, role: "USER" },

  },

];

const router = createRouter({

  history: createWebHistory(process.env.BASE_URL),

  routes,

});

router.beforeEach((to, from, next) => {

  const isAuthenticated = Boolean(localStorage.getItem("auth"));

  const userRole = localStorage.getItem("role");

  if (to.meta.requiresAuth && !isAuthenticated) {

    alert("You need to log in to access this page.");

    next({ name: "login" });

  } else if (

    to.meta.requiresAuth &&

    isAuthenticated &&

    to.meta.role !== userRole

  ) {

    alert("You do not have permission to access this page.");

    next(false);

  } else {

    next();

  }

});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // Gunakan getter isAuthenticated dari store
  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.role;

  if (to.meta.requiresAuth && !isAuthenticated) {
    alert("You need to log in to access this page.");
    next({ name: "login" });
  } else if (
    to.meta.requiresAuth &&
    isAuthenticated &&
    to.meta.role !== userRole
  ) {
    alert("You do not have permission to access this page.");
    next(false);
  } else {
    next();
  }
});


export default router;