<template>
  <div id="map"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import L from "leaflet";
import { useCheckInStore } from "../stores/CheckInStore";
const data = useCheckInStore();
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import axios from "axios";
const mylat = ref(30.3308401);
const mylon = ref(71.247499);
let geocoder = null;
var map = null;
var redIcon = null;

redIcon = new L.Icon({
  iconUrl:
    "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|e85141&chf=a,s,ee00FFFF",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [50, 50],
});
onMounted(() => {
  map = L.map("map");
  map.setView([mylat.value, mylon.value], 5);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

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

const fetchData = debounce(async () => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${data.selectCountry}&format=json`
    );

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      mylat.value = lat;
      mylon.value = lon;
      map.setView([mylat.value, mylon.value], 5);
      L.marker([mylat.value, mylon.value], {
        icon: redIcon,
      }).addTo(map);
      L.circle([lat, lon], {
        color: "blue",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);
    }
  } catch (error) {
    console.error(error);
  }
});

watchEffect(() => {
  fetchData();
});
</script>

<style scoped>
#map {
  height: 100%;
}
</style>
