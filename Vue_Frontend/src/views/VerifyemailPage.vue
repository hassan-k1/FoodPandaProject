<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-primary text-h5 text-weight-bold">
              Email details
            </div>
            <div class="text-grey-8">
              Enter Your email to verify your profile information
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              class="q-mt-md"
              v-model="store.email"
              label="Email Address"
              :rules="[required, validateEmail]"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              rounded
              size="md"
              label="Countine"
              no-caps
              class="full-width bg-primary text-white"
              :disabled="!email"
              @click="getUserData"
            ></q-btn>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import axios from "axios";
import { useDetailStore } from "../stores/userDetailStore";
import { required, validateEmail } from "../validation/index";
const store = useDetailStore();

const $q = useQuasar();
const router = useRouter();

const getUserData = async () => {
  const UserDetails = {
    email: store.email,
  };
  router.push({ name: "OtpPage" });
  try {
    const res = await axios.post(
      "http://localhost:4000/api/email-send",
      UserDetails
    );
    if (res.status === 200) {
      $q.notify({
        type: "positive",
        message: "Verify successfull!",
      });
      router.push({ name: "OtpPage" });
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Email is not valid",
    });
  }
};
</script>

<style>
.my_card {
  width: 35rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
