import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar, Notify } from "quasar";
import { createPinia } from "pinia";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import vue3GoogleLogin from "vue3-google-login";

const clientId =
  "468771138599-ffi19v94lgf6f5arbmjauj3jivbvnskg.apps.googleusercontent.com";

const pinia = createPinia();
const app = createApp(App);
app.use(Quasar, {
  plugins: { Notify },
  extras: ["material-icons"], // import Quasar plugins and add here
});
app.use(vue3GoogleLogin, {
  clientId: clientId,
});
app.config.globalProperties.$q.notify.setDefaults({
  position: "top-right",
  timeout: 1000,
  textColor: "white",
  actions: [{ icon: "close", color: "white" }],
});

app.use(router);
app.use(pinia);
app.mount("#app");
