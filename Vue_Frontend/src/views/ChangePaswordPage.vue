<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-primary text-h5 text-weight-bold">
              Change Password
            </div>
            <div class="text-grey-8">
              Your current password has expired.Please enter a new password
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              type="password"
              class="q-mt-md"
              v-model="newpassword"
              label="New Password"
              :rules="[required, maxPasswordLength]"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-input
              type="password"
              class="q-mt-md"
              v-model="password"
              label="Confirm Password"
              :rules="[required, maxPasswordLength]"
            ></q-input>
            {{ store.email }}
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              rounded
              size="md"
              label="Submit"
              no-caps
              class="full-width bg-primary text-white"
              @click="getPasswordData"
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
import { ref } from "vue";
import { useDetailStore } from "../stores/userDetailStore";
import { required, maxPasswordLength } from "../validation/index";
const store = useDetailStore();
const newpassword = ref("");
const password = ref("");

const $q = useQuasar();
const router = useRouter();

const getPasswordData = async () => {
  const Details = {
    password: password.value,
    email: store.email,
  };
  console.log(Details);

  try {
    const res = await axios.post(
      "http://localhost:4000/api/change-password",
      Details
    );
    if (res.status === 200) {
      $q.notify({
        type: "positive",
        message: "password updated!",
      });
      router.push({ name: "signin" });
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Not Verify",
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
