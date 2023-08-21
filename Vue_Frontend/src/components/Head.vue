<template>
  <q-header elevated class="bg-white text-primary" height-hint="98">
    <q-toolbar>
      <q-toolbar-title>
        <router-link to="/" class="logoLink text-primary">
          <q-avatar>
            <img src="../assets/foodpandalogo.png" />
          </q-avatar>
          Foodpanda
        </router-link>
      </q-toolbar-title>
      <q-avatar class="cursor-pointer" v-if="user.userdata.name != null">
        <img src="https://cdn.quasar.dev/img/avatar.png" style="height: 33px" />
        <q-menu transition-show="scale" transition-hide="scale">
          <q-list style="width: 225px">
            <q-item clickable>
              <img
                src="https://cdn.quasar.dev/img/avatar.png"
                style="height: 33px; border-radius: 14px"
              />
              <div class="column">
                <q-item-section class="q-pl-sm text-weight-bold text-primary">
                  {{ user.userdata.name }}
                </q-item-section>
                <q-item-section
                  class="text-weight-light text-primary"
                  style="font-size: 13px"
                >
                  {{ user.userdata.email }}
                </q-item-section>
              </div>
            </q-item>
            <q-separator />
            <q-item clickable class="text-primary">
              <q-icon name="person" size="1.5em" class="icon-gap" />
              <span class="text-gap">Account</span>
            </q-item>
            <q-item clickable class="text-primary">
              <q-icon name="verified_user" size="1.5em" class="icon-gap" />
              <span class="text-gap">Verify</span>
            </q-item>
            <q-item clickable class="text-primary">
              <q-icon name="person" size="1.5em" class="icon-gap" />
              <span class="text-gap">FAQs</span>
            </q-item>
            <q-item clickable @click="logOut" class="text-primary">
              <q-icon name="logout" size="1.5em" class="icon-gap" />
              <span class="text-gap">Sign Out</span>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar>
      <!-- <q-avatar class="cursor-pointer" v-else>
        <img src="/userprofile2.png" style="height: 33px" alt="image" />
        <q-menu transition-show="scale" transition-hide="scale">
          <q-list style="width: 170px">
            <q-item clickable @click="SignIn">
              <q-item-section class="text-primary">Sign In</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-avatar> -->
      <q-btn
        flat
        text-primary
        round
        icon="local_grocery_store"
        class="q-ml-md"
        @click="clickbtn"
      >
        <div class="q-mb-lg">
          {{ data.cartItems.length >= 1 ? data.countCartItems : null }}
        </div>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import Cookies from "js-cookie";
import { useAddCartStore } from "../stores/AddCartStore";
import { useDetailStore } from "../stores/userDetailStore";
import router from "../router";
const emits = defineEmits(["toggleCart"]);
const data = useAddCartStore();
const user = useDetailStore();

const clickbtn = () => {
  emits("toggleCart", true);
};
const logOut = () => {
  Cookies.remove("user");
  localStorage.removeItem("_token");
  router.push({ name: "signin" });
};
</script>

<style scoped>
.logoLink {
  text-decoration: none;
}
.icon-gap {
  margin-right: 0.2em;
}

.text-gap {
  margin-left: 0.2em;
}
</style>
