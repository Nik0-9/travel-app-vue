<template>
  <HeaderComponent />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import { store } from './store.js';
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent.vue';
export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  data() {
    return {
      store
    }
  },
  methods: {
    async fetchTrips() {
      try {
        const response = await axios.get(`${store.apiBaseUrl}trips`);
        store.trips = response.data.results;
        console.log(store.trips);

      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    }
  },
  mounted() {
    this.fetchTrips();
  }
}
</script>

<style lang="scss" scoped></style>
