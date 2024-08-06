import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import NewTrip from "./pages/NewTrip.vue";
import TripDetails from "./pages/TripDetails.vue";

const routes = [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/new-trip",
            name: "NewTrip",
            component: NewTrip
        },
        {
            path: "/trip/:id",
            name: "TripDetails",
            component: TripDetails
        }
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
});
export {router}