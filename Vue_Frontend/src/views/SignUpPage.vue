<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center">
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
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-primary text-h5 text-weight-bold">Sign Up</div>
            <div class="text-grey-8">Sign Up below to access your account</div>
            <div class="q-mt-md text-center">
              <GoogleLogin :callback="callback" prompt />
            </div>
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="name"
              label="User Name"
              :rules="[required]"
            ></q-input>

            <q-input
              class="q-mt-md"
              v-model="email"
              label="Email Address"
              :rules="[required, validateEmail]"
            ></q-input>
            <q-input
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Password"
              :rules="[required, maxPasswordLength]"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              rounded
              size="md"
              label="Sign in"
              no-caps
              class="full-width bg-primary text-white"
              @click="getUserData"
              :disabled="!name || !email || !password"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              You have an account yet?
              <RouterLink
                to="/SignIn"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
              >
                Sign In.
              </RouterLink>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
import { decodeCredential } from "vue3-google-login";
import { ref } from "vue";
import {
  required,
  validateEmail,
  maxPasswordLength,
} from "../validation/index";
const name = ref("");
const email = ref("");
const password = ref("");
const $q = useQuasar();
const callback = async (response) => {
  const userData = decodeCredential(response.credential);
  const { email, name } = userData;
  try {
    const res = await axios.post("http://localhost:4000/api/googleSignIn", {
      email,
      name,
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
const getUserData = async () => {
  const UserDetails = {
    name: name.value, // Make sure these variables are defined and hold user input
    email: email.value,
    password: password.value,
  };
  try {
    const res = await axios.post(
      "http://localhost:4000/api/SignUp",
      UserDetails
    );
    if (res.status === 201) {
      $q.notify({
        type: "positive",
        message: "Registration successfull!",
      });
      router.push({ name: "signin" });
    }
  } catch (error) {
    $q.notify({
      type: "negative",
      message: "User All ready exits!",
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
