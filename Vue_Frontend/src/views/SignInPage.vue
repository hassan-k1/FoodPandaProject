<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex flex-center bg-grey-2">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <form @submit.prevent="onSubmit">
            <q-card-section class="text-center">
              <div class="text-primary text-h5 text-weight-bold">Sign In</div>
              <div class="text-grey-8">
                Sign In below to access your account
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
import { useForm } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { ref } from "vue";
const passwordVisible = ref(false);
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

const onSubmit = async () => {
  const UserDetails = {
    email: email.value,
    password: password.value,
  };
  console.log(UserDetails);
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
}
</style>
