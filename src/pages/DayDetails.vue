<template>
  <div>
    <h1>Dettagli del Giorno</h1>
    <div v-if="day">
      <h2>{{ formatDay(day.day) }}</h2>
      <p>Data del viaggio: {{ day.day }}</p>

      <!-- Stops List -->
      <h3>Fermate</h3>
      <ul>
        <li v-for="stop in stops" :key="stop.id">
          <strong>{{ stop.title }}</strong><br />
          {{ stop.address }}<br />
          {{ stop.description }}
        </li>
        <li v-if="!stops.length">Nessuna fermata presente</li>
      </ul>

      <!-- Form per aggiungere una nuova fermata -->
      <h3>Aggiungi una Nuova Fermata</h3>
      <form @submit.prevent="addStop">
        <div>
          <label for="title">Titolo:</label>
          <input type="text" v-model="newStop.title" required />
        </div>
        <div>
          <label for="description">Descrizione:</label>
          <textarea v-model="newStop.description"></textarea>
        </div>
          <div>
            <label for="address">Indirizzo:</label>
            <input type="text" v-model="newStop.address" @input="fetchAddressResults" @change="onAddressChange"
              list="addressSuggestions" />
            <datalist id="addressSuggestions">
              <option v-for="suggestion in addressSuggestions" :key="suggestion.address" :value="suggestion.address">
              </option>
            </datalist>
          </div>
          <div>
            <label for="latitude">Latitudine:</label>
            <input type="decimal" v-model="newStop.latitude" />
          </div>
          <div>
            <label for="longitude">Longitudine:</label>
            <input type="decimal" v-model="newStop.longitude" />
          </div>
          <button type="submit">Aggiungi Fermata</button>
      </form>
    </div>
    <div v-else>
      <p>Caricamento dettagli del giorno...</p>
    </div>
  </div>
</template>


<script>
import { store } from '../store.js';
import axios from 'axios';

export default {
  name: 'DayDetails',
  data() {
    return {
      day: null,
      trip: null,
      stops: [],
      addStop: [],
      newStop: {
        title: '',
        description: '',
        address: '',
        latitude: '',
        longitude: ''
      },
      addressSuggestions: [],
      debounceTimeout: null, // Aggiungi questa proprietà per il debounce
    };
  },
  async created() {
    await this.fetchDay();
    await this.fetchStops();
  },
  methods: {
    async fetchDay() {
      const tripId = this.$route.params.tripId;
      const dayId = this.$route.params.dayId;
      try {
        const response = await axios.get(`${store.apiBaseUrl}trips/${tripId}/days/${dayId}`);
        this.day = response.data;
      } catch (error) {
        console.error('Error fetching day:', error);
      }
    },
    async fetchStops() {
      const tripId = this.$route.params.tripId;
      const dayId = this.$route.params.dayId;
      try {
        const response = await axios.get(`${store.apiBaseUrl}trips/${tripId}/days/${dayId}/stops`);
        this.stops = response.data;
        console.log('stops', this.stops);
      } catch (error) {
        console.error('Error fetching stops:', error);
      }
    },
    async addStop() {
      const dayId = this.$route.params.dayId;
      const tripId = this.$route.params.tripId;
      try {
        const response = await axios.post(`${store.apiBaseUrl}trips/${tripId}/days/${dayId}/stops`, this.newStop);
        this.newStops.push(response.data);
        this.newStop = {
          title: '',
          description: '',
          address: '',
          latitude: '',
          longitude: ''
        }; // Reset the form
      } catch (error) {
        console.error('Error adding stop:', error);
      }
    },
    formatDay(dateString) {
      const date = new Date(dateString);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('it-IT', options);
    },
    fetchAddressResults() {
      clearTimeout(this.debounceTimeout); // Cancella il timeout precedente
      const query = this.newStop.address;

      if (query.length < 3) {
        this.addressSuggestions = [];
        return;
      }

      this.debounceTimeout = setTimeout(async () => {
        const apiBaseUrl = 'https://api.tomtom.com/search/2/search/';
        const apiKey = '88KjpqU7nmmEz3D6UYOg0ycCp6VqtdXI';

        try {
          const response = await fetch(`${apiBaseUrl}${query}.json?key=${apiKey}`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          this.addressSuggestions = data.results.map(result => ({
            address: result.address.freeformAddress,
            latitude: result.position.lat,
            longitude: result.position.lon
          }));
        } catch (error) {
          console.error('Errore di ricerca indirizzo:', error);
          this.addressSuggestions = [];
        }
      }, 800); // Attendi 800ms prima di eseguire la ricerca
    },
    onAddressChange() {
      const selectedSuggestion = this.addressSuggestions.find(suggestion => suggestion.address === this.newStop.address);
      if (selectedSuggestion) {
        this.newStop.latitude = selectedSuggestion.latitude;
        this.newStop.longitude = selectedSuggestion.longitude;
      }
    }
  },
};
</script>



<style scoped></style>
