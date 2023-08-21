<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-primary text-h5 text-weight-bold">
              OTP Verification
            </div>
            <div class="text-grey-8">Enter Your OTP</div>
          </q-card-section>
          <q-card-section>
            <q-input
              type="number"
              class="q-mt-md"
              v-model="code"
              label="Enter Verification code"
              :rules="[required]"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              rounded
              size="md"
              label="Submit"
              no-caps
              class="full-width bg-primary text-white"
              :disabled="!code"
              @click="getOtpData"
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
import { required } from "../validation/index";
import axios from "axios";
import { ref } from "vue";
const code = ref("");

const $q = useQuasar();
const router = useRouter();

const getOtpData = async () => {
  const OtpDetails = {
    code: code.value,
  };
  router.push({ name: "ChangePasswordPage" });
  try {
    const res = await axios.post(
      "http://localhost:4000/api/otp-send",
      OtpDetails
    );
    if (res.status === 200) {
      $q.notify({
        type: "positive",
        message: "Verify successfull!",
      });
      router.push({ name: "ChangePasswordPage" });
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "OTP is not match",
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
