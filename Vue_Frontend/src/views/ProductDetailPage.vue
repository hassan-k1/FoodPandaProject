<template>
  <div class="checkContainer q-mt-xl">
    <div class="row items-center">
      <div class="col-lg-6">
        <img :src="data.specific.image" style="width: 80%" />
      </div>
      <div class="col-lg-6 q-px-xl">
        <h6>{{ data.specific.name }}</h6>
        <h6>${{ data.specific.price }}</h6>
        <p>{{ data.specific.size }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useAddCartStore } from "../stores/AddCartStore";
const data = useAddCartStore();
</script>
<style scoped>
.checkContainer {
  box-shadow: 2px 2px 4px 4px #d8d8d8;
  width: 70%;
  height: 50%;
  margin: auto;
  margin-top: 50px;
}
</style>
