<script setup>
import { ref } from "vue";
import TheNavBar from "../components/Head.vue";
import TheDrawer from "../components/Drawer.vue";
import TheFooter from "../components/Footers.vue";

let toggle = ref();
const clicked = (value) => {
  toggle.value = value;
};
</script>

<template>
  <q-layout view="hHh lpR ffr" class="q-pb-xl">
    <TheNavBar @toggle-cart="clicked" />
    <TheDrawer :drawer="toggle" @toggle-cart="clicked" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <TheFooter />
  </q-layout>
</template>
