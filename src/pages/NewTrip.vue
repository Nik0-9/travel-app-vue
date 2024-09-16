<template>
  <div class="new-trip-container">
    <h1 class="page-title">Crea un nuovo viaggio</h1>
    <form @submit.prevent="submitForm" class="trip-form">
      <div class="form-group">
        <label for="name">Nome del viaggio:</label>
        <input type="text" v-model="form.name" id="name" class="form-control" required />
        <span v-if="errors.name" class="error-msg">{{ errors.name[0] }}</span>
      </div>
      <div class="form-group">
        <label for="start_date">Data di inizio:</label>
        <input type="date" v-model="form.start_date" id="start_date" class="form-control" required />
        <span v-if="errors.start_date" class="error-msg">{{ errors.start_date[0] }}</span>
      </div>
      <div class="form-group">
        <label for="end_date">Data di fine:</label>
        <input type="date" v-model="form.end_date" id="end_date" class="form-control" />
        <span v-if="errors.end_date" class="error-msg">{{ errors.end_date[0] }}</span>
      </div>
      <button type="submit" class="submit-btn">Crea Viaggio</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { store } from '../store.js';

export default {
  name: 'NewTrip',
  data() {
    return {
      form: {
        name: '',
        start_date: '',
        end_date: ''
      },
      errors: {},
      store
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(this.store.apiBaseUrl + 'new-trip', this.form);
        console.log('Viaggio creato:', response.data);
        this.form.name = '';
        this.form.start_date = '';
        this.form.end_date = '';
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Errore durante la creazione del viaggio:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
.new-trip-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 2rem;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
}

.trip-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1.2rem;
  color: #34495e;
  margin-bottom: 5px;
  display: block;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  font-size: 1rem;
}

.error-msg {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.submit-btn {
  padding: 10px 15px;
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
