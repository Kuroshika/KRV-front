import { defineStore } from "pinia";
import axios from 'axios';
export const useSubmissionsStore = defineStore("submissionsStore", {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchData() {
      console.log("fetching");
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('/submission/getall');
        this.items = response.data;
        console.log( response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },

  persist: true
})