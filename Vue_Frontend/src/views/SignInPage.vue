<template>
  <q-layout>
    <q-page-container>
      <div style="width: 57%; position: fixed; left: 20%; top: -40px">
        <svg
          id="sw-js-blob-svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
              <stop
                id="stop1"
                stop-color="rgba(215, 15, 100, 1)"
                offset="0%"
              ></stop>
              <stop
                id="stop2"
                stop-color="rgba(215, 15, 100, 1)"
                offset="100%"
              ></stop>
            </linearGradient>
          </defs>
          <path
            fill="url(#sw-gradient)"
            d="M27.9,-26.7C36,-19.8,42.3,-9.9,42.4,0C42.4,9.9,36.1,19.9,28,28.1C19.9,36.4,9.9,43,0.4,42.6C-9,42.1,-18.1,34.6,-26,26.3C-33.8,18.1,-40.6,9,-41.7,-1.2C-42.9,-11.3,-38.5,-22.7,-30.6,-29.6C-22.7,-36.5,-11.3,-39,-0.7,-38.2C9.9,-37.5,19.8,-33.6,27.9,-26.7Z"
            width="100%"
            height="100%"
            transform="translate(50 50)"
            stroke-width="0"
            style="transition: all 0.3s ease 0s"
            stroke="url(#sw-gradient)"
          ></path>
        </svg>
      </div>
      <q-page class="flex flex-center">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <form @submit.prevent="onSubmit">
            <q-card-section class="text-center">
              <div class="text-primary text-h5 text-weight-bold">Sign In</div>
              <div class="text-grey-8">
                Sign In below to access your account
              </div>
              <div class="q-mt-md text-center">
                <GoogleLogin :callback="callback" prompt />
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                class="q-mt-md"
                v-model="email"
                label="Email Address"
                :rules="[required, validateEmail]"
              />
              <q-input
                class="q-mt-md q-mb-sm"
                v-model="password"
                :type="passwordVisible ? 'text' : 'password'"
                label="Password"
                :rules="[required, maxPasswordLength]"
                @click="togglePasswordVisibility"
              >
                <template #append v-if="passwordVisible">
                  <q-icon
                    name="visibility_off"
                    @click="togglePasswordVisibility"
                  />
                </template>

                <template #append v-else>
                  <q-icon name="visibility" @click="togglePasswordVisibility" />
                </template>
              </q-input>
              <RouterLink
                to="/email-verify"
                class="text-primary text-weight-light"
                style="text-decoration: none"
              >
                Forget password
              </RouterLink>
            </q-card-section>
            <q-card-section>
              <q-btn
                style="border-radius: 8px"
                rounded
                size="md"
                label="Sign in"
                no-caps
                class="full-width bg-primary text-white"
                :disabled="!email || !password"
                type="submit"
              ></q-btn>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">
                Don't have an account yet?

                <RouterLink
                  to="/SignUp"
                  class="text-dark text-weight-bold"
                  style="text-decoration: none"
                >
                  Sign Up.
                </RouterLink>
              </div>
            </q-card-section>
          </form>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
import { useQuasar } from "quasar";
import axios from "axios";
import { ref } from "vue";
const passwordVisible = ref(false);
import { decodeCredential } from "vue3-google-login";
const $q = useQuasar();
import {
  required,
  validateEmail,
  maxPasswordLength,
} from "../validation/index";
const email = ref("");
const password = ref("");
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
const callback = async (response) => {
  const userData = decodeCredential(response.credential);
  const { email, name, picture } = userData;
  try {
    const res = await axios.post("http://localhost:4000/api/googleSignIn", {
      email,
      name,
      picture,
    });
    if (res.status === 201) {
      const token = res.data.token;
      localStorage.setItem("_token", token);
      $q.notify({
        type: "positive",
        message: "Sign in successfull!",
      });
      router.push({ name: "Home" });
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "Not Verify",
    });
  }
};
const onSubmit = async () => {
  const UserDetails = {
    email: email.value,
    password: password.value,
  };
  try {
    const res = await axios.post(
      "http://localhost:4000/api/SignIn",
      UserDetails
    );
    if (res.status === 201) {
      const token = res.data.token;
      localStorage.setItem("_token", token);
      $q.notify({
        type: "positive",
        message: "Sign in successfull!",
      });
      router.push({ name: "Home" });
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
  z-index: 20;
}
</style>
