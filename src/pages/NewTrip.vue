<template>
  <div>
    <h1>New Trip</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="form.name" required />
        <span v-if="errors.name">{{ errors.name[0] }}</span>
      </div>
      <div>
        <label for="start_date">Start Date:</label>
        <input type="date" v-model="form.start_date" required />
        <span v-if="errors.start_date">{{ errors.start_date[0] }}</span>
      </div>
      <div>
        <label for="end_date">End Date:</label>
        <input type="date" v-model="form.end_date" />
        <span v-if="errors.end_date">{{ errors.end_date[0] }}</span>
      </div>
      <button type="submit">Create Trip</button>
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
        console.log('Trip created:', response.data);
        this.form.name = '';
        this.form.start_date = '';
        this.form.end_date = '';
      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          console.error('Error creating trip:', error);
        }
      }
    }
  }
};
</script>

<style scoped>
span {
  color: red;
}

</style>