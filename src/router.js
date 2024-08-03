import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home.vue";
import NewTrip from "./pages/NewTrip.vue";

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
        }
    ]

const router = createRouter({
    history: createWebHistory(),
    routes
});
export {router}