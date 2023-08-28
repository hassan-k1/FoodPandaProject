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
      img-src="https://fab.ph/wp-content/uploads/2021/05/fp2.jpg"
    />
    <q-carousel-slide
      :name="2"
      img-src="https://careers.foodpanda.com/wp-content/uploads/2020/03/APAC_Recruitment-Marketing_Recrutiter_LinkedIn-Cover_FGD-22219_v05UN_Pink.png"
    />
  </q-carousel>
  <!-- <div class="row">
    <div
      class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 flex items-center"
    >
      <div class="text-h4 text-weight-bolder text-secondary q-ml-xl">
        It's the food and groceries you love, <br />
        delivered
      </div>
    </div>
    <div
      class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 "
    >
      <img
        src="https://images.deliveryhero.io/image/foodpanda/homepage/refresh-hero-home-pk.png?width=1264"
        alt="image"
        width="100%"
      />
    </div>
  </div> -->
  <RestaurantsCard />

  <div class="q-pa-xl q-gutter-sm">
    <h4 class="text-weight-thin">Put us in your pocket</h4>
    <q-banner rounded class="bg-primary text-white q-pa-lg">
      <div class="row">
        <div class="col-lg-6 col-md-12 col-sm-12 q-px-md">
          <h5 class="text-weight-bold">
            Download the food and groceries you love
          </h5>
          <p>
            It's all at your fingertips – the restaurants and shops you love.
            Find the right food and groceries to suit your mood, and make the
            first bite last. Go ahead, download us.
          </p>
        </div>
        <div class="col-lg-6 col-md-12 col-sm-12 relative-position">
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
import RestaurantsCard from "../components/RestaurantCards.vue";
import { onMounted, ref } from "vue";
let slide = ref(1);
let autoplay = ref(false);
const store = useDetailStore();

onMounted(() => {
  store.User_get();
});
</script>
