<template>
  <div class="container">
    <h2 class="text-weight-thin q-mx-lg q-px-sm">Menu</h2>
    <div class="row">
      <div
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 flex flex justify-center q-mt-md"
        v-for="item in productdata"
      >
        <div v-if="loading">
          <q-card flat bordered style="max-width: 290px">
            <q-skeleton height="170px" width="290px" square />
            <q-card-section>
              <q-skeleton type="text" class="text-subtitle1" />
              <q-skeleton
                type="text"
                width="100%"
                class="text-subtitle1 q-my-lg"
              />
              <q-skeleton type="btn" class="q-my-lg" width="30%" />
            </q-card-section>
          </q-card>
        </div>
        <div v-else>
          <q-card class="my-card">
            <img :src="item.image" style="height: 170px" />
            <q-card-section class="row justify-between">
              <div class="text-subtitle2">{{ item.name }}</div>
              <div class="text-subtitle2">${{ item.price }}</div>
            </q-card-section>

            <q-card-section>
              {{ item.size }}
            </q-card-section>
            <div class="q-pa-md row q-gutter-sm">
              <q-btn
                class="bg-primary text-white"
                label="Add"
                @click="data.addToCart(item)"
              />
              <router-link :to="`/product/${item._id}`">
                <q-btn class="bg-primary text-white" label="View" />
              </router-link>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAddCartStore } from "../stores/AddCartStore";
import { useRoute } from "vue-router";
import axios from "axios";
const data = useAddCartStore();
const route = useRoute();
const productId = ref(route.params.id);

let productdata = ref([]);
let loading = ref(true);

onMounted(async () => {
  const response = await axios.get(
    `http://localhost:4000/api/products/${productId.value}`
  );
  productdata.value = response.data;
});

setTimeout(() => {
  loading.value = false;
}, 3000);
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 290px;
}
</style>
