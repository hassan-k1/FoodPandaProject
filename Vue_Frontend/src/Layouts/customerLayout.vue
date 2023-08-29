<script setup>
import { ref } from "vue";
import TheNavBar from "../components/Head.vue";
import TheDrawer from "../components/Drawer.vue";
import TheFooter from "../components/Footers.vue";
import Loading from "../components/LoadingComponent.vue";

let toggle = ref();
let loading = ref(true);

const clicked = (value) => {
  toggle.value = value;
};

setTimeout(() => {
  loading.value = false;
}, 2000);
</script>

<template>
  <q-layout v-if="loading">
    <Loading />
  </q-layout>
  <q-layout view="hHh lpR ffr" class="q-pb-xl" v-else>
    <TheNavBar @toggle-cart="clicked" />
    <TheDrawer :drawer="toggle" @toggle-cart="clicked" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>
