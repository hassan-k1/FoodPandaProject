import { createRouter, createWebHistory } from "vue-router";
import customer from "../Layouts/customerLayout.vue";
import Home from "../views/HomePage.vue";
import checkin from "../views/CheckInPage.vue";
import ProductDetail from "../views/ProductDetailPage.vue";
import SignUpPage from "../views/SignUpPage.vue";
import SignInPage from "../views/SignInPage.vue";
import EmailVerify from "../views/VerifyemailPage.vue";
import OtpVerify from "../views/OtpVerifyPage.vue";
import ChangePass from "../views/ChangePaswordPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/SignUp",
      name: "signup",
      component: SignUpPage,
    },
    {
      path: "/SignIn",
      name: "signin",
      component: SignInPage,
    },
    {
      path: "/email-verify",
      name: "emailPage",
      component: EmailVerify,
    },
    {
      path: "/Otp-verify",
      name: "OtpPage",
      component: OtpVerify,
    },
    {
      path: "/Change-password",
      name: "ChangePasswordPage",
      component: ChangePass,
    },
    {
      path: "/",
      name: "customer",
      component: customer,
      redirect: Home,
      meta: { requiresAuth: true },

      children: [
        {
          path: "/",
          name: "Home",
          component: Home,
        },
        {
          path: "checkin",
          name: "checkin",
          component: checkin,
        },
        {
          path: "product/:id",
          name: "product",
          component: ProductDetail,
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // const noAuthRoutes = ["signin", "signup"];
  const token = localStorage.getItem("_token");
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next("/SignIn");
    }
  } else {
    if (token) {
      // if (noAuthRoutes.includes(to.name)) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
