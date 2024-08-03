<template>
    <header>
        <nav>
            <div class="container-fluid">
                <ul class="d-flex ">
                    <li class="align-item-center">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/new-trip">New Trip</router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        name: 'HeaderComponent',
    }
</script>

<style lang="scss" scoped>
header{
    background-color: darkgray;
    height: 50px;
}
li{
    list-style: none;
}

</style>