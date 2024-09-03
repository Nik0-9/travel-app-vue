<template>
    <div>
      <h1>Dettagli del Viaggio</h1>
      <div v-if="trip">
        <h2>{{ trip.name }}</h2>
        <p><strong>Data di Inizio:</strong> {{ trip.start_date }}</p>
        <p><strong>Data di Fine:</strong> {{ trip.end_date }}</p>
  
        <h3>Giorni del Viaggio</h3>
        <ul>
          <li v-for="day in trip.days" :key="day.id">
            <router-link :to="{ name: 'DayDetails', params: { tripId: trip.id, dayId: day.id } }">
              {{ formatDay(day.day) }}
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Caricamento dettagli del viaggio...</p>
      </div>
      <h3>Add a New Day</h3>
        <form @submit.prevent="addDay">
            <div>
                <label for="date">Date:</label>
                <input type="date" v-model="newDayDate" required />
            </div>
            <button type="submit">Add Day</button>
        </form>
    </div>
  </template>
  
  <script>
  import { store } from '../store.js';
  import axios from 'axios';
  
  export default {
  name: 'TripDetails',
  data() {
    return {
      trip: null,
      newDayDate: '',
    };
  },
  async created() {
    await this.fetchTrip();
  },
  methods: {
    async fetchTrip() {
      const tripId = this.$route.params.id;
      try {
        const response = await axios.get(`${store.apiBaseUrl}trips/${tripId}`);
        this.trip = response.data;
      } catch (error) {
        console.error('Error fetching trip:', error);
      }
    },
    async addDay() {
      try {
        const tripId = this.$route.params.id;
        const response = await axios.post(`${store.apiBaseUrl}trips/${tripId}/days`, {
          day: this.newDayDate,
        });
        this.trip.days.push(response.data);
        this.newDayDate = ''; // Reset form input
      } catch (error) {
        console.error('Error adding day:', error);
      }
    },
    formatDay(dateString) {
      const date = new Date(dateString);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('it-IT', options);
    }
  },
}
</script>

<style scoped></style>
