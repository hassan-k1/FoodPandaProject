<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-primary text-h5 text-weight-bold">Sign Up</div>
            <div class="text-grey-8">Sign Up below to access your account</div>
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
}
</style>
