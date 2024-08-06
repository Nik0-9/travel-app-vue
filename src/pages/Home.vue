<template>
    <div>
        <h1>Home</h1>
        <h3>I tuoi viaggi</h3>
        <ul>
            <li v-for="trip in trips" :key="trip.id">
                <router-link :to="{ name: 'TripDetails', params: { id: trip.id } }">
                    <strong>Name:</strong> {{ trip.name }}
                </router-link>
               
                <strong>Start Date:</strong> {{ trip.start_date }}
            </li>
        </ul>
    </div>
</template>

<script>
import { store } from '../store.js';
export default {
    name: 'Home',
    computed: {
        trips() {
            return store.trips;
        }
    }
}
</script>

<style lang="scss" scoped></style>