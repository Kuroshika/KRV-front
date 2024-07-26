import { defineStore } from "pinia";
import axios from 'axios';
export const useNewSubStore = defineStore("newSubStore", {
  state: () => ({
    data: {
      baseCity: "",
      companyDescribe: "",
      companyName: "",
      position: "",

    },
    loading: false,
    error: null,
  }),

  persist: false
})