<template>
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
import ProductCard from "../components/ProductCards.vue";
</script>
