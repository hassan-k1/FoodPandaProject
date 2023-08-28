<template>
  <div class="q-px-md checkContainer">
    <h5 class="text-center text-primary text-weight-bold">Order Detail Page</h5>
    <div class="row">
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-form>
          <q-input
            type="number"
            v-model="data.Phone"
            label="Phone"
            autocomplete="off"
          />

          <q-select
            v-model="data.selectCountry"
            :options="country"
            behavior="dialog"
            label="Country"
            @update:model-value="data.handleChange(data.selectCountry)"
          />
          <q-select
            v-model="data.selectedState"
            :options="state"
            behavior="dialog"
            label="State"
            @update:model-value="data.handleChangeState()"
          />
          <q-select
            v-model="data.selectedCity"
            :options="city"
            behavior="dialog"
            label="City"
          />

          <q-input
            type="text"
            label="Adress"
            v-model="data.Adress"
            autocomplete="off"
          />

          <q-btn
            @click="sendDetails"
            class="bg-primary text-white q-mt-xl"
            label="Order Now"
          />
        </q-form>
      </div>
      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <!-- <q-card class="q-mx-sm">
          <div class="text-center">
            <h5 class="mb-0 text-white bg-primary rounded-borders">Summary</h5>
          </div>
          <div class="row">
            <div
              class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center text-bold"
            >
              <p>Products</p>
            </div>
            <div
              class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"
            >
              <p>
                {{ Total.cartItems.length }}
              </p>
            </div>
          </div>
          <div class="row">
            <div
              class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center text-bold"
            >
              <p>Shipping</p>
            </div>
            <div
              class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"
            >
              <p>
                ${{
                  Total.cartItems.reduce(
                    (acc, item) => (acc += item.price * item.quantity * 0.05),
                    0
                  )
                }}
              </p>
            </div>
          </div>
          <div class="row">
            <div
              class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center text-bold"
            >
              <p>Total amount</p>
              <span class="text-weight-thin">(including VAT)</span>
            </div>
            <div
              class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center"
            >
              <p>
                ${{
                  Total.cartItems.reduce(
                    (acc, item) =>
                      (acc +=
                        item.price * item.quantity +
                        item.price * item.quantity * 0.05),
                    0
                  )
                }}
              </p>
            </div>
          </div>
        </q-card> -->

        <div style="width: 100%; height: 70%">
          <LeefletMap />
        </div>
        <!-- <img
          src="../assets/foodpandagif.gif"
          alt="image"
          style="width: 50%; margin-left: 25%"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAddCartStore } from "../stores/AddCartStore";
import axios from "axios";
import { ref } from "vue";
const Total = useAddCartStore();
// =====================================
import { useCheckInStore } from "../stores/CheckInStore";
import { useDetailStore } from "../stores/userDetailStore";
const user = useDetailStore();
const data = useCheckInStore();
const $q = useQuasar();
//=======================================
import LeefletMap from "../components/LeefletMap.vue";

data.country_is();
const country = data.countrydata;
const state = data.statedata;
const city = data.citydata;
// const onSearchInput = ref();

const sendDetails = async () => {
  const orderData = {
    email: user.userdata.email,
    country: data.selectCountry,
    state: data.selectedState,
    city: data.selectedCity,
    address: data.Adress,
    Phone: data.Phone,
    total: Total.Total,
    products: Total.getCartItems,
  };
  const token = localStorage.getItem("_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`,
  };
  try {
    const response = await axios.post(
      "http://localhost:4000/api/createOrder",
      orderData,
      { headers }
    );
    if (response.status === 201) {
      console.log("sub theek hai");
      $q.notify({
        type: "positive",
        message: "Order submit!",
      });
      window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
<style scoped>
.checkContainer {
  box-shadow: 2px 2px 4px 4px #d8d8d8;
  width: 70%;
  height: 50%;
  margin: auto;
}
</style>
