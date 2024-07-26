import { defineStore } from "pinia";
import axios from 'axios';
export const useTimeNodeListStore = defineStore("timeNodeListStore", {
  state: () => ({
    dataList: [],
    subId: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchData() {
      console.log("fetching");
      this.loading = true;
      this.error = null;
      const params = { subId: this.subId };
      try {
        const response = await axios.get('/submission/timenode/get', { params });
        this.dataList = response.data;
        console.log(response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  },

  persist: true
})