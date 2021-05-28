<template>
        <div id="app">
        <AppNavbar />
        <div class="container my-4">
            <router-view />
        </div>
    </div>
</template>

<script>

import AppNavbar from './components/AppNavbar'; 
export default {
  name: 'App',
  components: {
    AppNavbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
