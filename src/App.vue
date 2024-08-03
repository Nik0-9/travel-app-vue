<template>
  <HeaderComponent />
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
import {store} from './store.js';
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent.vue';
  export default {
    name: 'App',
    components: {
      HeaderComponent
    }
  }
</script>

<style lang="scss" scoped>

</style>
