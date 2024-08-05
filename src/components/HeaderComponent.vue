<template>
    <header>
        <nav>
            <ul class="d-flex align-items-center">
                <li class="me-5">
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/new-trip">New Trip</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
ul {
    background-color: darkgray;
    height: 50px;
}

li {
    list-style: none;
}
</style>