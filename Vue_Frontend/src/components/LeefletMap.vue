<template>
  <div id="map"></div>
  <div>
    <input
      v-model="searchQuery"
      @input="onSearchInput"
      placeholder="Search for a city"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import axios from "axios";
const searchQuery = ref();
const mylat = ref(30.3308401);
const mylon = ref(71.247499);
let geocoder = null;
var map = null;
// import { defineProps } from "vue";

// const props = defineProps({
//   childProp: String,
// });
onMounted(() => {
  map = L.map("map");
  map.setView([mylat.value, mylon.value], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);
  L.marker([mylat.value, mylon.value]).addTo(map);
  geocoder = L.Control.geocoder({
    collapsed: false,
    placeholder: "Search for a city",
  })
    .on("markgeocode", function (e) {
      const { center } = e.geocode;
      map.setView(center, 5);
    })
    .addTo(map);
});
function debounce(func, timeout = 2000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
const onSearchInput = debounce(async () => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${searchQuery.value}&format=json`
    );

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      mylat.value = lat;
      mylon.value = lon;
      map.setView([mylat.value, mylon.value], 12);
      L.marker([mylat.value, mylon.value]).addTo(map);
      //   if (Array.isArray(boundingbox) && boundingbox.length === 4) {
      //     const [south, north, west, east] = boundingbox.map(parseFloat);
      //     const bounds = L.latLngBounds([
      //       [south, west],
      //       [north, east],
      //     ]);
      //     geocoder.markGeocode({ center: [lat, lon], bbox: bounds });
      //   } else {
      //     geocoder.markGeocode({ center: [lat, lon] });
      //   }
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
