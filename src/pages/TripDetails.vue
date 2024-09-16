<template>
  <div class="trip-details-container">
    <h1 class="trip-title">Dettagli del Viaggio</h1>

    <div v-if="trip" class="trip-info">
      <h2 class="trip-name">{{ trip.name }}</h2>
      <p><strong>Data di Inizio:</strong> {{ trip.start_date }}</p>
      <p><strong>Data di Fine:</strong> {{ trip.end_date }}</p>

      <h3 class="days-title">Giorni del Viaggio</h3>
      <ul class="days-list">
        <li v-for="day in trip.days" :key="day.id" class="day-item">
          <router-link :to="{ name: 'DayDetails', params: { tripId: trip.id, dayId: day.id } }" class="day-link">
            {{ formatDay(day.day) }}
          </router-link>
        </li>
      </ul>
          <!-- Form per aggiornare la data di fine -->
          <div class="update-end-date">
        <h3>Modifica Data di Fine</h3>
        <form @submit.prevent="updateEndDate">
          <div class="form-group">
            <label for="end_date">Nuova Data di Fine:</label>
            <input type="date" v-model="newEndDate" id="end_date" class="form-control" required />
          </div>
          <button type="submit" class="submit-btn">Aggiorna Data di Fine</button>
        </form>
      </div>
    </div>

    <div v-else>
      <p>Caricamento dettagli del viaggio...</p>
    </div>

    <h3 class="add-day-title">Aggiungi una nuova giornata</h3>
    <form @submit.prevent="addDay" class="add-day-form">
      <div class="form-group">
        <label for="date">Data:</label>
        <input type="date" v-model="newDayDate" id="date" class="form-control" required />
      </div>
      <button type="submit" class="submit-btn">Aggiungi Giornata</button>
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
      newEndDate: '',
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
    async updateEndDate() {
      try {
        const tripId = this.$route.params.id;
        const response = await axios.put(`${store.apiBaseUrl}trips/${tripId}`, {
          end_date: this.newEndDate, // Invia la nuova data di fine
        });
        this.trip.end_date = this.newEndDate; // Aggiorna la data di fine nel frontend
        alert('Data di fine aggiornata con successo!');
      } catch (error) {
        console.error('Errore durante l\'aggiornamento della data di fine:', error);
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

<style scoped>
.trip-details-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.trip-title, .trip-name {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.trip-info p {
  font-size: 1.2rem;
  margin: 5px 0;
  color: #34495e;
}

.days-title, .add-day-title {
  font-size: 1.6rem;
  margin-top: 20px;
  color: #2980b9;
}

.days-list {
  list-style: none;
  padding: 0;
}

.day-item {
  margin-bottom: 10px;
}

.day-link {
  text-decoration: none;
  color: #3498db;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.day-link:hover {
  color: #e74c3c;
}

.add-day-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1rem;
  color: #34495e;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #3498db;
}
</style>
