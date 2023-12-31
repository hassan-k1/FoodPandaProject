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
import Product from "../views/ProductPage.vue";

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
          path: "restaurant/checkin",
          name: "checkin",
          component: checkin,
        },
        {
          path: "restaurant/:id",
          component: Product,
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
  const token = localStorage.getItem("_token");
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next("/SignIn");
    }
  } else {
    if (token) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
