<template>
    <div class="home-container">
        <h1 class="home-title">Benvenuto</h1>
        <h3 class="trips-title">I tuoi viaggi</h3>
        <ul class="trips-list">
            <li v-for="trip in trips" :key="trip.id" class="trip-item">
                <router-link :to="{ name: 'TripDetails', params: { id: trip.id } }" class="trip-link">
                    <strong>Nome:</strong> {{ trip.name }}
                </router-link>
                <p><strong>Data d'inizio:</strong> {{ trip.start_date }}</p>
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

<style lang="scss" scoped>
.home-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.home-title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 20px;
}

.trips-title {
    font-size: 1.8rem;
    color: #34495e;
    margin-bottom: 15px;
}

.trips-list {
    list-style: none;
    padding: 0;
}

.trip-item {
    background-color: #ecf0f1;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
}

.trip-link {
    text-decoration: none;
    font-size: 1.2rem;
    color: #2980b9;
    font-weight: bold;
    transition: color 0.2s ease;

    &:hover {
        color: #e74c3c;
    }
}

.trip-item p {
    margin: 5px 0 0;
    font-size: 1rem;
    color: #7f8c8d;
}

</style>
