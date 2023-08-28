<template>
  <div class="container q-pa-md">
    <h2 class="text-weight-thin q-mx-lg q-px-sm">Restaurants</h2>
    <div class="row">
      <div
        v-if="!restaurants"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 flex flex justify-center q-mt-md"
        v-for="item in 4"
      >
        <q-card flat bordered style="max-width: 290px">
          <q-skeleton height="195px" width="290px" square />
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
      <div
        v-else
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 flex flex justify-center q-mt-md"
        v-for="item in restaurants"
      >
        <q-card class="my-card">
          <img :src="item.image" style="height: 60%" />
          <q-card-section class="">
            <div class="text-h6 text-weight-bolder text-secondary">
              {{ item.name }}
            </div>
          </q-card-section>
          <div class="q-pa-md row q-gutter-sm">
            <router-link :to="`restaurant/${item._id}`">
              <q-btn class="bg-primary text-white" label="View" />
            </router-link>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
let restaurants = ref(null);
// let loading = ref(true);

onMounted(async () => {
  const response = await fetch("http://localhost:4000/api/restaurants");
  const data = await response.json();
  restaurants.value = data;
});

// setTimeout(() => {
//   loading.value = false;
// }, 3000);
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 290px;
}
</style>
