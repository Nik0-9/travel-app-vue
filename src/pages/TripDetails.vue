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
            {{ day.day }}
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
      };
    },
    created() {
      this.fetchTrip();
    },
    methods: {
      fetchTrip() {
        this.trip = store.trips.find(trip => trip.id === parseInt(this.$route.params.id));
      },

        async addDay() {
            try {
                const tripId = this.$route.params.id;
                console.log(tripId);
                const response = await axios.post(`${store.apiBaseUrl}trips/${tripId}/days`, {
                    date: this.newDayDate,
                });
                this.trip.days.push(response.data);
                this.newDayDate = ''; // Reset form input
            } catch (error) {
                console.error('Error adding day:', error);
            }
        }
    },
}
</script>

<style scoped></style>
