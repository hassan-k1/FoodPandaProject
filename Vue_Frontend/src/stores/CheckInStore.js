import { defineStore } from "pinia";
import axios from "axios";
export const useCheckInStore = defineStore("checkInStore", {
  state: () => {
    return {
      Phone: "",
      listItem: [],
      selectCountry: "",
      selectedCity: "",
      cityList: [],
      selectedState: "",
      stateList: [],
      Adress: "",
      data: "",
      cityData: "",
    };
  },

  getters: {
    countrydata: (state) => state.listItem,
    statedata: (state) => state.stateList,
    citydata: (state) => state.cityList,
  },
  actions: {
    async country_is() {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      this.data = res.data.data;
      const filtereddata = this.data.map((obj) => obj.name);
      this.listItem.push(...filtereddata);
    },
    // ===========================================
    handleChange(item) {
      const statesare = this.data.find((country) => country.name === item);
      const filteredstate = statesare.states.map((obj) => obj.name);
      this.stateList.splice(0, this.stateList.length);
      this.stateList.push(...filteredstate);
    },
    handleChangeState() {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: this.selectCountry,
          state: this.selectedState,
        })
        .then((response) => {
          this.cityData = response.data.data;
          const filtercity = this.cityData.map((obj) => obj);
          this.cityList.push(...filtercity);
          // Handle the response data here
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors here
        });
    },
  },
});
