import { defineStore } from "pinia";
import Cookies from "js-cookie";
import axios from "axios";
export const useDetailStore = defineStore("userStore", {
  state: () => {
    return {
      email: "",
      user: {},
    };
  },
  getters: {
    userdata: (state) => state.user,
  },

  actions: {
    async User_get() {
      const token = localStorage.getItem("_token");
      if (token) {
        const headers = {
          "Content-Type": "application/json",
          Authorization: token,
        };

        try {
          const response = await axios.get("http://localhost:4000/api/_me", {
            headers,
          });
          if (response.status === 201) {
            const userData = response.data.data.user;
            this.user = userData;
            Cookies.set("user", JSON.stringify(userData), { expires: 7 });
          }
        } catch (error) {
          console.log("hereee", error);
        }
      } else {
        console.log("not user sign in");
      }
    },
  },
});
