<template>
  <q-drawer
    v-model="toggle"
    :width="380"
    :breakpoint="1920"
    overlay
    side="right"
    bordered
    elevated
    class="bg-white elevated"
  >
    <div class="q-mt-sm q-ml-sm" @click="closeDrawer()">
      <q-icon name="close" size="25px" class="text-primary" />
    </div>
    <h5 class="text-primary flex justify-center">Shopping Cart</h5>
    <div v-if="data.cartItems.length >= 1">
      <q-scroll-area style="height: 240px">
        <q-card flat bordered class="q-mx-sm">
          <div class="row q-gutter-sm">
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <p class="text-bold">Image</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <p class="text-bold">Name</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <p class="text-bold">Quantity</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <p class="text-bold">Price</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <p class="text-bold">Bin</p>
            </div>
          </div>

          <div
            class="row q-gutter-sm q-mb-sm"
            v-for="item in data.getCartItems"
            :key="item.id"
          >
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <img
                :src="item.image"
                class="rounded"
                width="35"
                height="35"
                :alt="item.name"
              />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <p>{{ item.name }}</p>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <q-icon name="remove" @click="data.decrementQ(item)" />
              <span class="q-px-sm">
                {{ item.quantity }}
              </span>
              <q-icon name="add" @click="data.incrementQ(item)" />
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              ${{ item.price }}
            </div>
            <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2 text-center">
              <q-icon
                name="delete"
                size="15px"
                color="red"
                @click="data.removeFromCart(item)"
              />
            </div>
          </div>
        </q-card>
      </q-scroll-area>
      <q-card class="q-mx-sm">
        <div class="text-center">
          <h5 class="mb-0 text-white bg-primary rounded-borders">Summary</h5>
        </div>
        <div class="row">
          <div
            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center text-bold"
          >
            <p>Products</p>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
            {{ data.cartItems.length }}
          </div>
        </div>
        <div class="row">
          <div
            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center text-bold"
          >
            <p>Shipping</p>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
            ${{
              data.cartItems.reduce(
                (acc, item) => (acc += item.price * item.quantity * 0.05),
                0
              )
            }}
          </div>
        </div>
        <div class="row">
          <div
            class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center text-bold"
          >
            <p>Total amount</p>
            <span class="text-weight-thin">(including VAT)</span>
          </div>
          <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6 text-center">
            ${{
              data.cartItems.reduce(
                (acc, item) =>
                  (acc +=
                    item.price * item.quantity +
                    item.price * item.quantity * 0.05),
                0
              )
            }}
          </div>
        </div>
        <div class="flex justify-center">
          <router-link to="checkin">
            <!-- <div @click="Close()"> -->
            <q-btn
              class="bg-primary text-white q-my-md"
              label="Proceed to check"
              @click="data.toggleNav()"
            />
            <!-- </div> -->
          </router-link>
        </div>
      </q-card>
    </div>
    <div v-else>
      <div class="container">
        <img
          src="../assets/cartemty.png"
          width="350"
          height="300"
          alt="emtyCart"
        />
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAddCartStore } from "../stores/AddCartStore";
const data = useAddCartStore();
const props = defineProps({ drawer: Boolean });
const emits = defineEmits(["toggleCart"]);
let toggle = ref();
watch(
  () => props.drawer,
  (value) => {
    toggle.value = value;
  }
);
watch(
  () => toggle.value,
  (value) => {
    if (!value) emits("toggleCart", false);
  }
);
const closeDrawer = () => {
  toggle.value = !toggle.value;
  emits("toggleCart", false);
};
</script>
