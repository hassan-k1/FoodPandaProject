<template>
  <div class="checkContainer q-mt-xl" style="height: 300px">
    <div class="row items-center" v-if="loading">
      <div class="col-lg-6">
        <q-skeleton type="image" width="80%" height="300px" />
      </div>
      <div class="col-lg-6 q-px-xl">
        <h6><q-skeleton type="text" width="20%" /></h6>
        <h6><q-skeleton type="text" width="20%" /></h6>
        <p><q-skeleton type="text" width="65%" /></p>
      </div>
    </div>
    <div class="row items-center" v-else>
      <div class="col-lg-6">
        <img :src="specificProduct.data.image" style="width: 80%" />
      </div>
      <div class="col-lg-6 q-px-xl">
        <h6>{{ specificProduct.data.name }}</h6>
        <h6>${{ specificProduct.data.price }}</h6>
        <p>{{ specificProduct.data.size }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const route = useRoute();
const productId = ref(route.params.id);
let loading = ref(true);
const specificProduct = ref();
onMounted(async () => {
  try {
    const res = await axios.post("http://localhost:4000/api/specific_product", {
      id: productId.value,
    });
    if (res.status === 201) {
      specificProduct.value = res.data;
    } else {
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});
setTimeout(() => {
  loading.value = false;
}, 2000);
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
