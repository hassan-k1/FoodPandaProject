<template>
  <q-carousel
    animated
    v-model="slide"
    navigation
    infinite
    :autoplay="autoplay"
    arrows
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
  >
    <q-carousel-slide
      :name="1"
      img-src="https://asia-public.foodpanda.com/marketing/production/sg/images/nl/Banner%201.png?v=1462963465"
    />
    <q-carousel-slide
      :name="2"
      img-src="https://asia-public.foodpanda.com/marketing/production/sg/images/nl/Head%20Banner.png"
    />
  </q-carousel>
  <ProductCard />

  <div class="q-pa-xl q-gutter-sm">
    <h4 class="text-weight-thin">Put us in your pocket</h4>
    <q-banner rounded class="bg-primary text-white q-pa-lg">
      <div class="row">
        <div class="col-lg-6 q-px-md">
          <h5 class="text-weight-bold">
            Download the food and groceries you love
          </h5>
          <p>
            It's all at your fingertips – the restaurants and shops you love.
            Find the right food and groceries to suit your mood, and make the
            first bite last. Go ahead, download us.
          </p>
        </div>
        <div class="col-lg-6 relative-position">
          <div class="absolute flex justify-center" style="top: -100px">
            <img
              src="../assets/newsletter.webp"
              alt="newsletter"
              style="width: 60%"
            />
          </div>
        </div>
      </div>
    </q-banner>
  </div>
</template>

<script setup>
import { useDetailStore } from "../stores/userDetailStore";
import ProductCard from "../components/ProductCards.vue";
import { onMounted, ref } from "vue";
let slide = ref(1);
let autoplay = ref(false);
const store = useDetailStore();

onMounted(() => {
  store.User_get();
});
</script>
